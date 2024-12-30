/**
 * CreateCircle
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Circle, CircleConfig, CircleShape } from "../object";
import { createBorder } from './createBorder';
import { createColor } from './createColor';
import { CircleData } from '../data';

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
