from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.schemas.rsvp import GuestRSVPResponse


# -------------------------------------------------------------
# Agenda Schemas
# -------------------------------------------------------------
class AgendaBase(BaseModel):
    time_text: str = Field(..., max_length=80)
    title_kh: str = Field(..., max_length=255)
    description_kh: Optional[str] = None
    order_index: int = 0


class AgendaCreate(AgendaBase):
    pass


class AgendaResponse(AgendaBase):
    id: int
    invitation_id: int

    class Config:
        from_attributes = True


# -------------------------------------------------------------
# Gallery Schemas
# -------------------------------------------------------------
class GalleryBase(BaseModel):
    image_url: str = Field(..., max_length=500)
    caption: Optional[str] = None
    order_index: int = 0


class GalleryCreate(GalleryBase):
    pass


class GalleryResponse(GalleryBase):
    id: int
    invitation_id: int

    class Config:
        from_attributes = True


# -------------------------------------------------------------
# Bank Account Schemas
# -------------------------------------------------------------
class BankAccountBase(BaseModel):
    bank_name: str = Field(default="ABA Bank", max_length=100)
    account_name: str = Field(..., max_length=150)
    account_number: str = Field(..., max_length=100)
    qr_code_url: Optional[str] = None
    is_primary: bool = True


class BankAccountCreate(BankAccountBase):
    pass


class BankAccountResponse(BankAccountBase):
    id: int
    invitation_id: int

    class Config:
        from_attributes = True


# -------------------------------------------------------------
# Invitation Main Schemas
# -------------------------------------------------------------
class InvitationBase(BaseModel):
    slug: str = Field(..., min_length=2, max_length=120)
    template_id: str = Field(default="royal-gold")
    event_type: str = Field(default="wedding")
    title_kh: Optional[str] = "សិរីសួស្តី អាពាហ៍ពិពាហ៍"

    # Couple
    groom_name: str = Field(..., min_length=1, max_length=150)
    groom_title: Optional[str] = "កូនប្រុសនាម"
    bride_name: str = Field(..., min_length=1, max_length=150)
    bride_title: Optional[str] = "កូនស្រីនាម"

    # Parents & Residence
    groom_father: Optional[str] = None
    groom_mother: Optional[str] = None
    groom_residence: Optional[str] = "រាជធានីភ្នំពេញ"
    bride_father: Optional[str] = None
    bride_mother: Optional[str] = None
    bride_residence: Optional[str] = "រាជធានីភ្នំពេញ"

    # Contact
    phone_groom: Optional[str] = None
    phone_bride: Optional[str] = None
    telegram_link: Optional[str] = None
    telegram_username: Optional[str] = None

    # Date & Venue
    event_date_raw: Optional[str] = "2027-01-10"
    ceremony_date_kh: Optional[str] = "ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧"
    ceremony_time: Optional[str] = "ម៉ោង ០៥:០០ ល្ងាច"
    location_name: Optional[str] = "សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Rosewood Phnom Penh)"
    location_address: Optional[str] = "អគារ វឌ្ឍនៈ កាពីតាល់ មហាវិថីព្រះមុនីវង្ស រាជធានីភ្នំពេញ"
    google_maps_url: Optional[str] = "https://maps.google.com"

    # Styling & Media
    welcome_quote: Optional[str] = None
    theme_color: Optional[str] = "gold"
    font_family: Optional[str] = "font-komutt-a"
    audio_url: Optional[str] = "/audio/nisai_wedding_song.mp3"
    bg_image_url: Optional[str] = "/images/templates/royal_gold_prewedding.webp"
    hero_images: Optional[List[str]] = []

    is_published: bool = True


class InvitationCreate(InvitationBase):
    agendas: Optional[List[AgendaCreate]] = []
    galleries: Optional[List[GalleryCreate]] = []
    bank_accounts: Optional[List[BankAccountCreate]] = []


class InvitationUpdate(BaseModel):
    template_id: Optional[str] = None
    event_type: Optional[str] = None
    title_kh: Optional[str] = None

    groom_name: Optional[str] = None
    groom_title: Optional[str] = None
    bride_name: Optional[str] = None
    bride_title: Optional[str] = None

    groom_father: Optional[str] = None
    groom_mother: Optional[str] = None
    groom_residence: Optional[str] = None
    bride_father: Optional[str] = None
    bride_mother: Optional[str] = None
    bride_residence: Optional[str] = None

    phone_groom: Optional[str] = None
    phone_bride: Optional[str] = None
    telegram_link: Optional[str] = None
    telegram_username: Optional[str] = None

    event_date_raw: Optional[str] = None
    ceremony_date_kh: Optional[str] = None
    ceremony_time: Optional[str] = None
    location_name: Optional[str] = None
    location_address: Optional[str] = None
    google_maps_url: Optional[str] = None

    welcome_quote: Optional[str] = None
    theme_color: Optional[str] = None
    font_family: Optional[str] = None
    audio_url: Optional[str] = None
    bg_image_url: Optional[str] = None
    hero_images: Optional[List[str]] = None

    is_published: Optional[bool] = None

    agendas: Optional[List[AgendaCreate]] = None
    galleries: Optional[List[GalleryCreate]] = None
    bank_accounts: Optional[List[BankAccountCreate]] = None


class InvitationListItem(BaseModel):
    id: int
    slug: str
    template_id: str
    event_type: str
    title_kh: Optional[str]
    groom_name: str
    bride_name: str
    ceremony_date_kh: Optional[str]
    is_published: bool
    views_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class InvitationResponse(InvitationBase):
    id: int
    user_id: Optional[int] = None
    views_count: int = 0
    created_at: datetime
    updated_at: datetime

    agendas: List[AgendaResponse] = []
    galleries: List[GalleryResponse] = []
    bank_accounts: List[BankAccountResponse] = []
    rsvps: Optional[List[GuestRSVPResponse]] = []

    class Config:
        from_attributes = True
