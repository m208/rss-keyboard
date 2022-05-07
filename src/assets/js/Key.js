import Element from './Element';

export default class Key extends Element {
  active = false;

  led = false;

  constructor(parent, options, params, lang) {
    super(parent, options);

    this.values = params.values;

    this.type = params.type || 'default';

    if (params.styles) this.node.classList.add(params.styles);

    this.value = params.values[lang] || params.values.en;

    if (this.type === 'default') {
      this.secondary = new Element(this.node, { classes: 'secondary', tag: 'div' });
      this.primary = new Element(this.node, { classes: 'primary', tag: 'div' });
      this.spacer = new Element(this.node, { classes: 'spacer', tag: 'div' });
      this.secondary.value = this.values[`${lang}Up`];
    }

    this.renderValues();

    let fireInterval = null;
    let timeout = null;
    // setInterval is used to repeately fire key on mousedown
    // setTimeout for delay after first keypress
    this.node.onmousedown = () => {
      this.active = true;
      this.highLight();
      params.mouseDown();
      if (this.type !== 'Functional') {
        timeout = setTimeout(() => {
          fireInterval = setInterval(params.mouseDown, 75);
        }, 500);
      }
    };

    this.node.onmouseup = () => {
      this.active = false;
      this.highLight();
      clearTimeout(timeout);
      clearInterval(fireInterval);
      params.mouseUp();
    };

    this.node.onmouseout = this.node.onmouseup;
  }

  lightLed() {
    if (this.led) this.node.classList.add('active-led');
    else this.node.classList.remove('active-led');
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
    if (this.type !== 'default') return;

    const prefix = `${lang}${upCase.Shift ? 'Up' : ''}`;
    if (upCase.CapsLock && upCase.Shift) {
      this.value = this.values[prefix].toLowerCase();
    } else if (upCase.CapsLock) {
      this.value = this.values[lang].toUpperCase();
    } else {
      this.value = this.values[prefix];
    }

    const prefixSec = `${lang}${!upCase.Shift ? 'Up' : ''}`;
    this.secondary.value = this.values[prefixSec];

    this.renderValues();
  }

  renderValues() {
    if (this.type === 'default') {
      this.secondary.node.innerHTML = this.isMultiCaption() ? this.secondary.value : '';
      this.primary.node.innerHTML = this.value;
    } else this.node.innerHTML = this.value;
  }

  isMultiCaption() {
    if (this.secondary) {
      return (this.value.toUpperCase() !== this.secondary.value.toUpperCase());
    }
    return false;
  }
}
