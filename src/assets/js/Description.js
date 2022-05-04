import Element from './Element';

export default class Description {
  constructor(text) {
    const wrapper = new Element(document.body, { classes: 'description-wrapper' });

    const desc1 = new Element(wrapper.node, { classes: 'description', tag: 'p' });
    const desc2 = new Element(wrapper.node, { classes: 'description', tag: 'p' });

    desc1.node.textContent = 'Keyboard was created in Windows';
    desc2.node.textContent = 'Switch language with left Ctrl + left Alt';
  }
}
