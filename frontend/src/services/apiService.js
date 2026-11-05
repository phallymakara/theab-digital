/**
 * Digital Theab API Service
 * Handles communication with the FastAPI backend
 */

const RAW_URL = import.meta.env.VITE_API_URL || '/api/v1';
const BASE_URL = RAW_URL.endsWith('/') ? RAW_URL.slice(0, -1) : RAW_URL;

class ApiService {
  getToken() {
    try {
      return localStorage.getItem('theab_token');
    } catch {
      return null;
    }
  }

  setToken(token) {
    try {
      if (token) {
        localStorage.setItem('theab_token', token);
      } else {
        localStorage.removeItem('theab_token');
      }
    } catch {
      // ignore storage errors
    }
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

  // ---------------------------------------------------------
  // Authentication
  // ---------------------------------------------------------
  async register(data) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res && res.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  async login(email, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res && res.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  async getMe() {
    return await this.request('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // ---------------------------------------------------------
  // Media Upload (Cloudflare R2 / Local WebP Optimizer)
  // ---------------------------------------------------------
  async uploadMedia(file, category = 'gallery') {
    const url = `${BASE_URL}/media/upload`;
    const token = this.getToken();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      let errorMsg = `Upload failed (HTTP ${response.status})`;
      try {
        const errData = await response.json();
        if (errData && errData.detail) errorMsg = errData.detail;
      } catch {
        // fallback
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  }

  async deleteMedia(fileKey) {
    return await this.request(`/media/${fileKey}`, {
      method: 'DELETE',
    });
  }

  // ---------------------------------------------------------
  // Public Guest Endpoints (Zero Auth Required)
  // ---------------------------------------------------------
  async getPublicInvitation(slug) {
    return await this.request(`/public/invitations/${slug}`);
  }

  async submitPublicRSVP(slug, rsvpData) {
    return await this.request(`/public/invitations/${slug}/rsvps`, {
      method: 'POST',
      body: JSON.stringify(rsvpData),
    });
  }

  async getPublicWishes(slug, skip = 0, limit = 50) {
    return await this.request(`/public/invitations/${slug}/wishes?skip=${skip}&limit=${limit}`);
  }

  // ---------------------------------------------------------
  // Host Invitations Management
  // ---------------------------------------------------------
  async listInvitations() {
    return await this.request('/invitations');
  }

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

  async deleteInvitation(id) {
    return await this.request(`/invitations/${id}`, {
      method: 'DELETE',
    });
  }

  // ---------------------------------------------------------
  // Host RSVPs & Analytics
  // ---------------------------------------------------------
  async getRSVPs(invitationId, status = 'all', search = '') {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return await this.request(`/invitations/${invitationId}/rsvps${query}`);
  }

  async getStats(invitationId) {
    return await this.request(`/invitations/${invitationId}/stats`);
  }

  getExportGuestsUrl(invitationId) {
    return `${BASE_URL}/invitations/${invitationId}/export-guests`;
  }

  getQrCodeUrl(invitationId) {
    return `${BASE_URL}/invitations/${invitationId}/qr`;
  }
}

export const apiService = new ApiService();
