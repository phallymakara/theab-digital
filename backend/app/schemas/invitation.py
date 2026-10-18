from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class InvitationBase(BaseModel):
    event_type: str = "wedding"
    title_kh: str = "សិរីសួស្តី អាពាហ៍ពិពាហ៍"
    groom_name: str = "សុខ វិបុល"
    bride_name: str = "ជា សុជាតា"
    groom_parents: Optional[str] = "លោក សុខ ជា និង លោកស្រី កែវ ផល្លី"
    bride_parents: Optional[str] = "លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន"
    ceremony_date: str = "ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦"
    ceremony_time: str = "វេលាម៉ោង ៥:០០ ល្ងាច តទៅ"
    location_name: str = "មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)"
    location_address: Optional[str] = "រាជធានីភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា"
    google_maps_url: Optional[str] = "https://maps.google.com"
    theme_color: str = "crimson"
    welcome_quote: Optional[str] = (
        "យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា "
        "អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍"
    )
    audio_url: Optional[str] = None
    is_published: bool = True


class InvitationCreate(InvitationBase):
    slug: Optional[str] = None


class InvitationUpdate(BaseModel):
    event_type: Optional[str] = None
    title_kh: Optional[str] = None
    groom_name: Optional[str] = None
    bride_name: Optional[str] = None
    groom_parents: Optional[str] = None
    bride_parents: Optional[str] = None
    ceremony_date: Optional[str] = None
    ceremony_time: Optional[str] = None
    location_name: Optional[str] = None
    location_address: Optional[str] = None
    google_maps_url: Optional[str] = None
    theme_color: Optional[str] = None
    welcome_quote: Optional[str] = None
    audio_url: Optional[str] = None
    is_published: Optional[bool] = None


class InvitationResponse(InvitationBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
