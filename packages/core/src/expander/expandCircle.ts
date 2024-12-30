/**
 * expandCircle
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Circle } from '../object';
import {
  BorderPropertyValue,
  expandBorder,
  expandFillColor,
  FillColorPropertyValue
} from './expander';

export type CirclePropertyValue = {
  x: number;
  y: number;
  diameter: number;
} & FillColorPropertyValue & BorderPropertyValue;

export function expandCircle(circle: Circle): CirclePropertyValue  {
  return {
    x: circle.x,
    y: circle.y,
    diameter: circle.diameter,
    ...expandFillColor(circle.fillColor),
    ...expandBorder(circle.border),
  }
}
