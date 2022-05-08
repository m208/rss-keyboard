import Element from './Element';

export default class CanvaMeasurer extends Element {
  constructor(appendTo, options, params) {
    super(appendTo, options);

    this.node.style.display = 'none';
    this.ctx = this.node.getContext('2d');
    this.ctx.font = params.font;
  }

  measureText(text) {
    return this.ctx.measureText(text).width;
  }
}
