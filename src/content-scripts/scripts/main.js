import { TYPES } from '../../config/constants.js';
import Loading from '../../components/loading.js';
import Tooltip from '../../components/tooltip.js';
import Panel from '../../components/translationPanel.js';
import languages from '../../config/languages.js';
import { positionElement } from './positionElement.js';

window.customElements.define('loading-component', Loading);
window.customElements.define('translation-tooltip', Tooltip);
window.customElements.define('translation-panel', Panel);

let selectionChanged = true;

let tooltip = document.createElement('translation-tooltip');
document.body.appendChild(tooltip);

let tooltipDiv = tooltip.shadowRoot.getElementById('tooltip2');

export function main() {
  window.addEventListener('mouseup', () => {
    let selection = window.getSelection();
    let text = selection.toString();

    if (selectionChanged && text) {
      chrome.storage.sync.get('active', ({ active }) => {
        if (active) {
          positionElement(tooltipDiv);
          tooltipDiv.style.display = 'block';

          tooltip.setAttribute('loading', '');

          chrome.runtime.sendMessage({ type: TYPES.TRANSLATE, text }, ({ text, from, to }) => {
            tooltip.text = text;
            tooltip.fromTo = { from: languages[from], to: languages[to] };

            tooltip.removeAttribute('loading');
          });
        }
      });
    }
  });

  window.addEventListener('mousedown', () => {
    selectionChanged = false;
    tooltipDiv.style.display = 'none';
  });

  document.addEventListener('selectionchange', () => selectionChanged = true);

}
