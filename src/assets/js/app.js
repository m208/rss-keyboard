import Description from './Description';
import Keyboard from './Keyboard';
import TextOutput from './TetxOutput';
import Title from './Title';
import { keys } from './keys';

export default class App {
  constructor() {
    this.lang = this.storage('lang') ?? 'en';
    this.title = new Title('RSS Virtual Keyboard');
    this.output = new TextOutput(this);
    this.keyboard = new Keyboard(this, this.lang);
    this.desc = new Description();
    this.clickSound = new Audio('./sound/clc1.mp3');
    this.clipboard = navigator.clipboard;

    const keysInUse = Object.values(keys).map((el) => el.code);
    document.body.addEventListener('keydown', (e) => {
      if (keysInUse.includes(e.code)) {
        e.preventDefault();
        this.keyboard.keyDown(e.code);
      }
    });
    document.body.addEventListener('keyup', (e) => {
      if (keysInUse.includes(e.code)) {
        e.preventDefault();
        this.keyboard.keyUp(e.code);
      }
    });

    window.addEventListener('blur', () => { this.keyboard.focusOut(); });
  }

  storage(key, data = null) {
    if (!data) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(data));
    return this.lang;
  }

  async clipboardAction(data = null) {
    if (data !== null) {
      const blob = new Blob([data], { type: 'text/plain' });
      const { ClipboardItem } = window;
      this.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      return false;
    }
    const permission = await navigator.permissions.query({ name: 'clipboard-read' });
    if (permission.state === 'denied') return '';

    const clipboardText = await this.clipboard.readText();
    return clipboardText;
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
    this.clickSound.play();
  }
}
