import os
import sys
import io
from PIL import Image

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from app.main import app


def create_dummy_image(width: int = 2400, height: int = 1600, color: str = "red", format: str = "PNG") -> bytes:
    img = Image.new("RGB", (width, height), color=color)
    buf = io.BytesIO()
    img.save(buf, format=format)
    return buf.getvalue()


def create_dummy_audio() -> bytes:
    # Minimal MP3 frame header simulation
    return b"\xFF\xFB\x90\x00" + b"\x00" * 2048


def run_tests():
    print("==================================================")
    print("   DIGITAL THEAB - PHASE 2 VERIFICATION SUITE    ")
    print("==================================================")

    with TestClient(app) as client:
        # 1. Test Large Gallery Photo Upload & Auto-Optimization
        large_img_bytes = create_dummy_image(width=2400, height=1600, color="crimson", format="PNG")
        files = {
            "file": ("prewedding_large.png", large_img_bytes, "image/png")
        }
        data = {"category": "gallery"}

        res = client.post("/api/v1/media/upload", files=files, data=data)
        assert res.status_code == 201, f"Gallery upload failed: {res.text}"
        gallery_res = res.json()
        assert gallery_res["content_type"] == "image/webp"
        assert gallery_res["width"] == 1920
        assert gallery_res["height"] == 1280
        assert gallery_res["file_key"].startswith("gallery/")
        assert gallery_res["file_key"].endswith(".webp")
        gallery_key = gallery_res["file_key"]
        print(f"[PASS] 1. Large image (2400x1600) auto-downscaled to 1920x1280 WebP! (key: {gallery_key})")

        # 2. Test Avatar Upload (Max dimension 800)
        avatar_bytes = create_dummy_image(width=1200, height=1200, color="gold", format="JPEG")
        files = {
            "file": ("couple_avatar.jpg", avatar_bytes, "image/jpeg")
        }
        res = client.post("/api/v1/media/upload", files=files, data={"category": "avatar"})
        assert res.status_code == 201, f"Avatar upload failed: {res.text}"
        avatar_res = res.json()
        assert avatar_res["width"] == 800
        assert avatar_res["height"] == 800
        assert avatar_res["file_key"].startswith("avatars/")
        print(f"[PASS] 2. Avatar image downscaled to 800x800 WebP (key: {avatar_res['file_key']})")

        # 3. Test KHQR Bank QR Upload (Category: khqr)
        qr_bytes = create_dummy_image(width=900, height=900, color="black", format="PNG")
        files = {
            "file": ("aba_qr.png", qr_bytes, "image/png")
        }
        res = client.post("/api/v1/media/upload", files=files, data={"category": "khqr"})
        assert res.status_code == 201, f"KHQR upload failed: {res.text}"
        qr_res = res.json()
        assert qr_res["file_key"].startswith("qr/")
        assert qr_res["width"] == 800
        print(f"[PASS] 3. Bank KHQR code processed cleanly into /qr/ (key: {qr_res['file_key']})")

        # 4. Test Wedding Song MP3 Upload (Category: music)
        audio_bytes = create_dummy_audio()
        files = {
            "file": ("nisai_song.mp3", audio_bytes, "audio/mpeg")
        }
        res = client.post("/api/v1/media/upload", files=files, data={"category": "music"})
        assert res.status_code == 201, f"Audio upload failed: {res.text}"
        music_res = res.json()
        assert music_res["file_key"].startswith("audio/")
        assert music_res["file_key"].endswith(".mp3")
        assert music_res["content_type"] == "audio/mpeg"
        music_key = music_res["file_key"]
        print(f"[PASS] 4. Wedding audio MP3 accepted with audio/mpeg streaming headers (key: {music_key})")

        # 5. Test Invalid File Extension Rejection
        files = {
            "file": ("malicious.exe", b"fake binary data", "application/octet-stream")
        }
        res = client.post("/api/v1/media/upload", files=files, data={"category": "gallery"})
        assert res.status_code == 400, f"Expected 400 rejection for .exe: {res.text}"
        print("[PASS] 5. Invalid file format correctly rejected (400 Bad Request)")

        # 6. Test File Fetch via Mounted /uploads
        res = client.get(f"/uploads/{gallery_key}")
        assert res.status_code == 200, f"Failed to fetch uploaded file via /uploads: {res.status_code}"
        assert len(res.content) > 0
        print(f"[PASS] 6. Uploaded file verified fetchable via /uploads/{gallery_key}")

        # 7. Test Media Deletion Endpoint
        del_res = client.delete(f"/api/v1/media/{gallery_key}")
        assert del_res.status_code == 200, f"Delete failed: {del_res.text}"
        print(f"[PASS] 7. Uploaded media file deleted successfully")

        # 8. Test Second Delete returns 404
        del_res2 = client.delete(f"/api/v1/media/{gallery_key}")
        assert del_res2.status_code == 404, f"Expected 404 for deleted file: {del_res2.text}"
        print(f"[PASS] 8. Deleting already-removed file correctly returned 404 Not Found")

        # Clean up music file as well
        client.delete(f"/api/v1/media/{music_key}")
        client.delete(f"/api/v1/media/{avatar_res['file_key']}")
        client.delete(f"/api/v1/media/{qr_res['file_key']}")

    print("==================================================")
    print("   ALL 8 TESTS IN PHASE 2 PASSED WITH 100% SUCCESS!")
    print("==================================================")


if __name__ == "__main__":
    run_tests()
