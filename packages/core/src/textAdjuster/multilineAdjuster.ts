/**
 * MultilineAdjuster
 *
 * Created by sunvisor on 2025/01/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { AlignType, AlignValue, Scale, Shapes, Text, ValignType } from '../object';
import { wrapText } from './wrapText';
import { WrappedText } from './WrappedText';
import { TextAdjusterParams } from './types';


type CreateTextShapesParams = {
  wrappedText: WrappedText;
  text: Text;
  lineScaleHeight: number;
}

type StartYPositionParams = {
  text: Text;
  lineScaleHeight: number;
  lineCount: number;
}

function startYPosition({ text, lineScaleHeight, lineCount }: StartYPositionParams): number {
  const y = text.y;
  const height = text.height;

  switch (text.valign) {
    case ValignType.BOTTOM:
      return y + height - lineScaleHeight * lineCount;
    case ValignType.MIDDLE:
      return y + (height - lineScaleHeight * lineCount) / 2;
    default:
      return y;
  }
}

/**
 * Create text shapes from wrappedText based on the specified Text.
 */
function createTextShapes({ wrappedText, text, lineScaleHeight }: CreateTextShapesParams): Shapes {
  const items: Text[] = [];
  const y = startYPosition({
    text,
    lineScaleHeight,
    lineCount: wrappedText.length()
  });

  wrappedText.each((lineText: string, endOfLine: boolean, index: number) => {
    const item = text
      .set('linePitch', undefined)
      .set('multiLine', false)
      .set('y', y + index * lineScaleHeight)
      .set('text', lineText)
      .set('align', getAlign(text, endOfLine));
    items.push(item);
  });

  return new Shapes(items);
}

/**
 * Returns a Text with the specified font size.
 */
function setFontSize(text: Text, size: number): Text {
  return text.set('font', text.font.set('size', size));
}

type MeasureLineHeightParams = {
  text: Text;
  scale: Scale;
  measureHeight: (text: Text) => number;
}

/**
 * Returns the height of a line in pt
 */
function measureLineHeight(params: MeasureLineHeightParams): number {
  const { text, scale, measureHeight } = params;

  return text.linePitch ? scale.toPoint(text.linePitch) : measureHeight(text);
}

/**
 * Returns texts that are truncated to fit the area
 */
function truncate(params: TextAdjusterParams): Shapes {
  const { text, scale } = params;
  const wrappedText = wrapText(params);
  const lineHeight = measureLineHeight(params);
  const areaHeight = scale.toPoint(text.height);
  const maxLines = Math.floor(areaHeight / lineHeight);

  return createTextShapes({
    wrappedText: wrappedText.truncate(maxLines),
    text: text,
    lineScaleHeight: scale.fromPoint(lineHeight)
  });
}

/**
 * Returns texts that are adjusted to fit the area
 */
function fitCell(params: TextAdjusterParams): Shapes {
  const { scale } = params;
  const areaHeight = scale.toPoint(params.text.height);
  let text = params.text;
  let lineHeight = measureLineHeight(params);
  let fontSize = text.font.size * 10;

  let wrappedText = wrapText(params);
  while (areaHeight < (wrappedText.length() * lineHeight)) {
    fontSize -= 1;
    text = setFontSize(text, fontSize / 10);
    lineHeight = measureLineHeight({ ...params, text });
    wrappedText = wrapText({
      ...params,
      text,
    });
  }

  return createTextShapes({
    wrappedText: wrappedText,
    text: text,
    lineScaleHeight: scale.fromPoint(lineHeight)
  });
}

function getAlign(text: Text, endOfLine: boolean): AlignValue {
  switch (text.align) {
    case AlignType.JUSTIFY:
      return endOfLine ? AlignType.LEFT : AlignType.JUSTIFY_ALL;
    default:
      return text.align;
  }
}

/**
 * Returns multiple text object that are adjusted to fit the area
 * When `fitCell: true`, the font size is adjusted so that the text fits within the specified width.
 * When `fitCell: false`, the text is cut off at the end to make it fit within the specified width.
 */
export default function multilineAdjuster(params: TextAdjusterParams): Shapes {
  const { text } = params;
  return text.fitCell ? fitCell(params) : truncate(params);
}
