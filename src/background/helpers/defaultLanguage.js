import languages from '../../config/languages.js';

export const getDefaultLanguage = () => {
  let defaultLanguage = {
    code: 'en',
    name: 'English',
  };
  const code = navigator.language.split('-')[0];

  if (languages[code]) {
    defaultLanguage.code = code;
    defaultLanguage.name = languages[code];
  }
  return defaultLanguage;
};
