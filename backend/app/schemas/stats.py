from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    invitation_id: int
    total_responses: int
    total_attending_guests: int
    attending_parties: int
    declined_parties: int
    tentative_parties: int
    estimated_tables: int  # computed at 10 seats per table
    recent_wishes_count: int
