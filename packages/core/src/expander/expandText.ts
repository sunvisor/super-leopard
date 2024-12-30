/**
 * ExpandText
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandFillColor, FillColorPropertyValue } from './expander';
import { AlignValue, Font, FontStyleValue, Text, ValignValue } from '../object';

export type TextStyleValue = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  align: AlignValue;
  valign: ValignValue;
  multiLine: boolean;
  linePitch: number;
  fitCell: boolean;
} & FillColorPropertyValue & FontPropertyValue;

export type FontPropertyValue = {
  fontFamily: string;
  fontSize: number;
  fontStyle: FontStyleValue[];
}

export type TextPropertyValue = {
  text: string;
} & TextStyleValue;

export function expandFont(font: Font) {
  return {
    fontFamily: font.family,
    fontSize: font.size,
    fontStyle: font.style
  }
}

export function expandTextStyle(text: Text): TextStyleValue {
  return {
    x: text.x,
    y: text.y,
    width: text.width,
    height: text.height,
    color: text.color.color,
    ...expandFont(text.font),
    ...expandFillColor(text.fillColor),
    align: text.align ?? 'left',
    valign: text.valign ?? 'middle',
    multiLine: text.multiLine,
    linePitch: text.linePitch ?? 0,
    fitCell: text.fitCell,
  }

}

export function expandText(text: Text): TextPropertyValue {
  return {
    text: text.text,
    ...expandTextStyle(text),
  }
}
