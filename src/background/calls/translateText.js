export const translateText = async (text, language) => {
  let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='
    + 'auto' + '&tl=' + language + '&dt=t&q=' + encodeURI(text);

  const response = await fetch(url);
  const json = await response.json();
  const translatedText = json[0].reduce((acc, value) => acc + value[0], '');

  return {
    text: translatedText,
    from: json[2],
    to: language,
  };
};
