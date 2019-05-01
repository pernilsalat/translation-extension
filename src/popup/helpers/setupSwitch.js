import { toggleClassName } from './classNameHelper.js';

const className = 'toggle-on';

export const setupSwitch = switchElement => {
  initialState(switchElement);

  addOnClickListener(switchElement);
};

function initialState(switchElement) {
  chrome.storage.sync.get('active', ({ active }) => {
    if (active) {
      toggleClassName(switchElement, className);
    }
  });
}

function addOnClickListener(switchElement) {
  switchElement.addEventListener('click', () => {
    toggleClassName(switchElement, className);
    chrome.storage.sync.set({
      active: switchElement.className.includes(className)
    });
  });
}
