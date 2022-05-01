import Element from './Element';

export default class Key extends Element {
  active = false;

  constructor(parent, options, params, lang) {
    super(parent, options);

    this.values = params.values;
    this.type = params.type || 'default';

    if (params.styles) this.node.classList.add(params.styles);

    this.value = params.values[lang] || params.values.en;
    this.node.innerHTML = this.value;

    this.node.onclick = params.callback;
  }

  highLight() {
    if (this.active) this.node.classList.add('active');
    else this.node.classList.remove('active');
  }

  keyUp() {
    this.active = false;
    this.highLight();
  }

  keyDown() {
    this.active = true;
    this.highLight();
  }

  redrawCaption(lang, upCase) {
    if (this.type === 'Functional') return;

    const prefix = `${lang}${upCase.Shift ? 'Up' : ''}`;
    if (upCase.CapsLock && upCase.Shift) {
      this.value = this.values[prefix].toLowerCase();
    } else if (upCase.CapsLock) {
      this.value = this.values[lang].toUpperCase();
    } else {
      this.value = this.values[prefix];
    }

    this.node.innerText = this.value;
  }
}
