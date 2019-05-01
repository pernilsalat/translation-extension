import languages from '../../config/languages.js';

export const setupSelect = select => {
  initialState(select);

  addOnChangeListener(select);
};

function initialState(select) {
  chrome.storage.sync.get('languageSelected', ({ languageSelected = {} }) => {
    Object.entries(languages).forEach(([code, name]) => {
      let option = createOptionElement(code, name);

      if (name === languageSelected.name) {
        option.selected = 'selected';
      }

      select.add(option);
    });
  });
}

function createOptionElement(code, name) {
  let option = document.createElement('option');
  option.value = code;
  option.text = name;

  return option;
}

function addOnChangeListener(select) {
  select.addEventListener('change', ({ target }) => {
    const selectedOption = target.selectedOptions[0];
    chrome.storage.sync.set({
      languageSelected: {
        code: selectedOption.value,
        name: selectedOption.text,
      }
    });
  });
}
