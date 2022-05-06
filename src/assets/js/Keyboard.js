import { keysLayout, keys, params } from './keys';
import Element from './Element';
import Key from './Key';

export default class Keyboard {
  buttons = {};

  holdable = {
    Shift: false, Control: false, Alt: false, CapsLock: false,
  };

  holdableKeys = ['ShiftLeft', 'ControlLeft', 'AltLeft', 'ShiftRight', 'ControlRight', 'AltRight'];

  langSwitchKeys = ['ControlLeft', 'AltLeft'];

  constructor(app, lang) {
    this.app = app;
    this.lang = lang;
    const layout = new Element(document.body, { classes: 'keyboard' });
    keysLayout.forEach((row) => {
      const line = new Element(layout.node, { classes: 'key-line' });
      row.forEach((key) => {
        const buttonParams = {
          values: keys[key],
          styles: (params[key]) ? params[key].style : null,
          type: (params[key]) ? params[key].type : null,
          mouseDown: () => { this.keyClick(keys[key].code); },
          mouseUp: () => { this.keyClickUp(); },
        };

        const button = new Key(line.node, { classes: 'key' }, buttonParams, lang);
        const { code } = keys[key];
        this.buttons[code] = button;
      });
    });
  }

  keyClickUp() {
    this.app.fosusOutput();
  }

  keyClick(code) {
    const button = this.buttons[code];

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(code, 'keyClick');
    } else if (button.type === 'Command') {
      this.app.sendCommand(code);
    } else {
      this.app.sendKey(button.value);
    }
  }

  keyDown(code) {
    const button = this.buttons[code];
    if (!button) return;
    button.keyDown();

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(code, 'keyDown');
    } else if (button.type === 'Command') {
      this.app.sendCommand(code);
    } else {
      this.app.sendKey(button.value);
    }
  }

  keyUp(code) {
    const button = this.buttons[code];
    if (!button) return;
    button.keyUp();

    if (button.type === 'Functional') {
      this.handleFunctionalKeys(code, 'keyUp');
    }
  }

  handleFunctionalKeys(code, callFrom) {
    if (code === 'CapsLock') {
      if (callFrom !== 'keyDown') this.handleCapsLock();
    }

    if (this.holdableKeys.includes(code)) {
      const name = code.replace('Left', '').replace('Right', '');
      let state;
      if (callFrom === 'keyDown') state = true;
      if (callFrom === 'keyUp') state = false;
      if (callFrom === 'keyClick') state = !this.holdable[name];

      this.handleHoldableKey(code, state);
    }

    if (this.langSwitchKeys.includes(code)) {
      if (callFrom !== 'keyUp') {
        const [key1, key2] = this.langSwitchKeys.map((i) => i.replace('Left', '').replace('Right', ''));

        if (this.holdable[key1] && this.holdable[key2]) {
          if (!this.switchLang.alreadySwitched) this.switchLang();
          this.switchLang.alreadySwitched = true;
        } else if (callFrom === 'keyClick') this.switchLang.alreadySwitched = false;
      }

      if (callFrom === 'keyUp') this.switchLang.alreadySwitched = false;
    }
  }

  handleHoldableKey(code, state) {
    const keyName = code.replace('Left', '').replace('Right', '');
    if (this.holdable[keyName] === state) return;
    this.holdable[keyName] = state;

    const pair = [`${keyName}Left`, `${keyName}Right`];
    pair.forEach((key) => {
      this.buttons[key].led = state;
      this.buttons[key].lightLed();
    });

    if (keyName === 'Shift') this.redrawLayout();
  }

  handleCapsLock() {
    this.holdable.CapsLock = !this.holdable.CapsLock;
    this.buttons.CapsLock.led = this.holdable.CapsLock;
    this.buttons.CapsLock.lightLed();

    this.redrawLayout();
  }

  switchLang() {
    this.lang = (this.lang === 'en') ? 'ru' : 'en';
    this.redrawLayout();
    this.app.switchLang(this.lang);
  }

  redrawLayout() {
    const upperCase = { CapsLock: this.holdable.CapsLock, Shift: this.holdable.Shift };
    Object.values(this.buttons).forEach((button) => {
      button.redrawCaption(this.lang, upperCase);
    });
  }

  focusOut() {
    Object.keys(this.holdable).forEach((key) => {
      this.holdable[key] = false;
    });

    Object.keys(this.buttons).forEach((key) => {
      const bttn = this.buttons[key];
      bttn.active = false;
      bttn.led = false;
      bttn.highLight();
      bttn.lightLed();
    });

    this.redrawLayout();
  }
}
