import { Rect, RectShape } from "../object";
import { RectData } from '../data';
import { serializeBorder } from './serializeBorder';
import { serializeColor } from './serializeColor';

/**
 * SerializeRect
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function serializeRect(rect: Rect): RectData {
  const result: RectData = {
    type: RectShape,
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  };

  if (rect.border) {
    result.border = serializeBorder(rect.border);
  }
  if (rect.fillColor) {
    result.fillColor = serializeColor(rect.fillColor);
  }

  return result;
}
