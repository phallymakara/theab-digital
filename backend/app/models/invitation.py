from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship

from app.db.database import Base


class Invitation(Base):
    __tablename__ = "invitations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)
    template_id = Column(String(80), default="royal-gold", nullable=False)
    event_type = Column(String(50), default="wedding", nullable=False)
    title_kh = Column(String(200), default="សិរីសួស្តី អាពាហ៍ពិពាហ៍")

    # Couple Information
    groom_name = Column(String(150), nullable=False, default="សុខ វិបុល")
    groom_title = Column(String(80), default="កូនប្រុសនាម")
    bride_name = Column(String(150), nullable=False, default="ជា សុជាតា")
    bride_title = Column(String(80), default="កូនស្រីនាម")

    # Parents & Residence
    groom_father = Column(String(150), default="លោក ចាន់ សុផល")
    groom_mother = Column(String(150), default="លោកស្រី ម៉ៅ សុខា")
    groom_residence = Column(String(200), default="រាជធានីភ្នំពេញ")
    bride_father = Column(String(150), default="លោក តែ គឹមសុង")
    bride_mother = Column(String(150), default="លោកស្រី លឹម គន្ធី")
    bride_residence = Column(String(200), default="រាជធានីភ្នំពេញ")

    # Contact & Social
    phone_groom = Column(String(50), default="012 345 678")
    phone_bride = Column(String(50), default="098 765 432")
    telegram_link = Column(String(255), default="https://t.me/theab_invitation")
    telegram_username = Column(String(100), default="@theab_invitation")

    # Ceremony Date & Venue
    event_date_raw = Column(String(30), default="2027-01-10")
    ceremony_date_kh = Column(String(120), default="ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧")
    ceremony_time = Column(String(100), default="ម៉ោង ០៥:០០ ល្ងាច")
    location_name = Column(String(255), default="សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Rosewood Phnom Penh - Grand Ballroom)")
    location_address = Column(String(255), default="អគារ វឌ្ឍនៈ កាពីតាល់ មហាវិថីព្រះមុនីវង្ស សង្កាត់វត្តភ្នំ រាជធានីភ្នំពេញ")
    google_maps_url = Column(String(500), default="https://maps.google.com/?q=Rosewood+Phnom+Penh")

    # Content & Styling
    welcome_quote = Column(
        Text,
        default="យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍"
    )
    theme_color = Column(String(50), default="gold")
    font_family = Column(String(80), default="font-komutt-a")
    audio_url = Column(String(500), default="/audio/nisai_wedding_song.mp3")
    bg_image_url = Column(String(500), default="/images/templates/royal_gold_prewedding.webp")
    hero_images = Column(JSON, default=list)

    # Status & Counters
    is_published = Column(Boolean, default=True)
    views_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    owner = relationship("User", back_populates="invitations")
    agendas = relationship("InvitationAgenda", back_populates="invitation", cascade="all, delete-orphan", order_by="InvitationAgenda.order_index")
    galleries = relationship("InvitationGallery", back_populates="invitation", cascade="all, delete-orphan", order_by="InvitationGallery.order_index")
    bank_accounts = relationship("InvitationBankAccount", back_populates="invitation", cascade="all, delete-orphan")
    rsvps = relationship("GuestRSVP", back_populates="invitation", cascade="all, delete-orphan", order_by="GuestRSVP.created_at.desc()")


class InvitationAgenda(Base):
    __tablename__ = "invitation_agendas"

    id = Column(Integer, primary_key=True, index=True)
    invitation_id = Column(Integer, ForeignKey("invitations.id", ondelete="CASCADE"), nullable=False, index=True)
    time_text = Column(String(80), nullable=False)
    title_kh = Column(String(255), nullable=False)
    description_kh = Column(Text, nullable=True)
    order_index = Column(Integer, default=0, nullable=False)

    # Relationships
    invitation = relationship("Invitation", back_populates="agendas")


class InvitationGallery(Base):
    __tablename__ = "invitation_galleries"

    id = Column(Integer, primary_key=True, index=True)
    invitation_id = Column(Integer, ForeignKey("invitations.id", ondelete="CASCADE"), nullable=False, index=True)
    image_url = Column(String(500), nullable=False)
    caption = Column(String(255), nullable=True)
    order_index = Column(Integer, default=0, nullable=False)

    # Relationships
    invitation = relationship("Invitation", back_populates="galleries")


class InvitationBankAccount(Base):
    __tablename__ = "invitation_bank_accounts"

    id = Column(Integer, primary_key=True, index=True)
    invitation_id = Column(Integer, ForeignKey("invitations.id", ondelete="CASCADE"), nullable=False, index=True)
    bank_name = Column(String(100), default="ABA Bank", nullable=False)
    account_name = Column(String(150), nullable=False)
    account_number = Column(String(100), nullable=False)
    qr_code_url = Column(String(500), nullable=True)
    is_primary = Column(Boolean, default=True)

    # Relationships
    invitation = relationship("Invitation", back_populates="bank_accounts")
