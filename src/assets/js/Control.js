export default class Control {
  constructor(parent, classes = '', tag = 'div') {
    const el = document.createElement(tag);
    el.classList.add(classes);
    parent.append(el);
    this.node = el;
  }

  destroy() {
    this.node.remove();
  }
}
