import Element from './Element';

export default class Key extends Element {
  constructor(parent, options, params) {
    super(parent, options);

    if (params.styles) this.node.classList.add(params.styles.style);

    this.node.innerHTML = params.values.en;
    this.node.onclick = params.callback;
  }

  highLight(bool) {
    if (bool) this.node.classList.add('active');
    else this.node.classList.remove('active');
  }
}
