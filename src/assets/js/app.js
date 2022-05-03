import Description from './Description';
import Element from './Element';
import Keyboard from './Keyboard';
import TextOutput from './TetxOutput';
import Title from './Title';

export default class App {
  constructor() {
    const title = new Title('RSS Virtual Keyboard');
    this.output = new TextOutput(this);
    const keyboard = new Keyboard(this, 'ru');
    const desc = new Description();
    this.audio = new Audio('/dist/sound/clc1.mp3');

    document.body.addEventListener('keydown', (e) => {
      const navKeys = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
      e.preventDefault();
      if (navKeys.includes(e.code)) {
        // console.log(e);
      }

      keyboard.keyDown(e.code);
    });
    document.body.addEventListener('keyup', (e) => {
      e.preventDefault();
      keyboard.keyUp(e.code);
    });
  }

  sendKey(value) {
    this.output.sendKey(value);
  }

  sendCommand(name) {
    this.output.sendCommand(name);
  }

  switchLang(lang) {
    this.lang = lang; // temp
  }

  playSound() {
    this.audio.play();
  }
}
