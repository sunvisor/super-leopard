/**
 * ContractLine
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractBorder } from './contractor';
import { LinePropertyValue } from '../expander';
import { createLine } from '../creator';
import { LineShape } from '../object';
import { LineData } from '../data';

export function contractLine(values: LinePropertyValue) {
  const data:   LineData = {
    type: LineShape,
    x1: values.x1,
    y1: values.y1,
    x2: values.x2,
    y2: values.y2,
    border: contractBorder(values),
  }
  return createLine(data);
}
