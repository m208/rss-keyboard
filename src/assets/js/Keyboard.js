import { keys, params } from './keys';
import Element from './Element';
import Key from './Key';

export default class Keyboard {
  buttons = {};

  // holdableButtons = {};

  keysLayout = [
    ['Tilda', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'BackSlash', 'Del'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'CtrlRight'],
  ];

  holdableKeys = ['Shift', 'Ctrl', 'Alt', 'ShiftRight', 'AltRight', 'CtrlRight'];

  holdable = {
    Shift: false, Ctrl: false, Alt: false, CapsLock: false,
  };

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

    // this.holdableKeys.forEach((i) => {
    //   this.holdableButtons[keys[i].code] = this.buttons[keys[i].code];
    // });
  }

  handleFunctionalKeys(code, callFrom) {
    if (code === 'CapsLock') {
      if (callFrom === 'keyUp') this.handleCapsLock();
      if (callFrom === 'keyClick') this.handleCapsLock();
    }

    if (code === 'ShiftLeft' || code === 'ShiftRight') {
      const handler = this.setupHandler(code, callFrom, this.handleShift);
      handler();
    }
    if (code === 'ControlLeft') {
      const handler = this.setupHandler(code, callFrom, this.handleCtrl);
      handler();
    }
    if (code === 'AltLeft') {
      const handler = this.setupHandler(code, callFrom, this.handleAlt);
      handler();
    }

    if (this.holdable.Ctrl && this.holdable.Alt) this.handleLang();
  }

  setupHandler(code, callFrom, callback) {
    let state;
    const name = code.replace('Left', '').replace('Right', '');
    if (callFrom === 'keyDown') state = true;
    if (callFrom === 'keyUp') state = false;
    if (callFrom === 'keyClick') state = !this.holdable[name];
    return callback.bind(this, state);
  }

  // handleHoldableKeys(code) {
  //   const hButtons = this.holdableButtons;
  //   if (!Object.keys(hButtons).includes(code)) return;
  //   if (code === 'ShiftLeft' || code === 'ShiftRight') this.handleShift(true);
  //   if (code === 'ControlLeft' || code === 'ControlRight') console.log('ctrl');
  //   if (code === 'AltLeft' || code === 'AltRight') console.log('alt');
  // }

  keyClick(code) {
    const button = this.buttons[code];
    if (button.type === 'Functional') {
      this.handleFunctionalKeys(code, 'keyClick');
    } else this.app.sendKey(button.value);
  }

  keyDown(event) {
    const button = this.buttons[event.code];
    button.keyDown();
    if (button.type === 'Functional') {
      // this.handleHoldableKeys(event.code);

      this.handleFunctionalKeys(event.code, 'keyDown');
    }
    // if (event.code === 'ShiftLeft') this.handleShift(true);
  }

  keyUp(event) {
    const button = this.buttons[event.code];
    button.keyUp();

    // if (event.code === 'ShiftLeft') this.handleShift(false);
    // if (event.code === 'CapsLock') this.handleCapsLock();
    // if (event.code === 'MetaLeft') this.handleLang();

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(event.code, 'keyUp');
    } else this.app.sendKey(button.value);
  }

  handleLang() {
    this.lang = (this.lang === 'en') ? 'ru' : 'en';
    this.redrawLayout();
  }

  handleCtrl(bool) {
    if (this.holdable.Ctrl === bool) return;
    this.holdable.Ctrl = bool;
    // if (this.holdable.Ctrl && this.holdable.Alt) this.handleLang();
  }

  handleAlt(bool) {
    if (this.holdable.Alt === bool) return;
    this.holdable.Alt = bool;
  }

  handleShift(bool) {
    if (this.holdable.Shift === bool) return;
    this.holdable.Shift = bool;

    this.buttons.ShiftLeft.led = this.holdable.Shift;
    this.buttons.ShiftLeft.lightLed();

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
