import Control from './Control';

export default class Key extends Control {
  constructor(parent, classes, values, attr, callback) {
    super(parent, classes);
    if (attr) this.node.classList.add(attr.style);

    this.node.innerHTML = values.en;
    this.node.onclick = () => { callback(); };
  }

  highLight(bool) {
    if (bool) this.node.classList.add('active');
    else this.node.classList.remove('active');
  }
}
