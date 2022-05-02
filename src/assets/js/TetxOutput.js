import Element from './Element';

export default class TetxOutput {
  constructor(app) {
    this.app = app;
    const textWrapper = new Element(document.body, { classes: 'output-wrapper' });
    const textarea = new Element(textWrapper.node, { classes: 'output', tag: 'textarea' });
    this.el = textarea.node;
    this.el.rows = 15;
  }
}
