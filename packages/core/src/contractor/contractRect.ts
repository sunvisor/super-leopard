/**
 * ContractRect
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { RectPropertyValue } from '../expander';
import { contractBorder, contractFillColor } from './contractor';
import { Rect, RectShape } from '../object';
import { createRect } from '../creator';
import { RectData } from '../data';

export function contractRect(values: RectPropertyValue): Rect {
  const data: RectData = {
    type: RectShape,
    x: values.x,
    y: values.y,
    width: values.width,
    height: values.height,
    fillColor: contractFillColor(values),
    border: contractBorder(values),
  }
  return createRect(data);
}
