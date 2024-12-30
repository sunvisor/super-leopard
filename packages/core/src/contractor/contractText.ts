/**
 * ContractText
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractFillColor } from './contractor';
import { FontPropertyValue, TextPropertyValue } from '../expander';
import { Text, TextShape } from '../object';
import { createText } from '../creator';
import { TextData } from '../data';

export function contractText(values: TextPropertyValue): Text {
  const data: TextData = {
    type: TextShape,
    x: values.x,
    y: values.y,
    width: values.width,
    height: values.height,
    text: values.text,
    font: contractFont(values),
    fillColor: contractFillColor(values),
    color: values.color,
    multiLine: values.multiLine,
    linePitch: values.multiLine ? values.linePitch : undefined,
    fitCell: values.fitCell,
    align: values.align,
    valign: values.valign,
  }
  return createText(data);
}

export function contractFont(font: FontPropertyValue) {
  return {
    family: font.fontFamily,
    size: font.fontSize,
    style: font.fontStyle.join(',')
  }
}
