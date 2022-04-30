import { keys, styles } from './keys';
import Control from './Control';
import Key from './Key';

export default class Keyboard {
  keysLayout = [
    ['Tilda', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'BackSlash', 'Del'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'CtrlRight'],
  ];

  keys = {};

  constructor(app) {
    this.app = app;
    const layout = new Control(document.body, 'keyboard');
    this.keysLayout.forEach((row) => {
      const line = new Control(layout.node, 'key-line');
      row.forEach((item) => {
        const button = new Key(line.node, 'key', keys[item], styles[item], () => { app.playSound(item); });
        this.keys[keys[item].code] = button;
      });
    });
  }

  highLightKey(keyCode, bool) {
    this.keys[keyCode].highLight(bool);
    if (bool) this.app.playSound();
  }
}
