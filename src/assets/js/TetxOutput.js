import CanvaMeasurer from './CanvaMeasurer';
import Element from './Element';
import TextMatrix from './TextMatrix';

export default class TetxOutput {
  style = { font: 'Courier', fontSize: '16px', padding: '8px' };

  constructor(app) {
    this.app = app;
    const textWrapper = new Element(document.body, { classes: 'output-wrapper' });
    const textarea = new Element(textWrapper.node, { classes: 'output', tag: 'textarea' });
    this.el = textarea.node;
    this.el.rows = 14;
    this.el.readonly = true;

    this.el.style = `font-family: ${this.style.font}; font-size: ${this.style.fontSize}; padding: ${this.style.padding};`;

    this.el.value = 'printer took a galley of type and scrambled it to make a type specimen book. It has survived not12\nprinter took a galley of type and scrambled it to make a type specimen book. It has survived not12\n000';

    this.matrix = new TextMatrix(this.el, this.style);

    this.realValue = this.el.value;
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
  }

  sendCommand(name) {
    const value = this.getValue();
    const caret = this.getCaretPos();

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
        // const formatted = this.matrix.formatter(value);
        // pos = this.matrix.getPosition(pos, 'up');
        // this.outputValue(formatted, pos, true);
        // this.outputValue(value);
        // console.log(this.getValue());
        pos = this.matrix.calcPos(value, caret.start, 'up');
        // this.matrix.calcPos(formatted, caret.start, 'up');
      }
      if (name === 'ArrowDown') {
        // const formatted = this.matrix.formatter(value);
        // pos = this.matrix.getPosition(pos, 'down');
        // this.outputValue(formatted, pos, true);
        // this.outputValue(value, pos);
        pos = this.matrix.calcPos(value, caret.start, 'down');
      }
      if (name === 'ArrowLeft') {
        pos = caret.start - 1;
        pos = pos >= 0 ? pos : 0;
      }
      if (name === 'ArrowRight') {
        pos = caret.start + 1;
      }
      setTimeout(() => { this.focus(); }, 50);
      this.setCaretPos(pos);
    }
  }

  getCaretPos() {
    return { start: this.el.selectionStart, end: this.el.selectionEnd };
  }

  setCaretPos(index) {
    this.el.selectionStart = index;
    this.el.selectionEnd = index;
  }

  getValue(format = false) {
    // if (!format) return this.realValue;
    if (!format) return this.el.value;
    return this.formatted;
  }

  focus() {
    this.el.focus();
  }

  outputValue(value, caretPos = null, format = false) {
    // if (!format) {
    //   this.realValue = value;
    // } else {
    //   this.formatted = value;
    // }
    this.el.value = value;
    if (caretPos) this.setCaretPos(caretPos);
    setTimeout(() => { this.focus(); }, 50);
  }
}
