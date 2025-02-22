/**
 * SerializeRect
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { RectData } from '../../data';
import { Rect } from './Rect';
import { RectShape } from '../shape';
import { serializeBorder, serializeColor } from '../style';


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
