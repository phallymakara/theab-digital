import { BaseModel } from './BaseModel.js';
import { apiService } from '../services/apiService.js';

export class DashboardModel extends BaseModel {
  constructor() {
    super();
    this.stats = {
      totalResponses: 0,
      totalAttendingGuests: 0,
      attendingParties: 0,
      declinedParties: 0,
      tentativeParties: 0,
      estimatedTables: 0,
      recentWishesCount: 0,
    };
    this.isLoading = false;
  }

  async fetchStats(invitationId) {
    this.isLoading = true;
    this.emit('loadingChanged', true);
    try {
      const data = await apiService.getStats(invitationId);
      if (data) {
        this.stats = {
          totalResponses: data.total_responses,
          totalAttendingGuests: data.total_attending_guests,
          attendingParties: data.attending_parties,
          declinedParties: data.declined_parties,
          tentativeParties: data.tentative_parties,
          estimatedTables: data.estimated_tables,
          recentWishesCount: data.recent_wishes_count,
        };
        this.emit('statsLoaded', this.stats);
      }
    } catch (err) {
      console.warn('Failed to load stats from backend:', err.message);
    } finally {
      this.isLoading = false;
      this.emit('loadingChanged', false);
    }
  }

  getStats() {
    return { ...this.stats };
  }
}
