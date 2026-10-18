export class InvitationController {
  constructor(appModel, invitationModel) {
    this.appModel = appModel;
    this.invitationModel = invitationModel;
  }

  handleSelectCeremony(type) {
    this.invitationModel.selectPreset(type);
    this.appModel.setStep(2);
    this.appModel.addToast('បានជ្រើសរើសទម្រង់កម្មវិធីរួចរាល់!', 'success');
  }

  handleInputChange(key, value) {
    this.invitationModel.updateField(key, value);
  }

  handleThemeSelect(theme) {
    this.invitationModel.updateField('themeColor', theme);
    this.appModel.setTheme(theme);
    this.appModel.addToast(`បានផ្លាស់ប្តូរពណ៌ធៀបទៅជា ${theme === 'gold' ? 'មាសប្រណិត' : theme === 'emerald' ? 'បៃតងត្បូងមរកត' : 'ក្រហមមង្គល'}`, 'info');
  }

  async handleSave() {
    try {
      await this.invitationModel.save();
      this.appModel.addToast('ព័ត៌មានលិខិតអញ្ជើញត្រូវបានរក្សាទុកដោយជោគជ័យ!', 'success');
    } catch (err) {
      this.appModel.addToast(`បរាជ័យក្នុងការរក្សាទុក: ${err.message}`, 'error');
    }
  }

  handleCopyLink() {
    const slug = this.invitationModel.get('slug') || 'vibol-sovanndy';
    const url = `${window.location.origin}/invitation/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.appModel.addToast('បានចម្លងតំណភ្ជាប់លិខិតអញ្ជើញរួចរាល់!', 'success');
      });
    }
  }
}
