import io
import qrcode
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.routers.deps import get_db, get_current_user, get_optional_current_user
from app.models.user import User
from app.models.rsvp import GuestRSVP
from app.schemas.invitation import (
    InvitationCreate,
    InvitationUpdate,
    InvitationResponse,
    InvitationListItem,
)
from app.schemas.stats import DashboardStatsResponse
from app.services.invitation_service import InvitationService
from app.services.stats_service import StatsService
from app.services.export_service import generate_guests_csv

router = APIRouter(prefix="/invitations", tags=["Invitations"])


def check_invitation_ownership(invitation, user: Optional[User]):
    """Ensure authenticated user owns the invitation if user_id is assigned."""
    if user and invitation.user_id and invitation.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="អ្នកមិនមានសិទ្ធិកែប្រែ ឬគ្រប់គ្រងធៀបនេះទេ (Access denied)"
        )


@router.get("", response_model=List[InvitationResponse])
def list_invitations(
    skip: int = 0,
    limit: int = 100,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id if current_user else None
    return InvitationService.list_all(db, user_id=user_id, skip=skip, limit=limit)


@router.get("/seed", response_model=InvitationResponse)
def get_or_seed_default(db: Session = Depends(get_db)):
    return InvitationService.seed_default_if_empty(db)


@router.post("", response_model=InvitationResponse, status_code=status.HTTP_201_CREATED)
def create_invitation(
    data: InvitationCreate,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id if current_user else None
    return InvitationService.create(db, data, user_id=user_id)


@router.get("/slug/{slug}", response_model=InvitationResponse)
def get_invitation_by_slug(slug: str, db: Session = Depends(get_db)):
    invitation = InvitationService.get_by_slug(db, slug)
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"រកមិនឃើញធៀបឌីជីថលសម្រាប់ slug: {slug} ទេ"
        )
    return invitation


@router.get("/{invitation_id}", response_model=InvitationResponse)
def get_invitation(
    invitation_id: int,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )
    check_invitation_ownership(invitation, current_user)
    return invitation


@router.put("/{invitation_id}", response_model=InvitationResponse)
def update_invitation(
    invitation_id: int,
    data: InvitationUpdate,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    existing = InvitationService.get_by_id(db, invitation_id)
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )
    check_invitation_ownership(existing, current_user)

    invitation = InvitationService.update(db, invitation_id, data)
    return invitation


@router.delete("/{invitation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_invitation(
    invitation_id: int,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    existing = InvitationService.get_by_id(db, invitation_id)
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )
    check_invitation_ownership(existing, current_user)

    InvitationService.delete(db, invitation_id)
    return None


@router.get("/{invitation_id}/stats", response_model=DashboardStatsResponse)
def get_invitation_stats(
    invitation_id: int,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve host dashboard analytics: confirmed guests, tables needed, views count."""
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )
    check_invitation_ownership(invitation, current_user)

    stats = StatsService.get_dashboard_stats(db, invitation_id)
    return stats


@router.get("/{invitation_id}/export-guests")
def export_guests_csv(
    invitation_id: int,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """Export invitation RSVPs to an Excel-friendly CSV with UTF-8 BOM encoding."""
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ"
        )
    check_invitation_ownership(invitation, current_user)

    rsvps = (
        db.query(GuestRSVP)
        .filter(GuestRSVP.invitation_id == invitation_id)
        .order_by(GuestRSVP.id.asc())
        .all()
    )

    csv_bytes = generate_guests_csv(rsvps)
    filename = f"guests_{invitation.slug}.csv"

    return Response(
        content=csv_bytes,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
    )


@router.get("/{invitation_id}/qr")
def generate_invitation_qr(invitation_id: int, request: Request, db: Session = Depends(get_db)):
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")

    base_url = str(request.base_url).rstrip("/")
    target_url = f"{base_url}/invitation/{invitation.slug}"

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=3,
    )
    qr.add_data(target_url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#881337", back_color="#FFFDF8")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return Response(content=buf.getvalue(), media_type="image/png")
