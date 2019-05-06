const template = document.createElement('template');
template.innerHTML = `
  <style>
    hr {
      border-color: #a5a5a5;
    }
    span {
      width: 100%;
      display: block;
    }
    #from-to {
      text-align: center;
    }
  </style>
  <span id="from-to"></span>
  <hr>
  <span id="text"></span>  
`;

export default class Panel extends HTMLElement {
  static get observedAttributes() {
    return ['from-to', 'text'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._text = this._shadowRoot.getElementById('text');
    this._fromTo = this._shadowRoot.getElementById('from-to');
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value) {
    this.setAttribute('text', value);
  }

  get fromTo() {
    return this.getAttribute('from-to');
  }

  set fromTo(value) {
    this.setAttribute('from-to', JSON.stringify(value));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'text':
        this.setText(newValue);
        break;
      case 'from-to':
        this.setFromTo(JSON.parse(newValue));
        break;
    }
  }

  setText(newValue) {
    this._text.textContent = newValue;
  }

  setFromTo({ from, to }) {
    this._fromTo.textContent = `${from} => ${to}`;
  }
}
