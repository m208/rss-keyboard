import Element from './Element';

export default class TetxOutput {
  constructor(app) {
    this.app = app;
    const textWrapper = new Element(document.body, { classes: 'output-wrapper' });
    const textarea = new Element(textWrapper.node, { classes: 'output', tag: 'textarea' });
    textarea.node.rows = 15;
  }
}
