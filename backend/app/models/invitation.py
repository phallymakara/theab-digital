from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base


class Invitation(Base):
    __tablename__ = "invitations"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)
    event_type = Column(String(50), default="wedding", nullable=False)
    title_kh = Column(String(200), default="សិរីសួស្តី អាពាហ៍ពិពាហ៍")
    groom_name = Column(String(150), nullable=False, default="សុខ វិបុល")
    bride_name = Column(String(150), nullable=False, default="ជា សុជាតា")
    groom_parents = Column(String(255), default="លោក សុខ ជា និង លោកស្រី កែវ ផល្លី")
    bride_parents = Column(String(255), default="លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន")
    ceremony_date = Column(String(100), default="ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦")
    ceremony_time = Column(String(100), default="វេលាម៉ោង ៥:០០ ល្ងាច តទៅ")
    event_timestamp = Column(DateTime, nullable=True)
    location_name = Column(String(255), default="មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)")
    location_address = Column(String(255), default="រាជធានីភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា")
    google_maps_url = Column(String(500), default="https://maps.google.com")
    theme_color = Column(String(50), default="crimson")
    welcome_quote = Column(
        Text,
        default="យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍"
    )
    audio_url = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    rsvps = relationship("GuestRSVP", back_populates="invitation", cascade="all, delete-orphan")
