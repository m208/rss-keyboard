import Element from './Element';
import Keyboard from './Keyboard';
import TextOutput from './TetxOutput';
import Title from './Title';

export default class App {
  constructor() {
    const title = new Title('RSS Virtual Keyboard');
    const output = new TextOutput(this);
    const keyboard = new Keyboard(this);
    this.audio = new Audio('/dist/sound/clc1.mp3');

    document.body.addEventListener('keydown', (e) => {
      keyboard.highLightKey(e.code, true);
    });
    document.body.addEventListener('keyup', (e) => {
      keyboard.highLightKey(e.code, false);
    });
  }

  playSound() {
    this.audio.play();
  }
}
