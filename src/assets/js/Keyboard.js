import { keys, params } from './keys';
import Element from './Element';
import Key from './Key';

export default class Keyboard {
  buttons = {};

  keysLayout = [
    ['Tilda', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'BackSlash', 'Del'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'CtrlRight'],
  ];

  holdableKeys = ['Shift', 'Ctrl', 'Alt', 'ShiftRight', 'AltRight', 'CtrlRight'];

  holdable = { Shift: false, CapsLock: false };

  lang = 'en';

  constructor(app, lang = this.lang) {
    this.app = app;
    const layout = new Element(document.body, { classes: 'keyboard' });
    this.keysLayout.forEach((row) => {
      const line = new Element(layout.node, { classes: 'key-line' });
      row.forEach((item) => {
        const buttonParams = {
          values: keys[item],
          styles: (params[item]) ? params[item].style : null,
          type: (params[item]) ? params[item].type : null,
          // callback: () => { app.playSound(item); },
          callback: () => { this.keyClick(keys[item].code); },
        };

        const button = new Key(line.node, { classes: 'key' }, buttonParams, lang);
        this.buttons[keys[item].code] = button;
      });
    });
  }

  handleFunctionalKey(code) {
    // if (code === 'ShiftLeft') this.handleShift(false);
    if (code === 'CapsLock') this.handleCapsLock();
  }

  keyClick(code) {
    const button = this.buttons[code];
    if (button.type !== 'Functional') this.app.sendKey(button.value);
    else this.handleFunctionalKey(code);
  }

  keyDown(event) {
    this.buttons[event.code].keyDown();

    if (event.code === 'ShiftLeft') this.handleShift(true);
  }

  keyUp(event) {
    const button = this.buttons[event.code];
    button.keyUp();

    if (event.code === 'ShiftLeft') this.handleShift(false);
    if (event.code === 'CapsLock') this.handleCapsLock();
    if (event.code === 'MetaLeft') this.handleLang();

    if (button.type !== 'Functional') this.app.sendKey(button.value);
  }

  handleHoldable(code, pressed) {
    if (code === 'ShiftLeft') this.handleShift(pressed);
  }

  handleLang() {
    this.lang = (this.lang === 'en') ? 'ru' : 'en';
    this.redrawLayout();
  }

  handleShift(bool) {
    if (this.holdable.Shift === bool) return;
    this.holdable.Shift = bool;

    this.redrawLayout('Shift');
  }

  handleCapsLock() {
    this.holdable.CapsLock = !this.holdable.CapsLock;
    this.buttons.CapsLock.led = this.holdable.CapsLock;
    this.buttons.CapsLock.lightLed();

    this.redrawLayout('CapsLock');
  }

  redrawLayout() {
    const upperCase = { CapsLock: this.holdable.CapsLock, Shift: this.holdable.Shift };
    Object.values(this.buttons).forEach((button) => {
      button.redrawCaption(this.lang, upperCase);
    });
  }

  highLightKey(keyCode, bool) {
    this.buttons[keyCode].highLight(bool);
    if (bool) this.app.playSound();
  }
}
