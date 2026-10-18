from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class GuestRSVPBase(BaseModel):
    guest_name: str = Field(..., min_length=1, max_length=150)
    phone: Optional[str] = None
    attendance_status: str = Field(default="attending", description="attending, declined, or tentative")
    guest_count: int = Field(default=1, ge=1, le=20)
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


class GuestRSVPResponse(GuestRSVPBase):
    id: int
    invitation_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
