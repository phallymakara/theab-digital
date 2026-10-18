export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentPath = '';
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  }

  getCurrentPath() {
    // Support both hash routing (#/wedding) and pathname (/wedding)
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) {
      return hash;
    }
    const path = window.location.pathname || '/';
    return path;
  }

  navigate(path, replace = false) {
    if (this.currentPath === path) return;

    if (replace) {
      window.history.replaceState({ path }, '', path);
    } else {
      window.history.pushState({ path }, '', path);
    }

    this.currentPath = path;
    this.handleRoute();
  }

  handleRoute() {
    const rawPath = this.getCurrentPath();
    // Normalize path: strip trailing slash except for root '/'
    const path = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
    this.currentPath = path;

    const handler = this.routes[path] || this.routes['*'] || this.routes['/'];
    if (typeof handler === 'function') {
      handler(path);
    }
  }

  start() {
    this.handleRoute();
  }
}
