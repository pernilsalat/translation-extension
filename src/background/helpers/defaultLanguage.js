import languages from '../../config/languages.js';

export const getDefaultLanguage = () => {
  let defaultLanguage = {
    code: 'es',
    name: 'English',
  };
  const code = navigator.language;

  if (languages[code]) {
    defaultLanguage.code = code;
    defaultLanguage.name = languages[code];
  }
  return defaultLanguage;
};
