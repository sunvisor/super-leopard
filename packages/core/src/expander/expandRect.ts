/**
 * ExpandRect
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Rect } from '../object';
import {
  BorderPropertyValue,
  expandBorder,
  expandFillColor,
  FillColorPropertyValue
} from './expander';

export type RectPropertyValue = {
  x: number;
  y: number;
  width: number;
  height: number;
} & BorderPropertyValue & FillColorPropertyValue

export function expandRect(rect: Rect): RectPropertyValue {
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    ...expandFillColor(rect.fillColor),
    ...expandBorder(rect.border),
  };
}
