/**
 * CreateEllipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { EllipseData } from '../../data';
import { EllipseShape } from '../shape';
import { Ellipse, EllipseConfig } from './Ellipse';
import { createBorder, createColor } from '../style';

export function createEllipse(data: EllipseData) {
  const { type, border, fillColor, ...rest } = data;
  if (type && type !== EllipseShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  const config: EllipseConfig = {
    ...rest,
    border: createBorder(border),
    fillColor: createColor(fillColor),
  }

  return new Ellipse(config);
}
