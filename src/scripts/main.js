import { TYPES } from '../config/constants.js';
import Loading from '../components/loading.js';
import Tooltip from '../components/tooltip.js';
import Panel from '../components/translationPanel.js';
import languages from '../config/languages.js';

window.customElements.define('loading-component', Loading);
window.customElements.define('translation-tooltip', Tooltip);
window.customElements.define('translation-panel', Panel);

let tooltip = document.createElement('translation-tooltip');
tooltip.setAttribute('loading', '');
document.body.appendChild(tooltip);

let tooltipDiv = tooltip.shadowRoot.getElementById('tooltip2');

// let cal1 = document.createElement('div');
// let cal2 = document.createElement('div');
// cal1.id = 'cal1';
// cal1.innerHTML = '&nbsp;';
// cal2.id = 'cal2';
// cal2.innerHTML = '&nbsp;';
// document.body.appendChild(cal1);
// document.body.appendChild(cal2);

// let tooltip = document.createElement('div');
// tooltip.id = 'tooltip';
// tooltip.innerHTML = 'amazing tooltip';
// document.body.appendChild(tooltip);

// let rel1 = document.createRange();
// rel1.selectNode(cal1);
// let rel2 = document.createRange();
// rel2.selectNode(cal2);

export const main = () => {
  window.addEventListener('mouseup', async () => {
    let selection = window.getSelection();
    let text = selection.toString();

    if (text) {
      chrome.storage.sync.get('active', ({ active }) => {
        if (active) {
          let r = window.getSelection().getRangeAt(0).getBoundingClientRect();
          let relative = document.body.parentNode.getBoundingClientRect();
          // console.log(r, relative);
          tooltipDiv.style.top = (r.bottom - relative.top) + 'px';//this will place ele below the selection
          tooltipDiv.style.right = -(r.right - relative.right) + 'px';//this will align the right edges together
          tooltipDiv.style.display = 'block';

          tooltip.setAttribute('loading', '');

          chrome.runtime.sendMessage({ type: TYPES.TRANSLATE, text }, ({ text, from, to }) => {
            tooltip.text = text;
            tooltip.fromTo = { from: languages[from], to: languages[to] };
            // console.log('response', response);
            // console.log((r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px', (r.left - rb2.left) * 100 / (rb1.left - rb2.left) + 'px');

            tooltip.removeAttribute('loading');
          });
        }
      });
    }
  });

  window.addEventListener('mousedown', () => {
    tooltipDiv.style.display = 'none';
  });
};
