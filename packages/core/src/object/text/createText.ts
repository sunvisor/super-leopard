/**
 * CreateText
 *
 * Created by sunvisor on 2023/11/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { TextData } from '../../data';
import { TextShape } from '../shape';
import { Text, TextConfig } from './Text';
import { createColor, createFont, DEFAULT_COLOR } from '../style';

export function createText(data: TextData): Text {
  const {
    type,
    font,
    color,
    fillColor,
    ...rest
  } = data;
  if (type && type !== TextShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  const config: TextConfig = {
    ...rest,
    font: createFont(font),
    color: createColor(color ?? DEFAULT_COLOR),
  };
  if (data.fillColor) {
    config.fillColor = createColor(data.fillColor);
  }

  return new Text(config);
}
