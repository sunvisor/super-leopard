/**
 * SingleLineAdjuster
 *
 * Created by sunvisor on 2025/01/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Font, Text, ValignType } from '../object';
import { TextAdjusterParams } from './types';


/**
 * Return truncated text when text is too long
 */
function truncate({ text, measureWidth, scale }: TextAdjusterParams): Text {
  const areaWidth = scale.toPoint(text.width)
  let truncated = '';
  for (let i = 0; i < text.text.length; i++) {
    const char = text.text[i];
    const width = measureWidth(text.set('text', truncated + char));
    if (width > areaWidth) {
      break;
    }
    truncated += char;
  }
  return text.set('text', truncated);
}

/**
 * Return text with adjusted font size
 */
function fitCell({ text, measureWidth, scale }: TextAdjusterParams): Text {
  if (!text.fitCell) {
    return text;
  }
  const areaWidth = scale.toPoint(text.width)
  let fontSize = text.font.size * 10; // avoid precision error
  let width = measureWidth(text);
  while (width > areaWidth) {
    fontSize -= 1;
    width = measureWidth(text.set('font', setFontSize(text.font, fontSize / 10)));
  }
  return text.set('font', setFontSize(text.font, fontSize / 10));
}

/**
 * Return font with specified font size
 */
function setFontSize(font: Font, fontSize: number): Font {
  const fontConfig = font.config;
  return new Font({
    ...fontConfig,
    size: fontSize,
  });
}

type StartYPositionParams = {
  text: Text;
  textScaleHeight: number;
}

function startYPosition({ text, textScaleHeight }: StartYPositionParams): number {
  const y = text.y;
  const height = text.height;
  switch (text.valign) {
    case ValignType.BOTTOM:
      return y + height - textScaleHeight;
    case ValignType.MIDDLE:
      return y + ((height - textScaleHeight) / 2);
    default:
      return y;
  }
}

export default function singleLineAdjuster(params: TextAdjusterParams): Text {
  const { scale, measureHeight, measureWidth } = params;
  const y = startYPosition({
    text: params.text,
    textScaleHeight: scale.fromPoint(measureHeight(params.text))
  })
  const text = params.text.set('y', y);

  if (measureWidth(text) <= text.width) {
    return text;
  }
  return text.fitCell ? fitCell({ ...params, text }) : truncate({ ...params, text });
}
