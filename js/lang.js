/**
 * Bilingual Language Toggle — Sindhi (sd) ↔ English (en)
 * Default language: Sindhi
 * Persistence: localStorage key "villageLang"
 */

(function () {
  const DEFAULT_LANG = 'sd';

  function applyLang(lang) {
    // Swap all translatable text nodes
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-sd');
    });

    // Swap placeholder attributes (inputs)
    document.querySelectorAll('[data-ph-en]').forEach(function (el) {
      el.placeholder = lang === 'en' ? el.getAttribute('data-ph-en') : el.getAttribute('data-ph-sd');
    });

    // Update html dir and lang
    document.documentElement.lang = lang === 'en' ? 'en' : 'sd';
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';

    // Update body font
    document.body.style.fontFamily = lang === 'en'
      ? "'Poppins', sans-serif"
      : "'Noto Nastaliq Urdu', 'Poppins', sans-serif";

    // Update toggle button label
    var btn = document.getElementById('langToggleBtn');
    if (btn) {
      btn.textContent = lang === 'en' ? '🌐 سنڌي' : '🌐 English';
      btn.title = lang === 'en' ? 'Switch to Sindhi' : 'Switch to English';
    }

    // Save preference
    localStorage.setItem('villageLang', lang);
  }

  function toggleLang() {
    var current = localStorage.getItem('villageLang') || DEFAULT_LANG;
    applyLang(current === 'en' ? 'sd' : 'en');
  }

  // On DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem('villageLang') || DEFAULT_LANG;
    applyLang(saved);

    var btn = document.getElementById('langToggleBtn');
    if (btn) {
      btn.addEventListener('click', toggleLang);
    }
  });
})();
