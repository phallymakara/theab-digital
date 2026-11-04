from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
from typing import Optional

from app.schemas.media import MediaUploadResponse
from app.services.media_service import media_service
from app.routers.deps import get_optional_current_user
from app.models.user import User

router = APIRouter(prefix="/media", tags=["Media"])


@router.post("/upload", response_model=MediaUploadResponse, status_code=status.HTTP_201_CREATED)
def upload_media_file(
    file: UploadFile = File(...),
    category: str = Form("gallery"),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """
    Upload and optimize media files:
    - Images: Automatically auto-orients, downscales to <=1920px (or 800px for avatar/KHQR), converts to WebP.
    - Music: Validates audio/mp3 format and streams inline.
    """
    return media_service.upload(file=file, category=category)


@router.delete("/{file_key:path}")
def delete_media_file(
    file_key: str,
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """Delete uploaded media asset from storage."""
    success = media_service.delete(file_key=file_key)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញឯកសារដែលត្រូវលុបទេ (Media file not found)"
        )
    return {"status": "ok", "message": f"ឯកសារ {file_key} ត្រូវបានលុបជោគជ័យ"}
