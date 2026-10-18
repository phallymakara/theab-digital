import { AppModel } from '../models/AppModel.js';
import { InvitationModel } from '../models/InvitationModel.js';
import { RsvpModel } from '../models/RsvpModel.js';
import { DashboardModel } from '../models/DashboardModel.js';

import { HeaderView } from '../views/HeaderView.js';
import { Step1CeremonyView } from '../views/Step1CeremonyView.js';
import { Step2EditorView } from '../views/Step2EditorView.js';
import { Step3GuestView } from '../views/Step3GuestView.js';
import { Step4DashboardView } from '../views/Step4DashboardView.js';
import { QrModalView } from '../views/QrModalView.js';
import { ToastView } from '../views/ToastView.js';

import { InvitationController } from './InvitationController.js';
import { RsvpController } from './RsvpController.js';
import { DashboardController } from './DashboardController.js';

export class AppController {
  constructor() {
    // 1. Models
    this.appModel = new AppModel();
    this.invitationModel = new InvitationModel();
    this.rsvpModel = new RsvpModel();
    this.dashboardModel = new DashboardModel();

    // 2. Sub-Controllers
    this.invitationController = new InvitationController(this.appModel, this.invitationModel);
    this.rsvpController = new RsvpController(
      this.appModel,
      this.invitationModel,
      this.rsvpModel,
      this.dashboardModel
    );
    this.dashboardController = new DashboardController(
      this.appModel,
      this.invitationModel,
      this.rsvpModel,
      this.dashboardModel
    );

    // Audio element
    this.audio = new Audio(
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=traditional-asian-instrumental-wedding-112191.mp3'
    );
    this.audio.loop = true;

    // 3. Views
    this.headerView = new HeaderView(
      'header-container',
      (step) => this.goToStep(step),
      () => this.appModel.setQrModal(true),
      () => this.invitationController.handleCopyLink()
    );

    this.step1View = new Step1CeremonyView('main-content', (type) =>
      this.invitationController.handleSelectCeremony(type)
    );

    this.step2View = new Step2EditorView('main-content', {
      onInputChange: (k, v) => this.invitationController.handleInputChange(k, v),
      onThemeSelect: (theme) => this.invitationController.handleThemeSelect(theme),
      onSave: () => this.invitationController.handleSave(),
      onNext: () => this.goToStep(3),
      onPrev: () => this.goToStep(1),
      onToggleAudio: () => this.toggleAudio(),
    });

    this.step3View = new Step3GuestView('main-content', {
      onSubmitRsvp: (payload) => this.rsvpController.handleSubmitRsvp(payload),
      onToggleAudio: () => this.toggleAudio(),
      onGoDashboard: () => this.goToStep(4),
      onBackToEditor: () => this.goToStep(2),
    });

    this.step4View = new Step4DashboardView('main-content', {
      onFilterChange: (status) => this.dashboardController.handleFilterChange(status),
      onSearch: (q) => this.dashboardController.handleSearch(q),
      onDeleteRsvp: (id) => this.dashboardController.handleDeleteRsvp(id),
      onAddGuest: () => this.dashboardController.handleAddGuest(),
      onCopyLink: () => this.invitationController.handleCopyLink(),
      onOpenQr: () => this.appModel.setQrModal(true),
      onBackToEditor: () => this.goToStep(2),
    });

    this.qrModalView = new QrModalView('modal-container', {
      onClose: () => this.appModel.setQrModal(false),
      onCopyLink: () => this.invitationController.handleCopyLink(),
    });

    this.toastView = new ToastView('toast-container');

    // 4. Bind Subscriptions
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    // Navigation changes
    this.appModel.on('stepChanged', (step) => {
      this.headerView.render(step);
      this.renderCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme changes
    this.appModel.on('themeChanged', () => {
      this.renderCurrentStep(this.appModel.currentStep);
    });

    // Modals
    this.appModel.on('qrModalChanged', (isOpen) => {
      this.qrModalView.render(isOpen, this.invitationModel.getData());
    });

    // Toasts
    this.appModel.on('toastAdded', () => this.toastView.render(this.appModel.toasts));
    this.appModel.on('toastRemoved', () => this.toastView.render(this.appModel.toasts));

    // Audio status
    this.appModel.on('audioChanged', () => {
      this.renderCurrentStep(this.appModel.currentStep);
    });

    // Invitation Model events
    this.invitationModel.on('presetChanged', () => {
      if (this.appModel.currentStep === 2) {
        this.step2View.render(
          this.invitationModel.getData(),
          this.appModel.currentTheme,
          this.appModel.isAudioPlaying
        );
      }
    });

    this.invitationModel.on('dataLoaded', () => {
      this.renderCurrentStep(this.appModel.currentStep);
    });

    // RSVP Model events
    this.rsvpModel.on('rsvpsLoaded', () => {
      if (this.appModel.currentStep === 4) {
        this.renderDashboard();
      }
    });

    this.rsvpModel.on('filterChanged', () => {
      if (this.appModel.currentStep === 4) {
        this.renderDashboard();
      }
    });

    this.rsvpModel.on('searchChanged', () => {
      if (this.appModel.currentStep === 4) {
        this.renderDashboard();
      }
    });

    this.rsvpModel.on('rsvpAdded', () => {
      if (this.appModel.currentStep === 4) {
        this.renderDashboard();
      }
    });

    this.rsvpModel.on('rsvpDeleted', () => {
      if (this.appModel.currentStep === 4) {
        this.renderDashboard();
      }
    });

    // Dashboard stats events
    this.dashboardModel.on('statsLoaded', () => {
      if (this.appModel.currentStep === 4) {
        this.renderDashboard();
      }
    });
  }

  goToStep(step) {
    this.appModel.setStep(step);
    // If moving to dashboard, fetch fresh RSVPs and stats
    if (step === 4) {
      const invId = this.invitationModel.get('id') || 1;
      this.rsvpModel.fetchRSVPs(invId);
      this.dashboardModel.fetchStats(invId);
    }
  }

  toggleAudio() {
    const isPlaying = this.appModel.toggleAudio();
    if (isPlaying) {
      this.audio.play().catch((err) => {
        console.warn('Audio play restricted by browser policy:', err);
      });
      this.appModel.addToast('កំពុងចាក់ភ្លេងមង្គលបែបប្រពៃណី', 'info');
    } else {
      this.audio.pause();
      this.appModel.addToast('បានបិទភ្លេង', 'info');
    }
  }

  renderCurrentStep(step) {
    const invData = this.invitationModel.getData();
    const theme = this.appModel.currentTheme;
    const isAudio = this.appModel.isAudioPlaying;

    switch (step) {
      case 1:
        this.step1View.render();
        break;
      case 2:
        this.step2View.render(invData, theme, isAudio);
        break;
      case 3:
        this.step3View.render(invData, theme, isAudio);
        break;
      case 4:
        this.renderDashboard();
        break;
      default:
        this.step1View.render();
    }
  }

  renderDashboard() {
    const stats = this.dashboardModel.getStats();
    const filteredRsvps = this.rsvpModel.getFilteredRSVPs();
    this.step4View.render(
      stats,
      filteredRsvps,
      this.rsvpModel.statusFilter,
      this.rsvpModel.searchQuery
    );
  }

  async init() {
    // Render Header
    this.headerView.render(this.appModel.currentStep);

    // Initial view
    this.renderCurrentStep(this.appModel.currentStep);

    // Load initial data from backend API
    try {
      await this.invitationModel.loadFromApi();
      const invId = this.invitationModel.get('id') || 1;
      await this.rsvpModel.fetchRSVPs(invId);
      await this.dashboardModel.fetchStats(invId);
    } catch (err) {
      console.warn('Backend not yet reachable on startup, using offline models:', err);
    }
  }
}
