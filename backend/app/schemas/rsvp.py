from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class GuestRSVPBase(BaseModel):
    guest_name: str = Field(..., min_length=2, max_length=150)
    phone: Optional[str] = None
    attendance_status: str = Field(default="attending")  # attending, declined, tentative
    guest_count: int = Field(default=1, ge=1, le=10)
    wishes: Optional[str] = None
    source: Optional[str] = "direct"


class GuestRSVPCreate(GuestRSVPBase):
    pass


class GuestRSVPUpdate(BaseModel):
    guest_name: Optional[str] = None
    phone: Optional[str] = None
    attendance_status: Optional[str] = None
    guest_count: Optional[int] = None
    wishes: Optional[str] = None
    source: Optional[str] = None


class GuestRSVPResponse(GuestRSVPBase):
    id: int
    invitation_id: int
    created_at: datetime

    class Config:
        from_attributes = True
