/* eslint-disable no-loop-func */
import CanvaMeasurer from './CanvaMeasurer';

export default class TextMatrix {
  matrix = [];

  constructor(el, style) {
    this.el = el;
    const cmParams = { font: `${style.fontSize} ${style.font}` };
    this.cmeasurer = new CanvaMeasurer(document.body, { tag: 'canvas' }, cmParams);
  }

  getMaxChars() {
    const s = window.getComputedStyle(this.el);
    const width = this.el.offsetWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
    const charSize = this.cmeasurer.measureText('0'); // can be a constante
    // console.log('w: ', width, 'maxChars:', maxChars, '% ', width / charSize);
    return Math.trunc(width / charSize);
  }

  formatter(value) {
    this.textLines = [];
    const maxChars = this.getMaxChars();
    const paragraph = value.split('\n');
    console.log(paragraph);

    paragraph.forEach((p) => {
      let content = p;
      // if (content === '') content = '\n';

      if (content.length === 0) {
        // this.textLines.push('\t');
      } else {
        while (content.length > 0) {
          const countCharsOnLine2 = (string) => {
            // console.log(string.length, string);
            let tooBig = false;
            let acc = '';
            let i = 0;
            let lastLong = null;

            if (string.length <= maxChars) return string;

            while (!tooBig && i < string.length) {
              if (string[i] === ' ' || string[i] === '-') {
                if (acc.length > maxChars) {
                  tooBig = true;
                } else lastLong = acc + string[i];
              }

              acc += string[i];
              i += 1;
            }

            return !lastLong ? string.slice(0, maxChars) : lastLong;
          };

          const sub = countCharsOnLine2(content);
          this.textLines.push(`${sub}\n`);

          content = content.slice(sub.length, content.length);
        }
      }
    });
    console.log(this.textLines);
    return this.textLines.join('');
  }

  getPosition(pos, direction) {
    const matrix = [];
    let i = 0;
    this.textLines.forEach((line) => {
      const end = i + line.length - 1;
      const lineObj = {
        llength: line.length,
        start: i,
        end,
        isinRange(val) { return (val >= this.start && val <= this.end); },
      };
      i += line.length;
      matrix.push(lineObj);
    });
    console.log(matrix);

    let findLine = matrix.length - 1;
    matrix.forEach((line, index) => {
      if (line.isinRange(pos)) findLine = index;
    });

    console.log('pos ', pos, 'findLine ', findLine);

    let newPos = pos;

    if (findLine >= 0) {
      // const nextLine = direction === 'up' ? matrix[findLine - 1] : matrix[findLine + 1];
      let nextLineIndex = (direction === 'up') ? findLine - 1 : findLine + 1;
      console.log('findLine ', findLine, 'nextLineIndex ', nextLineIndex);

      if (nextLineIndex < 0) nextLineIndex = 0;
      if (nextLineIndex > matrix.length - 1) nextLineIndex = matrix.length - 1;

      // nextLineIndex = nextLineIndex > this.matrix.length - 1
      //   ? this.matrix.length - 1 : nextLineIndex;

      const step = pos - matrix[findLine].start;
      console.log(matrix);
      const nextLine = matrix[nextLineIndex];
      newPos = (nextLine.llength >= step) ? nextLine.start + step : nextLine.end;
    }

    return newPos;
  }

  calcMatrix(value) {
    this.matrix = [];
    this.chars = [];

    const s = window.getComputedStyle(this.el);
    const width = this.el.offsetWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
    const charSize = this.cmeasurer.measureText('0'); // can be a constante
    const maxChars = Math.trunc(width / charSize);
    console.log('w: ', width, 'maxChars:', maxChars, '% ', width / charSize);

    let paragraph = value.split('\n');
    paragraph = paragraph.map((str) => `${str}\n`); // add space at end
    // paragraph = paragraph.map((str, index) => (index > 0 ? `\n${str}` : str));

    console.log(paragraph);
    let n = 0;
    paragraph.forEach((p) => {
      let content = p;
      // if (content[0] === '\n') {
      // n += 1;
      // content = content.slice(1, content.length);
      // }

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

        const countCharsOnLine2 = (string) => {
          let tooBig = false;
          let acc = '';
          let i = 0;
          let lastLong = null;

          if (string.length <= maxChars) return string;

          while (!tooBig && i < string.length) {
            if (string[i] === ' ' || string[i] === '-') {
              if (acc.length > maxChars) {
                tooBig = true;
              } else lastLong = acc + string[i];

              //  console.log(lastLong);
            }

            acc += string[i];
            i += 1;
          }

          return !lastLong ? string.slice(0, maxChars) : lastLong;
        };

        let sub = countCharsOnLine2(content);
        if (sub[sub.length === ' ']) {
          // sub = sub.slice(0, sub.length - 1);
          sub += '\n';
        }
        // console.log('sub ', sub);

        const laneArr = sub.split('').map((_item, index) => n + index);
        n += sub.length;
        line.splice(0, sub.length, ...laneArr);
        this.matrix.push(line);

        const line2 = Array(maxChars).fill(null);
        line2.splice(0, sub.length, ...sub);
        this.chars.push(line2);

        content = content.slice(sub.length, content.length);
      }
    });

    const lastRow = this.matrix.pop();
    const lastCharPos = lastRow.indexOf(null);
    lastRow[lastCharPos] = lastRow[lastCharPos - 1] + 1;
    this.matrix.push(lastRow);

    console.log(this.matrix);
    console.log(this.chars);
  }

  calcPos(value, pos, direction) {
    if (!value) return pos;
    this.calcMatrix(value);

    let currentPos = pos;
    let result = currentPos;
    // console.log(`caret.start: ${currentPos}`, `value: ${value[currentPos]}`);

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
