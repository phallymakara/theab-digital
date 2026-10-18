import { BaseView } from './BaseView.js';

export class HeaderView extends BaseView {
  constructor(containerId, onStepClick, onQrClick, onShareClick) {
    super(containerId);
    this.onStepClick = onStepClick;
    this.onQrClick = onQrClick;
    this.onShareClick = onShareClick;
  }

  render(currentStep = 1) {
    if (!this.container) return;

    // Do not show header on Step 1
    if (currentStep === 1) {
      this.container.innerHTML = '';
      this.container.className = 'hidden';
      return;
    }

    this.container.className = 'block';
    this.container.innerHTML = `
      <div class="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div class="container-max h-16 flex items-center justify-between">
          <!-- Logo & Brand -->
          <div id="brand-logo" class="flex items-center gap-3 cursor-pointer">
            <img src="/logo/theab_digital.png" alt="Digital Theab Logo" class="w-10 h-10 object-contain drop-shadow-xs" />

            <div>
              <span class="font-moul text-base tracking-wide text-theabCrimson block leading-tight">ឌីជីថលធៀប</span>
              <span class="text-xs text-stone-500 block font-sans">Digital Theab Platform</span>
            </div>
          </div>

          <!-- Step Navigation Tabs (For Steps 2, 3, 4) -->
          <nav class="hidden md:flex items-center gap-1 text-sm bg-stone-50 p-1 rounded-xl border border-stone-200">
            <button id="nav-step-1" class="step-nav-btn ${currentStep === 1 ? 'active' : ''}">
              ១. ជ្រើសរើសកម្មវិធី
            </button>
            <span class="text-stone-300">/</span>
            <button id="nav-step-2" class="step-nav-btn ${currentStep === 2 ? 'active' : ''}">
              ២. រចនា & មើលផ្ទាល់
            </button>
            <span class="text-stone-300">/</span>
            <button id="nav-step-3" class="step-nav-btn ${currentStep === 3 ? 'active' : ''}">
              ៣. ទម្រង់លិខិត & RSVP
            </button>
            <span class="text-stone-300">/</span>
            <button id="nav-step-4" class="step-nav-btn ${currentStep === 4 ? 'active' : ''}">
              ៤. ផ្ទាំងគ្រប់គ្រង
            </button>
          </nav>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2">
            <button id="header-qr-btn" class="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5" title="ទាញយក QR Code">
              <i data-lucide="qr-code" class="w-4 h-4 text-theabCrimson"></i>
              <span class="hidden sm:inline">QR Code</span>
            </button>
            <button id="header-share-btn" class="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5" title="ចែករំលែកធៀប">
              <i data-lucide="share-2" class="w-4 h-4 text-amber-300"></i>
              <span class="hidden sm:inline">ចែករំលែកធៀប</span>
            </button>
          </div>
        </div>

        <!-- Mobile Steps Bar -->
        <div class="md:hidden flex items-center justify-around border-t border-stone-100 py-1.5 bg-stone-50 text-xs">
          <button id="m-nav-step-1" class="px-2 py-1 ${currentStep === 1 ? 'text-theabCrimson font-bold' : 'text-stone-500'}">១. កម្មវិធី</button>
          <button id="m-nav-step-2" class="px-2 py-1 ${currentStep === 2 ? 'text-theabCrimson font-bold' : 'text-stone-500'}">២. រចនា</button>
          <button id="m-nav-step-3" class="px-2 py-1 ${currentStep === 3 ? 'text-theabCrimson font-bold' : 'text-stone-500'}">៣. RSVP</button>
          <button id="m-nav-step-4" class="px-2 py-1 ${currentStep === 4 ? 'text-theabCrimson font-bold' : 'text-stone-500'}">៤. ស្ថិតិ</button>
        </div>
      </div>
    `;

    this.bindEvents();
    this.refreshIcons();
  }

  bindEvents() {
    const logo = document.getElementById('brand-logo');
    if (logo) logo.onclick = () => this.onStepClick(1);

    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`nav-step-${i}`);
      if (btn) btn.onclick = () => this.onStepClick(i);

      const mBtn = document.getElementById(`m-nav-step-${i}`);
      if (mBtn) mBtn.onclick = () => this.onStepClick(i);
    }

    const qrBtn = document.getElementById('header-qr-btn');
    if (qrBtn) qrBtn.onclick = () => this.onQrClick();

    const shareBtn = document.getElementById('header-share-btn');
    if (shareBtn) shareBtn.onclick = () => this.onShareClick();
  }
}
