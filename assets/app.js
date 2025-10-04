document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  initLanguage();
  bindLanguageButtons();
});

function markActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[data-nav]').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('nav-link-active');
      a.setAttribute('aria-current', 'page');
    }
  });
}

function initLanguage() {
  const saved = localStorage.getItem('lang') || detectBrowserLang();
  setLang(saved);
}

function detectBrowserLang() {
  return navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en';
}

function bindLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLang(lang);
    });
  });
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  const frBlock = document.getElementById('lang-fr');
  const enBlock = document.getElementById('lang-en');
  if (frBlock && enBlock) {
    if (lang === 'fr') {
      frBlock.hidden = false;
      enBlock.hidden = true;
      document.documentElement.setAttribute('lang','fr');
    } else {
      frBlock.hidden = true;
      enBlock.hidden = false;
      document.documentElement.setAttribute('lang','en');
    }
  }
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
  });
}