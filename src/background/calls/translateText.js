import { ERROR_SERVICE } from '../../config/constants.js';

export const translateText = async (text, language) => {
  let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='
    + 'auto' + '&tl=' + language + '&dt=t&q=' + encodeURI(text);

  let translatedText, json = [];
  try {
    const response = await fetch(url);
    json = await response.json();
    translatedText = json[0].reduce((acc, value) => acc + value[0], '');
  } catch (e) {
    translatedText = ERROR_SERVICE;
  }
  return {
    text: translatedText,
    from: json[2],
    to: language,
  };
};
