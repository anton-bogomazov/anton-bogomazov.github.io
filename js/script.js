'use strict';

const availableLanguages = ['en', 'ru'];
const defaultLanguage = 'en';

let currentLanguage = 'en';

const whenReady = (callback) => {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

function updateLanguageButton(lang) {
  const activeClassName = 'business-card__language-button--active';

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

function replacePdf(lang) {
  const saveButton = document.querySelector('.business-card__save-as-pdf');
  let fileName = `${getTitle(lang)}.${lang}.pdf`;

  saveButton.setAttribute("href", `doc/cv.${lang}.pdf`);
  saveButton.setAttribute("download", fileName);
}

function switchLanguage(lang) {
  const targetLang = lang.toLowerCase();
  const businessCard = document.querySelector('.business-card');

  businessCard.classList.remove(`business-card--${currentLanguage}`);
  businessCard.classList.add(`business-card--${targetLang}`);
  window.history.replaceState(null, null, `?lang=${targetLang}`);
  document.title = getTitle(targetLang);

  updateLanguageButton(targetLang);
  replacePdf(targetLang);

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
      const button = document.querySelector(`[data-language=${lang}]`)
      if (button != null) {
        button.addEventListener('click', () => switchLanguage(lang));
      }
  })
}

whenReady(() => {
  updateLanguageFromUri();
  addLangSwitchListeners();
});
