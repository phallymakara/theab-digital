from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.rsvp import GuestRSVP
from app.schemas.rsvp import GuestRSVPCreate, GuestRSVPUpdate


class RSVPService:
    @staticmethod
    def get_by_id(db: Session, rsvp_id: int) -> Optional[GuestRSVP]:
        return db.query(GuestRSVP).filter(GuestRSVP.id == rsvp_id).first()

    @staticmethod
    def list_by_invitation(
        db: Session,
        invitation_id: int,
        status: Optional[str] = None,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[GuestRSVP]:
        query = db.query(GuestRSVP).filter(GuestRSVP.invitation_id == invitation_id)
        if status and status != "all":
            query = query.filter(GuestRSVP.attendance_status == status)
        if search:
            query = query.filter(GuestRSVP.guest_name.ilike(f"%{search}%"))
        return query.order_by(GuestRSVP.id.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def create(db: Session, invitation_id: int, data: GuestRSVPCreate) -> GuestRSVP:
        rsvp = GuestRSVP(
            invitation_id=invitation_id,
            guest_name=data.guest_name.strip(),
            phone=data.phone.strip() if data.phone else None,
            attendance_status=data.attendance_status,
            guest_count=data.guest_count if data.attendance_status == "attending" else 0,
            wishes=data.wishes.strip() if data.wishes else None,
            source=data.source or "direct"
        )
        db.add(rsvp)
        db.commit()
        db.refresh(rsvp)
        return rsvp

    @staticmethod
    def update(db: Session, rsvp_id: int, data: GuestRSVPUpdate) -> Optional[GuestRSVP]:
        rsvp = db.query(GuestRSVP).filter(GuestRSVP.id == rsvp_id).first()
        if not rsvp:
            return None

        update_dict = data.model_dump(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(rsvp, key, value)

        db.commit()
        db.refresh(rsvp)
        return rsvp

    @staticmethod
    def delete(db: Session, rsvp_id: int) -> bool:
        rsvp = db.query(GuestRSVP).filter(GuestRSVP.id == rsvp_id).first()
        if not rsvp:
            return False
        db.delete(rsvp)
        db.commit()
        return True
