import { BaseModel } from './BaseModel.js';
import { apiService } from '../services/apiService.js';

export class RsvpModel extends BaseModel {
  constructor() {
    super();
    this.rsvps = [];
    this.statusFilter = 'all';
    this.searchQuery = '';
    this.isLoading = false;
  }

  async fetchRSVPs(invitationId) {
    this.isLoading = true;
    this.emit('loadingChanged', true);
    try {
      const data = await apiService.getRSVPs(invitationId, this.statusFilter, this.searchQuery);
      this.rsvps = data || [];
      this.emit('rsvpsLoaded', this.rsvps);
    } catch (err) {
      console.warn('Failed to fetch RSVPs from backend:', err.message);
    } finally {
      this.isLoading = false;
      this.emit('loadingChanged', false);
    }
  }

  setFilter(status) {
    this.statusFilter = status;
    this.emit('filterChanged', status);
  }

  setSearch(query) {
    this.searchQuery = query;
    this.emit('searchChanged', query);
  }

  getFilteredRSVPs() {
    return this.rsvps.filter((rsvp) => {
      const matchesStatus = this.statusFilter === 'all' || rsvp.attendance_status === this.statusFilter;
      const matchesSearch =
        !this.searchQuery ||
        rsvp.guest_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (rsvp.wishes && rsvp.wishes.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }

  async submitRSVP(invitationId, rsvpData) {
    this.isLoading = true;
    this.emit('loadingChanged', true);
    try {
      const newRSVP = await apiService.submitRSVP(invitationId, rsvpData);
      this.rsvps.unshift(newRSVP);
      this.emit('rsvpAdded', newRSVP);
      return newRSVP;
    } catch (err) {
      this.emit('submitError', err);
      throw err;
    } finally {
      this.isLoading = false;
      this.emit('loadingChanged', false);
    }
  }

  async deleteRSVP(rsvpId) {
    try {
      await apiService.deleteRSVP(rsvpId);
      this.rsvps = this.rsvps.filter((r) => r.id !== rsvpId);
      this.emit('rsvpDeleted', rsvpId);
    } catch (err) {
      this.emit('deleteError', err);
      throw err;
    }
  }
}
