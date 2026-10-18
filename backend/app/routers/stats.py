from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.stats import DashboardStatsResponse
from app.services.stats_service import StatsService
from app.services.invitation_service import InvitationService

router = APIRouter(prefix="/invitations", tags=["Statistics"])


@router.get("/{invitation_id}/stats", response_model=DashboardStatsResponse)
def get_invitation_stats(invitation_id: int, db: Session = Depends(get_db)):
    invitation = InvitationService.get_by_id(db, invitation_id)
    if not invitation:
        raise HTTPException(status_code=404, detail="រកមិនឃើញព័ត៌មានលិខិតអញ្ជើញនេះទេ")
    return StatsService.get_dashboard_stats(db, invitation_id)
