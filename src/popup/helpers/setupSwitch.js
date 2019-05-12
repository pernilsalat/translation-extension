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
    const active = switchElement.className.includes(className);
    const path = `../../icons/icon_${active ? 'on' : 'off'}.png`;

    chrome.storage.sync.set({ active });
    chrome.browserAction.setIcon({ path });
  });
}
