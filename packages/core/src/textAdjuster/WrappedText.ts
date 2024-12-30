/**
 * WrappedText
 *
 * Created by sunvisor on 2023/12/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export class WrappedText {
  #text: string[] = [];
  #endOfLine: boolean[] = [];

  push(text: string, endOfLine: boolean) {
    this.#text.push(text);
    this.#endOfLine.push(endOfLine);
  }

  getText(index: number): string {
    return this.#text[index];
  }

  getEndOfLine(index: number): boolean {
    return this.#endOfLine[index];
  }

  join(): string {
    return this.#text.join('\n');
  }

  each(callback: (text: string, endOfLine: boolean, index: number) => void) {
    this.#text.forEach((text, index) => {
      callback(text, this.#endOfLine[index], index);
    });
  }

  length(): number {
    return this.#text.length
  }

  truncate(index: number): WrappedText {
    const wrappedText = new WrappedText();
    this.each((text, endOfLine, i) => {
      if (i < index) {
        wrappedText.push(text, endOfLine);
      }
    });
    return wrappedText;
  }
}
