import Control from './Control';
import Keyboard from './Keyboard';

export default class App {
  constructor() {
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
