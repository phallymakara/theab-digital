import re
import html
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from datetime import datetime
from sqlalchemy.orm import Session

from app.routers.deps import get_db
from app.models.invitation import Invitation
from app.models.rsvp import GuestRSVP
from app.schemas.invitation import InvitationResponse
from app.schemas.rsvp import GuestRSVPCreate, GuestRSVPResponse

router = APIRouter(prefix="/public/invitations", tags=["Public Guest Access"])


class GuestWishFeedItem(BaseModel):
    id: int
    guest_name: str
    wishes: str
    attendance_status: str
    source: Optional[str] = "direct"
    created_at: datetime

    class Config:
        from_attributes = True


def sanitize_text(text: Optional[str]) -> Optional[str]:
    """Strip script tags and contents, remove HTML tags, and escape dangerous characters."""
    if not text:
        return None
    # Strip <script>...</script> and <style>...</style> including their inner content
    cleaned = re.sub(r'<(script|style).*?>.*?</\1>', '', text, flags=re.DOTALL | re.IGNORECASE)
    # Strip any remaining HTML tags
    cleaned = re.sub(r'<[^>]*?>', '', cleaned)
    # Escape special characters
    return html.escape(cleaned.strip())


@router.get("/{slug}", response_model=InvitationResponse)
def get_public_invitation(slug: str, db: Session = Depends(get_db)):
    """
    Public endpoint for wedding guests:
    - Zero authentication required.
    - Loads all ceremony metadata, couple profiles, schedules, photo galleries, and KHQR info.
    - Atomically increments views_count.
    """
    invitation = db.query(Invitation).filter(Invitation.slug == slug).first()
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"រកមិនឃើញធៀបឌីជីថលសម្រាប់តំណភ្ជាប់នេះទេ (Invitation not found: {slug})"
        )
    
    if not invitation.is_published:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ធៀបឌីជីថលនេះត្រូវបានបិទផ្សាយបណ្ដោះអាសន្ន (Invitation is currently unpublished)"
        )

    # Atomically increment views count
    invitation.views_count = (invitation.views_count or 0) + 1
    db.commit()
    db.refresh(invitation)

    return invitation


@router.post("/{slug}/rsvps", response_model=GuestRSVPResponse, status_code=status.HTTP_201_CREATED)
def submit_guest_rsvp(
    slug: str,
    data: GuestRSVPCreate,
    db: Session = Depends(get_db)
):
    """
    Public endpoint for guest RSVP & wishes submission:
    - Zero login required.
    - Automatic input sanitization against XSS.
    """
    invitation = db.query(Invitation).filter(Invitation.slug == slug).first()
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )

    guest_name = sanitize_text(data.guest_name)
    if not guest_name or len(guest_name) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="សូមបញ្ចូលឈ្មោះភ្ញៀវកិត្តិយសឱ្យបានត្រឹមត្រូវ (Guest name is required)"
        )

    clean_wishes = sanitize_text(data.wishes)
    clean_phone = sanitize_text(data.phone)

    guest_count = data.guest_count if data.attendance_status == "attending" else 0

    rsvp = GuestRSVP(
        invitation_id=invitation.id,
        guest_name=guest_name,
        phone=clean_phone,
        attendance_status=data.attendance_status,
        guest_count=guest_count,
        wishes=clean_wishes,
        source=data.source or "direct"
    )
    db.add(rsvp)
    db.commit()
    db.refresh(rsvp)

    return rsvp


@router.get("/{slug}/wishes", response_model=List[GuestWishFeedItem])
def get_public_wishes_feed(
    slug: str,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """
    Public endpoint: Get a stream of blessings/wishes submitted by guests for the digital guestbook.
    """
    invitation = db.query(Invitation).filter(Invitation.slug == slug).first()
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )

    wishes = (
        db.query(GuestRSVP)
        .filter(GuestRSVP.invitation_id == invitation.id)
        .filter(GuestRSVP.wishes.isnot(None))
        .filter(GuestRSVP.wishes != "")
        .order_by(GuestRSVP.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return wishes
