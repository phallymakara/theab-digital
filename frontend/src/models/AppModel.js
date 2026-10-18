import { BaseModel } from './BaseModel.js';

export class AppModel extends BaseModel {
  constructor() {
    super();
    this.currentStep = 1;
    this.currentTheme = 'crimson'; // crimson, gold, emerald
    this.isQrModalOpen = false;
    this.isAddGuestModalOpen = false;
    this.isAudioPlaying = false;
    this.toasts = [];
  }

  setStep(step) {
    if (this.currentStep !== step) {
      this.currentStep = step;
      this.emit('stepChanged', this.currentStep);
    }
  }

  setTheme(theme) {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.emit('themeChanged', this.currentTheme);
    }
  }

  setQrModal(isOpen) {
    this.isQrModalOpen = isOpen;
    this.emit('qrModalChanged', isOpen);
  }

  setAddGuestModal(isOpen) {
    this.isAddGuestModalOpen = isOpen;
    this.emit('addGuestModalChanged', isOpen);
  }

  toggleAudio() {
    this.isAudioPlaying = !this.isAudioPlaying;
    this.emit('audioChanged', this.isAudioPlaying);
    return this.isAudioPlaying;
  }

  addToast(message, type = 'info', duration = 3000) {
    const id = Date.now() + Math.random();
    const toast = { id, message, type };
    this.toasts.push(toast);
    this.emit('toastAdded', toast);

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emit('toastRemoved', id);
  }
}
