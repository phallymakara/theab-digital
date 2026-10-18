/**
 * BaseView for MVC View components
 */
export class BaseView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    throw new Error('render() must be implemented by subclasses');
  }

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      setTimeout(() => {
        window.lucide.createIcons();
      }, 20);
    }
  }
}
