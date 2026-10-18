import confetti from 'canvas-confetti';

export class RsvpController {
  constructor(appModel, invitationModel, rsvpModel, dashboardModel) {
    this.appModel = appModel;
    this.invitationModel = invitationModel;
    this.rsvpModel = rsvpModel;
    this.dashboardModel = dashboardModel;
  }

  async handleSubmitRsvp(payload) {
    const invitationId = this.invitationModel.get('id') || 1;
    try {
      const result = await this.rsvpModel.submitRSVP(invitationId, payload);

      // Trigger festive celebration confetti if attending!
      if (payload.attendance_status === 'attending') {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#881337', '#F59E0B', '#10B981'],
          });
        } catch {
          // ignore if canvas not supported
        }
      }

      // Refresh dashboard stats
      await this.dashboardModel.fetchStats(invitationId);

      this.appModel.addToast(
        `ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាទុក! សូមអរគុណ ${payload.guest_name}`,
        'success'
      );
      return result;
    } catch (err) {
      this.appModel.addToast(`មានបញ្ហាក្នុងការផ្ញើ RSVP: ${err.message}`, 'error');
      throw err;
    }
  }
}
