import languages from '../../config/languages.js';

export const getDefaultLanguage = () => {
  let defaultLanguage = {
    code: 'es',
    name: 'English',
  };
  let code = navigator.language;
  if (!code.startsWith('zh')) {
    code = code.split('-')[0];
  }
  if (languages[code]) {
    defaultLanguage.code = code;
    defaultLanguage.name = languages[code];
  }
  return defaultLanguage;
};
