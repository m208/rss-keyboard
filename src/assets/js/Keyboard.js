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

  holdable = {
    Shift: false, Control: false, Alt: false, CapsLock: false, // move CapsLock to different var?
  };

  holdableKeys = ['ShiftLeft', 'ControlLeft', 'AltLeft', 'ShiftRight'];

  langSwitchKeys = ['Control', 'Alt'];

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
        const { code } = keys[item];
        this.buttons[code] = button;
      });
    });
  }

  handleFunctionalKeys(code, callFrom) {
    if (code === 'CapsLock') {
      if (callFrom === 'keyUp') this.handleCapsLock();
      if (callFrom === 'keyClick') this.handleCapsLock();
    }

    if (this.holdableKeys.includes(code)) {
      const name = code.replace('Left', '').replace('Right', '');
      let state;
      if (callFrom === 'keyDown') state = true;
      if (callFrom === 'keyUp') state = false;
      if (callFrom === 'keyClick') state = !this.holdable[name];

      this.handleHoldableKey(code, state);
    }

    if (callFrom === 'keyDown') {
      const [key1, key2] = this.langSwitchKeys;
      if (this.holdable[key1] && this.holdable[key2]) {
        if (!this.handleLang.alreadySwitched) this.handleLang();
        this.handleLang.alreadySwitched = true;
      }
    }
    if (callFrom === 'keyUp') this.handleLang.alreadySwitched = false;
  }

  keyClick(code) {
    const button = this.buttons[code];

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(code, 'keyClick');
    } else if (button.type === 'Command') this.app.sendCommand(code);
    else this.app.sendKey(button.value);
  }

  keyDown(event) {
    const button = this.buttons[event.code];
    if (!button) return;
    button.keyDown();

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(event.code, 'keyDown');
    } else if (button.type === 'Command') this.app.sendCommand(event.code);
    else this.app.sendKey(button.value);
  }

  keyUp(event) {
    const button = this.buttons[event.code];
    if (!button) return;
    button.keyUp();

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(event.code, 'keyUp');
    }
  }

  handleLang() {
    this.lang = (this.lang === 'en') ? 'ru' : 'en';
    this.redrawLayout();
  }

  handleHoldableKey(code, state) {
    const keyName = code.replace('Left', '').replace('Right', '');
    if (this.holdable[keyName] === state) return;
    this.holdable[keyName] = state;

    const buttonCode = `${keyName}Left`; // do the same for right bttns?
    this.buttons[buttonCode].led = state;
    this.buttons[buttonCode].lightLed();

    if (keyName === 'Shift') this.redrawLayout();
  }

  handleCapsLock() {
    this.holdable.CapsLock = !this.holdable.CapsLock;
    this.buttons.CapsLock.led = this.holdable.CapsLock;
    this.buttons.CapsLock.lightLed();

    this.redrawLayout();
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
