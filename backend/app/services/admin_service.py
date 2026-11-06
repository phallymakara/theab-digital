import logging
from typing import Dict, Any, List, Optional
from sqlalchemy import func, desc
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.models.user import User
from app.models.invitation import Invitation
from app.models.rsvp import GuestRSVP

logger = logging.getLogger("uvicorn.error")


class AdminService:
    @staticmethod
    def seed_superadmin_if_configured(db: Session) -> Optional[User]:
        """Ensure superadmin account exists in database based on environment configuration."""
        email = settings.SUPERADMIN_EMAIL
        password = settings.SUPERADMIN_PASSWORD

        if not email or not password:
            return None

        clean_email = email.lower().strip()
        user = db.query(User).filter(User.email == clean_email).first()

        if user:
            # Ensure superadmin privileges are active
            changed = False
            if not getattr(user, "is_superuser", False):
                user.is_superuser = True
                changed = True
            if getattr(user, "role", "") != "superadmin":
                user.role = "superadmin"
                changed = True
            if not user.is_active:
                user.is_active = True
                changed = True
            # Always ensure the password hash matches the configured password
            user.hashed_password = hash_password(password)
            changed = True

            if changed:
                db.commit()
                db.refresh(user)
                logger.info("Superadmin account updated: %s", clean_email)
            return user
        else:
            superadmin = User(
                email=clean_email,
                hashed_password=hash_password(password),
                full_name="Super Administrator",
                phone="012 334 455",
                is_active=True,
                is_superuser=True,
                role="superadmin"
            )
            db.add(superadmin)
            db.commit()
            db.refresh(superadmin)
            logger.info("Superadmin account created successfully: %s", clean_email)
            return superadmin

    @staticmethod
    def get_platform_metrics(db: Session) -> Dict[str, Any]:
        """Aggregate high-level platform statistics for the superadmin dashboard."""
        total_users = db.query(func.count(User.id)).scalar() or 0
        active_users = db.query(func.count(User.id)).filter(User.is_active == True).scalar() or 0
        
        total_invitations = db.query(func.count(Invitation.id)).scalar() or 0
        published_invitations = db.query(func.count(Invitation.id)).filter(Invitation.is_published == True).scalar() or 0
        
        total_rsvps = db.query(func.count(GuestRSVP.id)).scalar() or 0
        attending_parties = db.query(func.count(GuestRSVP.id)).filter(GuestRSVP.attendance_status == "attending").scalar() or 0
        declined_parties = db.query(func.count(GuestRSVP.id)).filter(GuestRSVP.attendance_status == "declined").scalar() or 0
        
        total_attending_guests = (
            db.query(func.coalesce(func.sum(GuestRSVP.guest_count), 0))
            .filter(GuestRSVP.attendance_status == "attending")
            .scalar()
            or 0
        )
        
        total_wishes = (
            db.query(func.count(GuestRSVP.id))
            .filter(GuestRSVP.wishes != None, GuestRSVP.wishes != "")
            .scalar()
            or 0
        )

        # Ceremony types breakdown
        ceremonies = (
            db.query(Invitation.event_type, func.count(Invitation.id))
            .group_by(Invitation.event_type)
            .all()
        )
        ceremony_stats = {str(c[0]): c[1] for c in ceremonies}

        return {
            "total_users": total_users,
            "active_users": active_users,
            "total_invitations": total_invitations,
            "published_invitations": published_invitations,
            "total_rsvps": total_rsvps,
            "attending_parties": attending_parties,
            "declined_parties": declined_parties,
            "total_attending_guests": int(total_attending_guests),
            "total_wishes": total_wishes,
            "ceremony_stats": ceremony_stats,
        }

    @staticmethod
    def list_users(
        db: Session,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 50
    ) -> List[Dict[str, Any]]:
        """List registered users with their invitation counts."""
        query = db.query(User)
        if search and search.strip():
            term = f"%{search.strip().lower()}%"
            query = query.filter(
                (func.lower(User.email).like(term)) |
                (func.lower(User.full_name).like(term)) |
                (User.phone.like(term))
            )

        users = query.order_by(desc(User.created_at)).offset(skip).limit(limit).all()

        user_list = []
        for u in users:
            inv_count = db.query(func.count(Invitation.id)).filter(Invitation.user_id == u.id).scalar() or 0
            user_list.append({
                "id": u.id,
                "email": u.email,
                "full_name": u.full_name,
                "phone": u.phone,
                "is_active": u.is_active,
                "is_superuser": getattr(u, "is_superuser", False),
                "role": getattr(u, "role", "user"),
                "created_at": u.created_at,
                "invitations_count": inv_count
            })
        return user_list

    @staticmethod
    def list_invitations(
        db: Session,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 50
    ) -> List[Dict[str, Any]]:
        """List all digital theabs served across the platform."""
        query = db.query(Invitation)
        if search and search.strip():
            term = f"%{search.strip().lower()}%"
            query = query.filter(
                (func.lower(Invitation.slug).like(term)) |
                (func.lower(Invitation.groom_name).like(term)) |
                (func.lower(Invitation.bride_name).like(term))
            )

        invitations = query.order_by(desc(Invitation.id)).offset(skip).limit(limit).all()

        result = []
        for inv in invitations:
            rsvp_count = db.query(func.count(GuestRSVP.id)).filter(GuestRSVP.invitation_id == inv.id).scalar() or 0
            owner_email = inv.owner.email if inv.owner else "System / Default"
            result.append({
                "id": inv.id,
                "slug": inv.slug,
                "title_kh": inv.title_kh,
                "groom_name": inv.groom_name,
                "bride_name": inv.bride_name,
                "event_type": inv.event_type,
                "template_id": inv.template_id,
                "is_published": inv.is_published,
                "views_count": inv.views_count or 0,
                "rsvps_count": rsvp_count,
                "owner_email": owner_email,
                "created_at": inv.created_at
            })
        return result

