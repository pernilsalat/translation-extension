const template = document.createElement('template');
template.innerHTML = `
  <style>
    #tooltip2 {
      display: none;
      min-height: 56px;
      position: absolute;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, .85);
      font-size: 16px;
      color: white;
      padding: 10px;
      z-index: 1000;
    }
  </style>
  <div id="tooltip2"></div>`;

export default class Tooltip extends HTMLElement {
  static get observedAttributes() {
    return ['loading'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._tooltip = this._shadowRoot.getElementById('tooltip2');
    this._loading = document.createElement('loading-component');
    this._panel = document.createElement('translation-panel');

    this._text = '';
    this._fromTo = '';
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    value
      ? this.setAttribute('loading', '')
      : this.removeAttribute('loading');
  }

  set text(value) {
    this._text = value;
  }

  set fromTo(value) {
    this._fromTo = value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'loading': {
        if (newValue === null) {
          this.removeLoading();
          this.addPanel();
        } else if (newValue === '') {
          this.removePanel();
          this.addLoading();
        }
        break;
      }
    }
  }

  removeLoading() {
    this._loading.remove();
  }

  addLoading() {
    this._tooltip.appendChild(this._loading);
  }

  removePanel() {

    this._panel.remove();
  }

  addPanel() {
    this._panel.text = this._text;
    this._panel.fromTo = this._fromTo;
    this._tooltip.appendChild(this._panel);
  }
}

