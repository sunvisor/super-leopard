/**
 * ContractEllipsis
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractBorder, contractFillColor } from './contractor';
import { EllipsePropertyValue } from '../expander';
import { Ellipse, EllipseShape } from '../object';
import { createEllipse } from '../creator';
import { EllipseData } from '../data';

export function contractEllipse(values: EllipsePropertyValue): Ellipse {
  const data: EllipseData = {
    type: EllipseShape,
    x: values.x,
    y: values.y,
    width: values.width,
    height: values.height,
    fillColor: contractFillColor(values),
    border: contractBorder(values),
  }
  return createEllipse(data);
}
