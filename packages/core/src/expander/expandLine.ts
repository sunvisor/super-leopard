/**
 * ExpandLine
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { BorderPropertyValue, expandBorder } from './expander';
import { Line } from '../object';

export type LinePropertyValue = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} & BorderPropertyValue;

export function expandLine(line: Line): LinePropertyValue {
  return {
    x1: line.x1,
    y1: line.y1,
    x2: line.x2,
    y2: line.y2,
    ...expandBorder(line.border),
  }
}
