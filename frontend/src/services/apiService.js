/**
 * Digital Theab API Service
 * Handles communication with the FastAPI backend
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData && errData.detail) errorMsg = errData.detail;
        } catch {
          // fallback
        }
        throw new Error(errorMsg);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (err) {
      console.warn(`[ApiService Error on ${endpoint}]:`, err.message);
      throw err;
    }
  }

  // Invitations
  async getOrSeedDefault() {
    return await this.request('/invitations/seed');
  }

  async getInvitation(id) {
    return await this.request(`/invitations/${id}`);
  }

  async getInvitationBySlug(slug) {
    return await this.request(`/invitations/slug/${slug}`);
  }

  async createInvitation(data) {
    return await this.request('/invitations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInvitation(id, data) {
    return await this.request(`/invitations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // RSVPs
  async getRSVPs(invitationId, status = 'all', search = '') {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return await this.request(`/invitations/${invitationId}/rsvps${query}`);
  }

  async submitRSVP(invitationId, rsvpData) {
    return await this.request(`/invitations/${invitationId}/rsvps`, {
      method: 'POST',
      body: JSON.stringify(rsvpData),
    });
  }

  async updateRSVP(rsvpId, rsvpData) {
    return await this.request(`/rsvps/${rsvpId}`, {
      method: 'PUT',
      body: JSON.stringify(rsvpData),
    });
  }

  async deleteRSVP(rsvpId) {
    return await this.request(`/rsvps/${rsvpId}`, {
      method: 'DELETE',
    });
  }

  // Stats
  async getStats(invitationId) {
    return await this.request(`/invitations/${invitationId}/stats`);
  }

  // QR Code URL helper
  getQrCodeUrl(invitationId) {
    return `${BASE_URL}/invitations/${invitationId}/qr`;
  }
}

export const apiService = new ApiService();
