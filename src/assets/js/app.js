import Description from './Description';
import Element from './Element';
import Keyboard from './Keyboard';
import TextOutput from './TetxOutput';
import Title from './Title';

export default class App {
  constructor() {
    const title = new Title('RSS Virtual Keyboard');
    this.output = new TextOutput(this);
    const keyboard = new Keyboard(this);
    const desc = new Description();
    this.audio = new Audio('/dist/sound/clc1.mp3');

    document.body.addEventListener('keydown', (e) => {
      keyboard.keyDown(e);
    });
    document.body.addEventListener('keyup', (e) => {
      keyboard.keyUp(e);
    });
  }

  sendKey(value) {
    this.output.el.value += value;
  }

  sendCommand(name) {
    this.name = name; // temp
    console.log(name);
  }

  playSound() {
    this.audio.play();
  }
}
