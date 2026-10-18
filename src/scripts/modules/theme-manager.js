/**
 * Theme Manager - Gestiona el tema claro/oscuro de la aplicación
 * Encapsula la lógica del cambio de tema con persistencia en localStorage
 */
export class ThemeManager {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'theme-preference';
    this.attributeName = options.attributeName || 'data-theme';
    this.toggleSelector = options.toggleSelector || '#theme-toggle';
    this.iconMap = options.iconMap || {
      light: '🌙',
      dark: '☀️'
    };
    this.init();
  }

  init() {
    this.toggleBtn = document.querySelector(this.toggleSelector);
    if (!this.toggleBtn) {
      console.warn('ThemeManager: Toggle button no encontrado en', this.toggleSelector);
      return;
    }

    // Cargar tema guardado o preferencia del sistema
    const savedTheme = this.getStoredTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    this.applyTheme(initialTheme);
    this.bindEvents();
    
    // Escuchar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('ThemeManager: Error leyendo localStorage:', e);
      return null;
    }
  }

  storeTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (e) {
      console.warn('ThemeManager: Error guardando localStorage:', e);
    }
  }

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute(this.attributeName, 'dark');
    } else {
      root.removeAttribute(this.attributeName);
    }
    this.updateToggleIcon(theme);
  }

  updateToggleIcon(theme) {
    const icon = this.iconMap[theme] || this.iconMap.light;
    if (this.toggleBtn) {
      this.toggleBtn.textContent = icon;
      this.toggleBtn.setAttribute('aria-label', 
        theme === 'dark' 
          ? 'Cambiar a modo claro' 
          : 'Cambiar a modo oscuro'
      );
    }
  }

  toggle() {
    const currentTheme = document.documentElement.getAttribute(this.attributeName) === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
    
    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }
}