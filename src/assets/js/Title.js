import Element from './Element';

export default class Title {
  constructor(text) {
    const title = new Element(document.body, { classes: 'heading', tag: 'h1' });
    title.node.textContent = text;
  }
}
