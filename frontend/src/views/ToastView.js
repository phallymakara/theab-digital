import { BaseView } from './BaseView.js';

export class ToastView extends BaseView {
  constructor(containerId) {
    super(containerId);
  }

  render(toasts = []) {
    if (!this.container) return;

    this.container.innerHTML = toasts
      .map((t) => {
        const iconName =
          t.type === 'success'
            ? 'check-circle'
            : t.type === 'error'
            ? 'alert-triangle'
            : 'info';
        const typeClass =
          t.type === 'success'
            ? 'toast-success'
            : t.type === 'error'
            ? 'toast-error'
            : '';

        return `
        <div class="toast ${typeClass}">
          <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0 text-amber-400"></i>
          <span>${t.message}</span>
        </div>
      `;
      })
      .join('');

    this.refreshIcons();
  }
}
