export default class Control {
  constructor(parent, options) {
    const el = document.createElement(options.tag || 'div');
    if (options.classes) el.classList.add(options.classes);
    parent.append(el);
    this.node = el;
  }
}
