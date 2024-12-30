/**
 * ExpandEllipse
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Ellipse } from '../object'
import {
  BorderPropertyValue,
  expandBorder,
  expandFillColor,
  FillColorPropertyValue
} from './expander';

export type EllipsePropertyValue = {
  x: number;
  y: number;
  width: number;
  height: number;
} & FillColorPropertyValue & BorderPropertyValue;

export function expandEllipse(ellipse: Ellipse): EllipsePropertyValue {
  return {
    x: ellipse.x,
    y: ellipse.y,
    width: ellipse.width,
    height: ellipse.height,
    ...expandFillColor(ellipse.fillColor),
    ...expandBorder(ellipse.border),
  }
}
