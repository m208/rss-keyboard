import { keys, styles } from './keys';
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

  buttons = {};

  constructor(app) {
    this.app = app;
    const layout = new Element(document.body, { classes: 'keyboard' });
    this.keysLayout.forEach((row) => {
      const line = new Element(layout.node, { classes: 'key-line' });
      row.forEach((item) => {
        const buttonParams = {
          values: keys[item],
          styles: styles[item],
          callback: () => { app.playSound(item); },
        };
        const button = new Key(line.node, { classes: 'key' }, buttonParams);
        this.buttons[keys[item].code] = button;
      });
    });
  }

  highLightKey(keyCode, bool) {
    this.buttons[keyCode].highLight(bool);
    if (bool) this.app.playSound();
  }
}
