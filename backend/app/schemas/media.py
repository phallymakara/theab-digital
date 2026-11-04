from typing import Optional
from pydantic import BaseModel


class MediaUploadResponse(BaseModel):
    url: str
    file_key: str
    content_type: str
    size_bytes: int
    width: Optional[int] = None
    height: Optional[int] = None

    class Config:
        from_attributes = True
