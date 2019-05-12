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
    const active = switchElement.className.includes(className);
    const path = `../../icons/icon_${active ? 'off' : 'on'}.png`;

    chrome.storage.sync.set({ active }, () => {
      toggleClassName(switchElement, className);
      chrome.browserAction.setIcon({ path });
    });
  });
}
