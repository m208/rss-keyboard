/* eslint-disable no-loop-func */
import CanvaMeasurer from './CanvaMeasurer';

export default class TextMatrix {
  matrix = [];

  constructor(el, style) {
    this.el = el;
    const cmParams = { font: `${style.fontSize} ${style.font}` };
    this.cmeasurer = new CanvaMeasurer(document.body, { tag: 'canvas' }, cmParams);
  }

  calcMatrix(value) {
    this.matrix = [];

    const s = window.getComputedStyle(this.el);
    const width = this.el.offsetWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
    const charSize = this.cmeasurer.measureText('0'); // can be a constante
    const maxChars = Math.round(width / charSize);
    // console.log(width, maxChars);

    const paragraph = value.split('\n');
    // paragraph = paragraph.map((str) => `${str} `); // add space at end
    // paragraph = paragraph.map((str, index) => (index > 0 ? `**${str}` : str));

    let n = 0;
    paragraph.forEach((p) => {
      let content = p;
      while (content.length > 0) {
        const line = Array(maxChars).fill(null);

        const countCharsOnLine = (string) => {
          const array = string.split(' ').map((el) => el.length);
          let counter = 0;
          let enough = false;
          array.forEach((i) => {
            if (!enough) {
              if (counter + i + 1 <= maxChars) {
                counter += (i + 1);
              } else enough = true;
            }
          });
          return counter;
        };

        const sub = countCharsOnLine(content);
        const lane = content.slice(0, sub);
        const laneArr = lane.split('').map((_item, index) => n + index);
        n += sub;
        line.splice(0, lane.length, ...laneArr);
        this.matrix.push(line);
        content = content.slice(sub, content.length);
      }
    });

    const lastRow = this.matrix.pop();
    const lastCharPos = lastRow.indexOf(null);
    lastRow[lastCharPos] = lastRow[lastCharPos - 1] + 1;
    this.matrix.push(lastRow);

    // console.log(this.matrix);
  }

  calcPos(value, pos, direction) {
    this.calcMatrix(value);

    let currentPos = pos;
    let result = currentPos;
    // console.log(`caret.start ${currentPos}`, `value ${value[currentPos]}`);

    let found = false;
    while (!found) {
      this.matrix.forEach((row, i) => {
        if (row.includes(currentPos)) {
          const j = row.indexOf(currentPos);

          let nextLineIndex = (direction === 'up') ? i - 1 : i + 1;

          nextLineIndex = nextLineIndex < 0 ? 0 : nextLineIndex;
          nextLineIndex = nextLineIndex > this.matrix.length - 1
            ? this.matrix.length - 1 : nextLineIndex;

          const nextLinePos = this.matrix[nextLineIndex][j];
          if (nextLinePos !== null) {
            result = nextLinePos; found = true;
          } else {
            result = this.matrix[nextLineIndex].filter((n) => n != null).pop();
            found = true;
          }
          // console.log('RES ', currentPos, result);
        }
      });
      currentPos -= 1;
    }

    return result;
  }
}
