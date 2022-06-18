'use strict';

const availableLanguages = ['en', 'ru'];
const defaultLanguage = 'en';

let currentLanguage = 'en';

function updateLanguageButton(lang) {
  const activeClassName = 'controls__language-button--active';

  document.querySelector(`[data-language=${currentLanguage}]`).classList.remove(activeClassName);
  document.querySelector(`[data-language=${lang}]`).classList.add(activeClassName);
}

function getTitle(lang) {
  let title;
  switch (lang) {
    case 'ru': title = 'Антон Богомазов - Java/Kotlin Разработчик'; break;
    case 'en': title = 'Anton Bogomazov - Java/Kotlin Developer'; break;
  }

  return title;
}

function switchLanguage(lang) {
  const targetLang = lang.toLowerCase();

  document.querySelectorAll(`.content-language--${currentLanguage}`)
      .forEach(elem => elem.style.display = 'none');
  document.querySelectorAll(`.content-language--${targetLang}`)
      .forEach(elem => elem.style.display = 'initial');

  window.history.replaceState(null, null, `?lang=${targetLang}`);
  document.title = getTitle(targetLang);

  updateLanguageButton(targetLang);

  currentLanguage = targetLang;
}

function parseLangFromUri() {
  const lang = document.location.href.split('?lang=')[1];
  if (lang == null || !availableLanguages.includes(lang.toLowerCase())) return defaultLanguage;
  return lang.toLowerCase();
}

function updateLanguageFromUri() {
  const lang = parseLangFromUri();
  switchLanguage(lang);
  currentLanguage = lang;
}

function addLangSwitchListeners() {
  availableLanguages.forEach( (lang) => {
    const button = document.querySelector(`[data-language=${lang}]`);
    if (button != null) {
      button.addEventListener('click', () => switchLanguage(lang));
    }
  })
}

updateLanguageFromUri();
addLangSwitchListeners();
