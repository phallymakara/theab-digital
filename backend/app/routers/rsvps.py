from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.rsvp import (
    GuestRSVPCreate,
    GuestRSVPUpdate,
    GuestRSVPResponse,
)
from app.services.rsvp_service import RSVPService
from app.services.invitation_service import InvitationService

router = APIRouter(tags=["RSVP"])


@router.get("/invitations/{invitation_id}/rsvps", response_model=List[GuestRSVPResponse])
def get_invitation_rsvps(
    invitation_id: int,
    status: Optional[str] = Query(None, description="all, attending, declined, tentative"),
    search: Optional[str] = Query(None, description="Search by guest name"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(status_code=404, detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ")
    return RSVPService.list_by_invitation(db, invitation_id, status, search, skip, limit)


@router.post("/invitations/{invitation_id}/rsvps", response_model=GuestRSVPResponse, status_code=status.HTTP_201_CREATED)
def submit_rsvp(
    invitation_id: int,
    data: GuestRSVPCreate,
    db: Session = Depends(get_db)
):
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(status_code=404, detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ")
    return RSVPService.create(db, invitation_id, data)


@router.get("/rsvps/{rsvp_id}", response_model=GuestRSVPResponse)
def get_rsvp(rsvp_id: int, db: Session = Depends(get_db)):
    rsvp = RSVPService.get_by_id(db, rsvp_id)
    if not rsvp:
        raise HTTPException(status_code=404, detail="រកមិនឃើញព័ត៌មានភ្ញៀវនេះទេ")
    return rsvp


@router.put("/rsvps/{rsvp_id}", response_model=GuestRSVPResponse)
def update_rsvp(rsvp_id: int, data: GuestRSVPUpdate, db: Session = Depends(get_db)):
    rsvp = RSVPService.update(db, rsvp_id, data)
    if not rsvp:
        raise HTTPException(status_code=404, detail="រកមិនឃើញព័ត៌មានភ្ញៀវនេះទេ")
    return rsvp


@router.delete("/rsvps/{rsvp_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_rsvp(rsvp_id: int, db: Session = Depends(get_db)):
    success = RSVPService.delete(db, rsvp_id)
    if not success:
        raise HTTPException(status_code=404, detail="រកមិនឃើញព័ត៌មានភ្ញៀវនេះទេ")
    return None
