import re
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.invitation import (
    Invitation,
    InvitationAgenda,
    InvitationGallery,
    InvitationBankAccount
)
from app.models.rsvp import GuestRSVP
from app.schemas.invitation import InvitationCreate, InvitationUpdate
from app.core.security import hash_password


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
    def list_all(db: Session, user_id: Optional[int] = None, skip: int = 0, limit: int = 100) -> List[Invitation]:
        query = db.query(Invitation)
        if user_id:
            query = query.filter(Invitation.user_id == user_id)
        return query.order_by(Invitation.id.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def create(db: Session, data: InvitationCreate, user_id: Optional[int] = None) -> Invitation:
        base_slug = data.slug or f"{slugify(data.groom_name)}-{slugify(data.bride_name)}"
        slug = base_slug
        counter = 1
        while db.query(Invitation).filter(Invitation.slug == slug).first():
            slug = f"{base_slug}-{counter}"
            counter += 1

        invitation_dict = data.model_dump(exclude={"agendas", "galleries", "bank_accounts"})
        invitation_dict["slug"] = slug
        if user_id:
            invitation_dict["user_id"] = user_id

        invitation = Invitation(**invitation_dict)
        db.add(invitation)
        db.commit()
        db.refresh(invitation)

        # Add Agendas
        if data.agendas:
            for i, agenda_data in enumerate(data.agendas):
                agenda = InvitationAgenda(
                    invitation_id=invitation.id,
                    time_text=agenda_data.time_text,
                    title_kh=agenda_data.title_kh,
                    description_kh=agenda_data.description_kh,
                    order_index=agenda_data.order_index if agenda_data.order_index is not None else i
                )
                db.add(agenda)

        # Add Galleries
        if data.galleries:
            for i, gallery_data in enumerate(data.galleries):
                gallery = InvitationGallery(
                    invitation_id=invitation.id,
                    image_url=gallery_data.image_url,
                    caption=gallery_data.caption,
                    order_index=gallery_data.order_index if gallery_data.order_index is not None else i
                )
                db.add(gallery)

        # Add Bank Accounts
        if data.bank_accounts:
            for bank_data in data.bank_accounts:
                bank = InvitationBankAccount(
                    invitation_id=invitation.id,
                    bank_name=bank_data.bank_name,
                    account_name=bank_data.account_name,
                    account_number=bank_data.account_number,
                    qr_code_url=bank_data.qr_code_url,
                    is_primary=bank_data.is_primary
                )
                db.add(bank)

        db.commit()
        db.refresh(invitation)
        return invitation

    @staticmethod
    def update(db: Session, invitation_id: int, data: InvitationUpdate) -> Optional[Invitation]:
        invitation = db.query(Invitation).filter(Invitation.id == invitation_id).first()
        if not invitation:
            return None

        update_dict = data.model_dump(exclude_unset=True, exclude={"agendas", "galleries", "bank_accounts"})
        for key, value in update_dict.items():
            setattr(invitation, key, value)

        # Update Agendas if explicitly provided
        if data.agendas is not None:
            db.query(InvitationAgenda).filter(InvitationAgenda.invitation_id == invitation.id).delete()
            for i, a in enumerate(data.agendas):
                db.add(InvitationAgenda(
                    invitation_id=invitation.id,
                    time_text=a.time_text,
                    title_kh=a.title_kh,
                    description_kh=a.description_kh,
                    order_index=a.order_index if a.order_index is not None else i
                ))

        # Update Galleries if explicitly provided
        if data.galleries is not None:
            db.query(InvitationGallery).filter(InvitationGallery.invitation_id == invitation.id).delete()
            for i, g in enumerate(data.galleries):
                db.add(InvitationGallery(
                    invitation_id=invitation.id,
                    image_url=g.image_url,
                    caption=g.caption,
                    order_index=g.order_index if g.order_index is not None else i
                ))

        # Update Bank Accounts if explicitly provided
        if data.bank_accounts is not None:
            db.query(InvitationBankAccount).filter(InvitationBankAccount.invitation_id == invitation.id).delete()
            for b in data.bank_accounts:
                db.add(InvitationBankAccount(
                    invitation_id=invitation.id,
                    bank_name=b.bank_name,
                    account_name=b.account_name,
                    account_number=b.account_number,
                    qr_code_url=b.qr_code_url,
                    is_primary=b.is_primary
                ))

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
        # 1. Seed demo user if not present
        demo_user = db.query(User).filter(User.email == "demo@theabdigital.com").first()
        if not demo_user:
            demo_user = User(
                email="demo@theabdigital.com",
                hashed_password=hash_password("Demo123456!"),
                full_name="សុខ វិបុល",
                phone="012 345 678",
                avatar_url="/images/templates/royal-gold/gold_1.webp",
                is_active=True
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)

        first = db.query(Invitation).first()
        if first:
            return first

        # 2. Seed default invitation with all 35+ fields
        default_invitation = Invitation(
            user_id=demo_user.id,
            slug="vibol-sovanndy",
            template_id="royal-gold",
            event_type="wedding",
            title_kh="សិរីសួស្តី អាពាហ៍ពិពាហ៍",

            groom_name="សុខ វិបុល",
            groom_title="កូនប្រុសនាម",
            bride_name="ជា សុជាតា",
            bride_title="កូនស្រីនាម",

            groom_father="លោក សុខ ជា",
            groom_mother="លោកស្រី កែវ ផល្លី",
            groom_residence="រាជធានីភ្នំពេញ",
            bride_father="លោក ជា វណ្ណា",
            bride_mother="លោកស្រី ហែម ស៊ីវន",
            bride_residence="រាជធានីភ្នំពេញ",

            phone_groom="012 345 678",
            phone_bride="098 765 432",
            telegram_link="https://t.me/theab_invitation",
            telegram_username="@theab_invitation",

            event_date_raw="2027-01-10",
            ceremony_date_kh="ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧",
            ceremony_time="ម៉ោង ០៥:០០ ល្ងាច",
            location_name="សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Rosewood Phnom Penh - Grand Ballroom)",
            location_address="អគារ វឌ្ឍនៈ កាពីតាល់ មហាវិថីព្រះមុនីវង្ស សង្កាត់វត្តភ្នំ រាជធានីភ្នំពេញ",
            google_maps_url="https://maps.google.com/?q=The+Premier+Centre+Sen+Sok",

            welcome_quote="យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ",
            theme_color="gold",
            font_family="font-komutt-a",
            audio_url="/audio/nisai_wedding_song.mp3",
            bg_image_url="/images/templates/royal_gold_prewedding.webp",
            hero_images=[
                "/images/templates/royal-gold/gold_1.webp",
                "/images/templates/royal-gold/gold_2.webp",
                "/images/templates/royal-gold/gold_3.webp",
                "/images/templates/royal-gold/gold_4.webp"
            ],
            is_published=True,
            views_count=128
        )
        db.add(default_invitation)
        db.commit()
        db.refresh(default_invitation)

        # 3. Seed Agendas (Traditional Khmer Wedding Program)
        agendas = [
            InvitationAgenda(
                invitation_id=default_invitation.id,
                time_text="០៦:៣០ ព្រឹក",
                title_kh="ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន",
                description_kh="ជួបជុំបងប្អូនញាតិមិត្តជិតឆ្ងាយរៀបចំគ្រឿងដង្វាយសូត្រមាស",
                order_index=1
            ),
            InvitationAgenda(
                invitation_id=default_invitation.id,
                time_text="០៧:០០ ព្រឹក",
                title_kh="ពិធីហែចំនូនចូលរោងជ័យមង្គល",
                description_kh="ក្បួនហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គល",
                order_index=2
            ),
            InvitationAgenda(
                invitation_id=default_invitation.id,
                time_text="០៨:៣០ ព្រឹក",
                title_kh="ពិធីកាត់សក់បង្កក់សិរីមង្គល",
                description_kh="កាត់សក់ជម្រះចង្រៃ និងប្រសិទ្ធពរជ័យសិរីសួស្តី",
                order_index=3
            ),
            InvitationAgenda(
                invitation_id=default_invitation.id,
                time_text="០៩:៣០ ព្រឹក",
                title_kh="ពិធីសំពះផ្ទឹម ចងដៃសូត្រមាស បង្វិលពពិល ព្រះថោងតោងស្បៃ",
                description_kh="សំពះផ្ទឹមក្រងសីមា ចងខ្សែអំបោះក្រហម និងបង្វិលពពិលជ័យ",
                order_index=4
            ),
            InvitationAgenda(
                invitation_id=default_invitation.id,
                time_text="០៥:០០ ល្ងាច",
                title_kh="ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងរាត្រីសមោសរ",
                description_kh="ពិសារភោជនាហារពេលរាត្រី និងរីករាយជាមួយតន្ត្រីសម័យអភិជន",
                order_index=5
            ),
        ]
        db.add_all(agendas)

        # 4. Seed Photo Gallery
        galleries = [
            InvitationGallery(
                invitation_id=default_invitation.id,
                image_url="/images/templates/royal-gold/gold_1.webp",
                caption="ស្នេហ៍ផ្អែមល្ហែមរវាងគូស្នេហ៍",
                order_index=1
            ),
            InvitationGallery(
                invitation_id=default_invitation.id,
                image_url="/images/templates/royal-gold/gold_2.webp",
                caption="មង្គលសិរីមាសប្រណិត",
                order_index=2
            ),
            InvitationGallery(
                invitation_id=default_invitation.id,
                image_url="/images/templates/royal-gold/gold_3.webp",
                caption="អនុស្សាវរីយ៍ផ្កាស្រស់រ៉ូមែនទិក",
                order_index=3
            ),
            InvitationGallery(
                invitation_id=default_invitation.id,
                image_url="/images/templates/royal-gold/gold_4.webp",
                caption="ភាពថ្លៃថ្នូរ និងសេចក្តីសុខក្សេមក្សាន្ត",
                order_index=4
            ),
        ]
        db.add_all(galleries)

        # 5. Seed Bank Account (KHQR)
        bank = InvitationBankAccount(
            invitation_id=default_invitation.id,
            bank_name="ABA Bank",
            account_name="SOKH VIBOL & CHEA SOCHEATA",
            account_number="000 987 654",
            qr_code_url="/images/aba_qr.webp",
            is_primary=True
        )
        db.add(bank)

        # 6. Seed Sample RSVPs
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
        ]
        db.add_all(sample_rsvps)
        db.commit()

        return default_invitation
