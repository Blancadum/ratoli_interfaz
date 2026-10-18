/**
 * Language Manager - Gestiona el cambio de idioma de la aplicación
 * Encapsula la lógica de internacionalización (i18n)
 */
export class LanguageManager {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'language-preference';
    this.selector = options.selector || '#lang-select';
    this.translations = options.translations || {};
    this.defaultLang = options.defaultLang || 'ca';
    this.init();
  }

  init() {
    this.selectEl = document.querySelector(this.selector);
    if (!this.selectEl) {
      console.warn('LanguageManager: Select element no encontrado en', this.selector);
      return;
    }

    const savedLang = this.getStoredLanguage() || this.defaultLang;
    this.selectEl.value = savedLang;
    this.applyLanguage(savedLang);
    this.bindEvents();
  }

  getStoredLanguage() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('LanguageManager: Error leyendo localStorage:', e);
      return null;
    }
  }

  storeLanguage(lang) {
    try {
      localStorage.setItem(this.storageKey, lang);
    } catch (e) {
      console.warn('LanguageManager: Error guardando localStorage:', e);
    }
  }

  applyLanguage(lang) {
    // Traducir textos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getNestedProperty(this.translations[lang], key);
      if (translation) {
        el.textContent = translation;
      }
    });
    
    // Traducir atributos data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.getNestedProperty(this.translations[lang], key);
      if (translation) {
        el.placeholder = translation;
      }
    });
    
    // Traducir atributos data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translation = this.getNestedProperty(this.translations[lang], key);
      if (translation) {
        el.setAttribute('aria-label', translation);
      }
    });

    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => {
      return (current && current[key] !== undefined) ? current[key] : null;
    }, obj);
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.applyLanguage(lang);
      this.storeLanguage(lang);
      this.selectEl.value = lang;
    } else {
      console.warn('LanguageManager: No se encontraron traducciones para:', lang);
    }
  }

  bindEvents() {
    if (this.selectEl) {
      this.selectEl.addEventListener('change', (e) => this.setLanguage(e.target.value));
    }
  }
}