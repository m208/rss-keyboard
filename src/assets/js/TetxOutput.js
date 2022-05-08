import Element from './Element';
import TextMatrix from './TextMatrix';

export default class TetxOutput {
  style = { font: 'Courier', fontSize: '16px', padding: '8px' };

  insertions = [];

  constructor(app) {
    this.app = app;
    const textWrapper = new Element(document.body, { classes: 'output-wrapper' });
    const textarea = new Element(textWrapper.node, { classes: 'output2', tag: 'textarea' });
    this.el = textarea.node;
    this.el.rows = 14;
    this.el.cols = 98;
    this.el.autofocus = true;

    this.el.style = `font-family: ${this.style.font}; font-size: ${this.style.fontSize}; padding: ${this.style.padding};`;
    this.matrix = new TextMatrix(this.el, this.style);
  }

  sendKey(val, caret = this.getCaretPos()) {
    let value = this.getValue();

    const carStart = caret.start < 0 ? 0 : caret.start;
    const carEnd = caret.end;

    const before = value.slice(0, carStart);
    const after = value.slice(carEnd, value.length);

    value = before + val + after;
    const newCarPos = before.length + val.length;

    this.outputValue(value, newCarPos);
    this.app.playSound();
  }

  sendCommand(name) {
    const value = this.getValue();
    const caret = this.getCaretPos();

    if (name === 'paste') console.log('PASTE');

    if (name === 'Tab') this.sendKey('    ');

    if (name === 'Enter') this.sendKey('\n');

    if (name === 'Backspace') {
      if ((caret.end - caret.start) > 0) this.sendKey('');
      else this.sendKey('', { start: caret.start - 1, end: caret.end });
    }

    if (name === 'Delete') {
      if ((caret.end - caret.start) > 0) this.sendKey('');
      else this.sendKey('', { start: caret.start, end: caret.end + 1 });
    }

    const navKeys = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

    if (navKeys.includes(name)) {
      let pos = caret.start;

      if (name === 'ArrowUp') {
        const formattedVal = this.matrix.getData(value, caret.start, 'up');
        // console.log(value);
        // console.log(formattedVal.text);
        this.insertions = formattedVal.insertions;
        this.outputValue(formattedVal.text, formattedVal.pos);
        // pos = this.matrix.findPos(value, caret.start, 'up');
      }
      if (name === 'ArrowDown') {
        const formattedVal = this.matrix.getData(value, caret.start, 'down');
        // console.log(value);
        // console.log(formattedVal.text);
        this.insertions = formattedVal.insertions;
        this.outputValue(formattedVal.text, formattedVal.pos);

        // pos = this.matrix.findPos(value, caret.start, 'down');
      }
      if (name === 'ArrowLeft') {
        pos = caret.start - 1;
        pos = pos >= 0 ? pos : 0;
        this.setCaretPos(pos);
      }
      if (name === 'ArrowRight') {
        pos = caret.start + 1;
        this.setCaretPos(pos);
      }
      // this.setCaretPos(pos);
      this.app.playSound();
    }
  }

  getCaretPos() {
    let [start, end] = [this.el.selectionStart, this.el.selectionEnd];

    this.insertions.forEach((i) => {
      start = start > i ? start - 1 : start;
      end = end > i ? end - 1 : end;
    });

    return { start, end };
  }

  setCaretPos(index) {
    this.el.selectionStart = index;
    this.el.selectionEnd = index;
  }

  getValue() {
    const value = this.el.value.split('');

    const ins = this.insertions.reverse();
    // console.log('ins ', this.insertions);

    ins.forEach((i) => {
      value.splice(i, 1);
    });

    this.insertions = [];
    return value.join('');
  }

  focus() {
    this.el.focus();
  }

  outputValue(value, caretPos = null) {
    this.el.value = value;
    console.log(caretPos);
    // setTimeout(() => {

    // }, 50);

    if (caretPos !== null) this.setCaretPos(caretPos);
  }
}
