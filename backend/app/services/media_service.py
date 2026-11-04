import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Tuple
from fastapi import UploadFile, HTTPException, status

import boto3
from botocore.config import Config
from app.core.config import settings
from app.services.image_optimizer import optimize_image
from app.schemas.media import MediaUploadResponse

# Allowed extensions and MIME types
ALLOWED_IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}
ALLOWED_AUDIO_EXTS = {".mp3", ".m4a", ".aac", ".ogg"}

ALLOWED_IMAGE_MIMES = {"image/jpeg", "image/png", "image/webp", "image/heic", "application/octet-stream"}
ALLOWED_AUDIO_MIMES = {"audio/mpeg", "audio/mp3", "audio/mp4", "audio/x-m4a", "audio/aac", "audio/ogg", "application/octet-stream"}

CATEGORY_FOLDERS = {
    "avatar": "avatars",
    "cover": "covers",
    "gallery": "gallery",
    "khqr": "qr",
    "music": "audio",
}


class MediaService:
    def __init__(self):
        self.r2_enabled = bool(
            settings.R2_ACCOUNT_ID and
            settings.R2_ACCESS_KEY_ID and
            settings.R2_SECRET_ACCESS_KEY
        )
        if self.r2_enabled:
            endpoint_url = f"https://{settings.R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
            self.s3_client = boto3.client(
                "s3",
                endpoint_url=endpoint_url,
                aws_access_key_id=settings.R2_ACCESS_KEY_ID,
                aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
                config=Config(signature_version="s3v4"),
            )
            self.bucket_name = settings.R2_BUCKET_NAME
        else:
            self.s3_client = None
            self.bucket_name = None
            # Ensure local uploads directory exists
            settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    def upload(self, file: UploadFile, category: str = "gallery") -> MediaUploadResponse:
        category = category.lower().strip()
        if category not in CATEGORY_FOLDERS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"ប្រភេទឯកសារមិនត្រឹមត្រូវ (Invalid category): {category}. Expected one of {list(CATEGORY_FOLDERS.keys())}"
            )

        folder = CATEGORY_FOLDERS[category]
        filename = file.filename or "upload"
        ext = Path(filename).suffix.lower()

        # Read contents
        contents = file.file.read()
        file_size = len(contents)

        if category == "music":
            return self._handle_audio_upload(contents, ext, file.content_type, folder, file_size)
        else:
            return self._handle_image_upload(contents, ext, file.content_type, folder, category, file_size)

    def _handle_audio_upload(
        self,
        contents: bytes,
        ext: str,
        content_type: Optional[str],
        folder: str,
        file_size: int
    ) -> MediaUploadResponse:
        if file_size > settings.MAX_AUDIO_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"ទំហំឯកសារតន្ត្រីធំពេក (Audio size exceeds maximum 15MB limit)"
            )

        if ext not in ALLOWED_AUDIO_EXTS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"ទម្រង់តន្ត្រីមិនត្រឹមត្រូវ (Invalid audio format). Allowed: {', '.join(ALLOWED_AUDIO_EXTS)}"
            )

        unique_id = uuid.uuid4().hex[:12]
        file_key = f"{folder}/{unique_id}{ext}"
        audio_content_type = "audio/mpeg" if ext == ".mp3" else (content_type or "audio/mpeg")

        url = self._save_file(contents, file_key, audio_content_type)
        return MediaUploadResponse(
            url=url,
            file_key=file_key,
            content_type=audio_content_type,
            size_bytes=file_size,
            width=None,
            height=None
        )

    def _handle_image_upload(
        self,
        contents: bytes,
        ext: str,
        content_type: Optional[str],
        folder: str,
        category: str,
        file_size: int
    ) -> MediaUploadResponse:
        if file_size > settings.MAX_IMAGE_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"ទំហំរូបភាពធំពេក (Image size exceeds maximum 15MB limit)"
            )

        if ext and ext not in ALLOWED_IMAGE_EXTS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"ទម្រង់រូបភាពមិនត្រឹមត្រូវ (Invalid image format). Allowed: {', '.join(ALLOWED_IMAGE_EXTS)}"
            )

        max_dim = 800 if category in ("avatar", "khqr") else 1920
        quality = 85 if category == "khqr" else 82

        try:
            webp_bytes, mime, width, height = optimize_image(
                contents,
                max_dimension=max_dim,
                quality=quality
            )
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )

        unique_id = uuid.uuid4().hex[:12]
        file_key = f"{folder}/{unique_id}.webp"

        url = self._save_file(webp_bytes, file_key, mime)
        return MediaUploadResponse(
            url=url,
            file_key=file_key,
            content_type=mime,
            size_bytes=len(webp_bytes),
            width=width,
            height=height
        )

    def _save_file(self, data: bytes, file_key: str, content_type: str) -> str:
        if self.r2_enabled:
            # Upload to Cloudflare R2
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=file_key,
                Body=data,
                ContentType=content_type,
            )
            if settings.R2_PUBLIC_URL:
                return f"{settings.R2_PUBLIC_URL.rstrip('/')}/{file_key}"
            return f"https://{self.bucket_name}.r2.dev/{file_key}"
        else:
            # Save to local filesystem fallback
            local_path = settings.UPLOAD_DIR / file_key
            local_path.parent.mkdir(parents=True, exist_ok=True)
            local_path.write_bytes(data)
            return f"/uploads/{file_key}"

    def delete(self, file_key: str) -> bool:
        file_key = file_key.lstrip("/")
        if self.r2_enabled:
            try:
                self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_key)
                return True
            except Exception:
                return False
        else:
            local_path = settings.UPLOAD_DIR / file_key
            if local_path.exists():
                try:
                    local_path.unlink()
                    return True
                except Exception:
                    return False
            return False


media_service = MediaService()
