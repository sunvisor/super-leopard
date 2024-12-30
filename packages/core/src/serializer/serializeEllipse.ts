/**
 * SerializeEllipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Ellipse, EllipseShape } from '../object';
import { EllipseData } from '../data';
import { serializeBorder } from './serializeBorder';
import { serializeColor } from './serializeColor';

export function serializeEllipse(ellipse: Ellipse): EllipseData {
  const result: EllipseData = {
    type: EllipseShape,
    x: ellipse.x,
    y: ellipse.y,
    width: ellipse.width,
    height: ellipse.height,
  };
  if (ellipse.border) {
    result.border = serializeBorder(ellipse.border);
  }
  if (ellipse.fillColor) {
    result.fillColor = serializeColor(ellipse.fillColor);
  }
  return result;
}
