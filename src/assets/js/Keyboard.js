import { keys, params } from './keys';
import Element from './Element';
import Key from './Key';

export default class Keyboard {
  keysLayout = [
    ['Tilda', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'BackSlash', 'Del'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'CtrlRight'],
  ];

  holdAbleKeys = ['Shift', 'Ctrl', 'Alt', 'ShiftRight', 'AltRight', 'CtrlRight'];

  buttons = {};

  holdable = { Shift: false, CapsLock: false };

  lang = 'en';

  langs = ['en', 'ru'];

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
          callback: () => { app.playSound(item); },
        };

        const button = new Key(line.node, { classes: 'key' }, buttonParams, lang);
        this.buttons[keys[item].code] = button;
      });
    });
  }

  keyDown(event) {
    this.buttons[event.code].keyDown();

    if (event.code === 'ShiftLeft') this.handleShift(true);
  }

  keyUp(event) {
    this.buttons[event.code].keyUp();

    if (event.code === 'ShiftLeft') this.handleShift(false);
    if (event.code === 'CapsLock') this.handleCapsLock();
    if (event.code === 'MetaLeft') this.handleLang();
  }

  handleLang() {
    this.lang = (this.lang === this.langs[0]) ? this.langs[1] : this.langs[0];
    this.redrawLayout();
  }

  handleShift(bool) {
    if (this.holdable.Shift === bool) return;
    this.holdable.Shift = bool;

    this.redrawLayout('Shift');
  }

  handleCapsLock() {
    this.holdable.CapsLock = !this.holdable.CapsLock;
    this.buttons.CapsLock.active = this.holdable.CapsLock;
    this.buttons.CapsLock.highLight();

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
