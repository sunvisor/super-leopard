/**
 * SerializeCircle
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { CircleData } from '../../data';
import { serializeBorder, serializeColor } from '../style';
import { Circle } from './Circle';
import { CircleShape } from '../shape';


export function serializeCircle(circle: Circle): CircleData {
  const result: CircleData = {
    type: CircleShape,
    x: circle.x,
    y: circle.y,
    diameter: circle.diameter,
  };
  if (circle.border) {
    result.border = serializeBorder(circle.border);
  }
  if (circle.fillColor) {
    result.fillColor = serializeColor(circle.fillColor);
  }
  return result;
}
