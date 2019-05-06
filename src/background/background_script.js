import { TYPES } from '../config/constants.js';
import { translateText } from './calls/translateText.js';
import { getDefaultLanguage } from './helpers/defaultLanguage.js';

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    let defaultLanguage = getDefaultLanguage();
    chrome.storage.sync.set({
      active: true,
      languageSelected: defaultLanguage
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case TYPES.TRANSLATE:
      chrome.storage.sync.get('languageSelected', ({ languageSelected }) => {
        const [{ text }, { code }] = [request, languageSelected];
        translateText(text, code).then(sendResponse);
      });
      return true;
    default:
      break;
  }
});
