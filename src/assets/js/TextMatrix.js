import CanvaMeasurer from './CanvaMeasurer';

export default class TextMatrix {
  constructor(el, style) {
    this.el = el;
    const cmParams = { font: `${style.fontSize} ${style.font}` };
    this.cmeasurer = new CanvaMeasurer(document.body, { tag: 'canvas' }, cmParams);
  }

  findPos(value, pos, direction) {
    if (!value) return pos;
    const lines = this.slpitLines(value);

    let curLineIndex = lines.length - 1;
    lines.forEach((line, index) => {
      if (line.isinRange(pos)) curLineIndex = index;
    });

    const nextLineIndex = (direction === 'up') ? curLineIndex - 1 : curLineIndex + 1;

    if (nextLineIndex < 0) return 0;
    if (nextLineIndex > lines.length - 1) return lines[lines.length - 1].end;

    const step = pos - lines[curLineIndex].start;
    const nextLine = lines[nextLineIndex];

    let newPos = pos;
    newPos = (nextLine.len >= step) ? nextLine.start + step : nextLine.end;

    return newPos;
  }

  getMaxChars() {
    const s = window.getComputedStyle(this.el);
    const width = this.el.offsetWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
    const charSize = this.cmeasurer.measureText('0'); // can be a constante
    return Math.trunc(width / charSize);
  }

  slpitLines(value) {
    const textLines = [];
    const maxChars = this.getMaxChars();
    const paragraphs = value.split('\n');

    const getMaxLine = (string) => {
      let tooBig = false;
      let acc = '';
      let i = 0;
      let lastMax = null;
      if (string.length <= maxChars) return string;
      while (!tooBig && i < string.length) {
        if (string[i] === ' ' || string[i] === '-') {
          if (acc.length > maxChars) {
            tooBig = true;
          } else lastMax = acc + string[i];
        }
        acc += string[i];
        i += 1;
      }
      return !lastMax ? string.slice(0, maxChars) : lastMax;
    };

    let i = 0;
    paragraphs.forEach((p) => {
      let content = `\n${p}`;
      while (content.length > 0) {
        const line = getMaxLine(content);
        const end = i + line.length - 1;
        const lineObj = {
          val: line,
          len: line.length,
          start: i,
          end,
          isinRange(val) { return (val >= this.start && val <= this.end); },
        };
        i += line.length;

        textLines.push(lineObj);
        content = content.slice(line.length, content.length);
      }
    });
    return textLines;
  }
}
