import Element from './Element';

export default class Description {
  constructor() {
    const wrapper = new Element(document.body, { classes: 'description-wrapper' });

    const text = [
      'Keyboard was created in Windows',
      'Switch language with left Ctrl + left Alt',
      'Hotkeys: Ctrl + A, Ctrl + C, Ctrl + V, Ctrl + X',
    ];

    text.forEach((item) => {
      const desc = new Element(wrapper.node, { classes: 'description', tag: 'p' });
      desc.node.textContent = item;
    });
  }
}
