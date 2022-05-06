import Description from './Description';
import Element from './Element';
import Keyboard from './Keyboard';
import TextOutput from './TetxOutput';
import Title from './Title';

export default class App {
  constructor() {
    const lang = this.storage('lang') ?? 'en';
    const title = new Title('RSS Virtual Keyboard');
    this.output = new TextOutput(this);
    const keyboard = new Keyboard(this, lang);
    const desc = new Description();
    this.audio = new Audio('./sound/clc1.mp3');

    document.body.addEventListener('keydown', (e) => {
      e.preventDefault();
      keyboard.keyDown(e.code);
    });
    document.body.addEventListener('keyup', (e) => {
      e.preventDefault();
      keyboard.keyUp(e.code);
    });

    window.addEventListener('blur', (e) => { keyboard.focusOut(); });
  }

  storage(key, data = null) {
    if (!data) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(data));
    return this; // airbnb wants it
  }

  sendKey(value) {
    this.output.sendKey(value);
  }

  sendCommand(name) {
    this.output.sendCommand(name);
  }

  fosusOutput() {
    this.output.focus();
  }

  switchLang(lang) {
    this.storage('lang', lang);
  }

  playSound() {
    this.audio.play();
  }
}
