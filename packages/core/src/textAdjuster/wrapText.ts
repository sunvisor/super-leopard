/**
 * WrapText
 *
 * Created by sunvisor on 2025/01/12.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { WrappedText } from './WrappedText';
import { MeasureFunction } from './types';
import { Scale, Text } from '../object';


export type WrapTextParams = {
  text: Text;
  scale: Scale;
  measureWidth: MeasureFunction;
};

export function wrapText({text, measureWidth, scale}: WrapTextParams): WrappedText {
  const wrappedText = new WrappedText();
  const sentence = text.text;
  const width = scale.toPoint(text.width);
  let currentLine = "";

  Array.from({ length: sentence.length }, (_, i) => {
    let char = sentence[i];
    if (char === '\n') {
      wrappedText.push(currentLine, true);
      currentLine = "";
      return;
    }
    if (measureWidth(text.set('text', currentLine + char)) > width) {
      wrappedText.push(currentLine, false);
      currentLine = '';
    }
    currentLine += char;
  });
  wrappedText.push(currentLine, true);

  return wrappedText;
}
