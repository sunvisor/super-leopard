/**
 * CreateRect
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Rect, RectConfig, RectShape } from "../object";
import { createBorder } from './createBorder';
import { createColor } from './createColor';
import { RectData } from '../data';

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
