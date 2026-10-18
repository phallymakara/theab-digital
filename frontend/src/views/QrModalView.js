import { BaseView } from './BaseView.js';

export class QrModalView extends BaseView {
  constructor(containerId, handlers) {
    super(containerId);
    this.handlers = handlers || {};
    // handlers: { onClose, onCopyLink }
  }

  render(isOpen, invitation) {
    if (!this.container) return;

    if (!isOpen) {
      this.container.innerHTML = '';
      return;
    }

    const slug = invitation?.slug || 'vibol-sovanndy';
    const invitationId = invitation?.id || 1;
    const shareUrl = `${window.location.origin}/invitation/${slug}`;
    const qrSrc = `/api/v1/invitations/${invitationId}/qr`;

    this.container.innerHTML = `
      <div id="qr-modal-backdrop" class="modal-overlay">
        <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl border-2 border-amber-300 relative text-center khmer-pattern animate-scaleUp">
          <!-- Close Button -->
          <button id="qr-modal-close-btn" class="absolute top-4 right-4 text-stone-400 hover:text-rose-900 p-1.5 rounded-full hover:bg-stone-100 transition">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <!-- Modal Header -->
          <div class="w-12 h-12 rounded-2xl crimson-gradient-bg text-amber-300 flex items-center justify-center font-moul text-xl mx-auto mb-3 shadow-md border border-amber-400/40">
            ធ
          </div>
          <h3 class="font-moul text-base text-rose-950 mb-1">
            QR Code លិខិតអញ្ជើញ
          </h3>
          <p class="text-xs text-stone-500 mb-5">
            ស្កេនដើម្បីបើកមើលធៀបឌីជីថលភ្លាមៗ ឬទាញយករូបភាពសម្រាប់ព្រីន
          </p>

          <!-- QR Code Image Box -->
          <div class="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm inline-block mb-4">
            <img src="${qrSrc}" alt="Digital Theab QR Code" class="w-48 h-48 object-contain mx-auto rounded-lg" onerror="this.onerror=null; this.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}'" />
          </div>

          <!-- Share Link Box -->
          <div class="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 truncate mb-4 font-mono select-all text-center">
            ${shareUrl}
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button id="modal-copy-btn" class="btn-secondary !py-2 text-xs flex items-center justify-center gap-1.5">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span id="modal-copy-label">ចម្លង Link</span>
            </button>
            <a href="${qrSrc}" download="digital-theab-qr.png" class="btn-primary !py-2 text-xs flex items-center justify-center gap-1.5 text-white no-underline">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>ទាញយក QR</span>
            </a>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.refreshIcons();
  }

  bindEvents() {
    const closeBtn = document.getElementById('qr-modal-close-btn');
    if (closeBtn && this.handlers.onClose) {
      closeBtn.onclick = this.handlers.onClose;
    }

    const backdrop = document.getElementById('qr-modal-backdrop');
    if (backdrop && this.handlers.onClose) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) this.handlers.onClose();
      };
    }

    const copyBtn = document.getElementById('modal-copy-btn');
    if (copyBtn && this.handlers.onCopyLink) {
      copyBtn.onclick = () => {
        this.handlers.onCopyLink();
        const label = document.getElementById('modal-copy-label');
        if (label) {
          label.innerText = 'បានចម្លង!';
          setTimeout(() => {
            label.innerText = 'ចម្លង Link';
          }, 2000);
        }
      };
    }
  }
}
