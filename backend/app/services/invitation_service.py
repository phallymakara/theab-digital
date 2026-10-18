import re
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.invitation import Invitation
from app.models.rsvp import GuestRSVP
from app.schemas.invitation import InvitationCreate, InvitationUpdate


def slugify(text: str) -> str:
    cleaned = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', cleaned) or "invitation"


class InvitationService:
    @staticmethod
    def get_by_id(db: Session, invitation_id: int) -> Optional[Invitation]:
        return db.query(Invitation).filter(Invitation.id == invitation_id).first()

    @staticmethod
    def get_by_slug(db: Session, slug: str) -> Optional[Invitation]:
        return db.query(Invitation).filter(Invitation.slug == slug).first()

    @staticmethod
    def list_all(db: Session, skip: int = 0, limit: int = 100) -> List[Invitation]:
        return db.query(Invitation).order_by(Invitation.id.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def create(db: Session, data: InvitationCreate) -> Invitation:
        base_slug = data.slug or f"{slugify(data.groom_name)}-{slugify(data.bride_name)}"
        slug = base_slug
        counter = 1
        while db.query(Invitation).filter(Invitation.slug == slug).first():
            slug = f"{base_slug}-{counter}"
            counter += 1

        invitation_data = data.model_dump()
        invitation_data["slug"] = slug

        invitation = Invitation(**invitation_data)
        db.add(invitation)
        db.commit()
        db.refresh(invitation)
        return invitation

    @staticmethod
    def update(db: Session, invitation_id: int, data: InvitationUpdate) -> Optional[Invitation]:
        invitation = db.query(Invitation).filter(Invitation.id == invitation_id).first()
        if not invitation:
            return None

        update_dict = data.model_dump(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(invitation, key, value)

        db.commit()
        db.refresh(invitation)
        return invitation

    @staticmethod
    def delete(db: Session, invitation_id: int) -> bool:
        invitation = db.query(Invitation).filter(Invitation.id == invitation_id).first()
        if not invitation:
            return False
        db.delete(invitation)
        db.commit()
        return True

    @staticmethod
    def seed_default_if_empty(db: Session) -> Invitation:
        first = db.query(Invitation).first()
        if first:
            return first

        default_invitation = Invitation(
            slug="vibol-sovanndy",
            event_type="wedding",
            title_kh="សិរីសួស្តី អាពាហ៍ពិពាហ៍",
            groom_name="សុខ វិបុល",
            bride_name="ជា សុជាតា",
            groom_parents="លោក សុខ ជា និង លោកស្រី កែវ ផល្លី",
            bride_parents="លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន",
            ceremony_date="ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦",
            ceremony_time="វេលាម៉ោង ៥:០០ ល្ងាច តទៅ",
            location_name="មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)",
            location_address="ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ",
            google_maps_url="https://maps.google.com/?q=The+Premier+Centre+Sen+Sok",
            theme_color="crimson",
            welcome_quote="យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ",
            audio_url="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=traditional-asian-instrumental-wedding-112191.mp3",
            is_published=True,
        )
        db.add(default_invitation)
        db.commit()
        db.refresh(default_invitation)

        # Seed initial sample RSVPs for lively dashboard demo
        sample_rsvps = [
            GuestRSVP(
                invitation_id=default_invitation.id,
                guest_name="ឯកឧត្តម ប៊ុន រស្មី",
                phone="012 345 678",
                attendance_status="attending",
                guest_count=2,
                wishes="សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មី ស្រលាញ់គ្នារហូតដល់ចាស់កោងខ្នង មានសុភមង្គល និងទ្រព្យសម្បត្តិស្តុកស្តម្ភ!",
                source="telegram",
            ),
            GuestRSVP(
                invitation_id=default_invitation.id,
                guest_name="លោកជំទាវ កែវ មុនីរ័ត្ន",
                phone="098 765 432",
                attendance_status="attending",
                guest_count=3,
                wishes="សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការដល់កូនទាំងពីរ!",
                source="direct",
            ),
            GuestRSVP(
                invitation_id=default_invitation.id,
                guest_name="លោក ជា ចំរើន",
                phone="077 889 900",
                attendance_status="declined",
                guest_count=1,
                wishes="សុំទោសផង ដោយសារជាប់បេសកកម្មនៅខេត្ត មិនអាចចូលរួមបានទេ តែសូមជូនពរឱ្យមានសុភមង្គល!",
                source="direct",
            ),
            GuestRSVP(
                invitation_id=default_invitation.id,
                guest_name="អ្នកនាង អ៊ុក សោភា",
                phone="085 112 233",
                attendance_status="attending",
                guest_count=2,
                wishes="Happy Wedding Day! Wish you both lifetime happiness and joy!",
                source="qr_code",
            ),
        ]
        db.add_all(sample_rsvps)
        db.commit()

        return default_invitation
