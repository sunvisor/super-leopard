/**
 * CreateCircle
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createBorder, createColor } from '../style';
import { CircleData } from '../../data';
import { Circle, CircleConfig } from './Circle';
import { CircleShape } from '../shape';


export function createCircle(data: CircleData): Circle {
  const { type, border, fillColor, ...rest } = data;
  if (type && type !== CircleShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  const config: CircleConfig = {
    ...rest,
    border: createBorder(border),
    fillColor: createColor(fillColor),
  }

  return new Circle(config);

}
