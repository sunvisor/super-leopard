/**
 * SerializeEllipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { EllipseData } from '../../data';
import { Ellipse } from './Ellipse';
import { EllipseShape } from '../shape';
import { serializeBorder, serializeColor } from '../style';

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
