export class DashboardController {
  constructor(appModel, invitationModel, rsvpModel, dashboardModel) {
    this.appModel = appModel;
    this.invitationModel = invitationModel;
    this.rsvpModel = rsvpModel;
    this.dashboardModel = dashboardModel;
  }

  handleFilterChange(status) {
    this.rsvpModel.setFilter(status);
  }

  handleSearch(query) {
    this.rsvpModel.setSearch(query);
  }

  async handleDeleteRsvp(rsvpId) {
    if (confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យភ្ញៀវនេះមែនទេ?')) {
      try {
        await this.rsvpModel.deleteRSVP(rsvpId);
        const invitationId = this.invitationModel.get('id') || 1;
        await this.dashboardModel.fetchStats(invitationId);
        this.appModel.addToast('បានលុបទិន្នន័យភ្ញៀវរួចរាល់', 'info');
      } catch (err) {
        this.appModel.addToast(`បរាជ័យក្នុងការលុប: ${err.message}`, 'error');
      }
    }
  }

  async handleAddGuest() {
    const guestName = prompt('សូមបញ្ចូលឈ្មោះភ្ញៀវថ្មី៖');
    if (!guestName || !guestName.trim()) return;

    const countStr = prompt('សូមបញ្ចូលចំនួនអ្នកចូលរួម (ឧ. 1, 2)៖', '1');
    const guestCount = parseInt(countStr || '1', 10) || 1;

    const wishes = prompt('ពាក្យជូនពរ (បើមាន)៖', '');

    const invitationId = this.invitationModel.get('id') || 1;
    try {
      await this.rsvpModel.submitRSVP(invitationId, {
        guest_name: guestName.trim(),
        attendance_status: 'attending',
        guest_count: guestCount,
        wishes: wishes ? wishes.trim() : null,
        source: 'direct',
      });
      await this.dashboardModel.fetchStats(invitationId);
      this.appModel.addToast(`បានបញ្ចូលភ្ញៀវ ${guestName} ដោយជោគជ័យ!`, 'success');
    } catch (err) {
      this.appModel.addToast(`បរាជ័យក្នុងការបញ្ចូលភ្ញៀវ: ${err.message}`, 'error');
    }
  }
}
