/**
 * CreateRect
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { RectData } from '../../data';
import { Rect, RectConfig } from './Rect';
import { RectShape } from '../shape';
import { createBorder, createColor } from '../style';


export function createRect(data: RectData): Rect {
  const { type, border, fillColor, ...rest } = data;
  if (type && type !== RectShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  const config: RectConfig = {
    ...rest,
    border: createBorder(border),
    fillColor: createColor(fillColor),
  }

  return new Rect(config);
}
