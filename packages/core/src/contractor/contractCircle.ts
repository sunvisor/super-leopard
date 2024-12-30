/**
 * contractCircle
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractBorder, contractFillColor } from './contractor';
import { CirclePropertyValue } from '../expander';
import { Circle, CircleShape } from '../object';
import { createCircle } from '../creator';
import { CircleData } from '../data';


export function contractCircle(values: CirclePropertyValue): Circle {
  const data: CircleData  = {
    type: CircleShape,
    x: values.x,
    y: values.y,
    diameter: values.diameter,
    border: contractBorder(values),
    fillColor: contractFillColor(values),
  }
  return createCircle(data);
}
