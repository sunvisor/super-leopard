/**
 * ExpandList
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DirectionValue, List } from '../object';

export type ListPropertyValue = {
  width: number;
  height: number;
  direction: DirectionValue;
  rows: number;
  columns: number;
}

export function expandList(list: List): ListPropertyValue {
  return {
    width: list.width ?? list.shapes.bbox.width,
    height: list.height ?? list.shapes.bbox.height,
    direction: list.direction,
    rows: list.rows,
    columns: list.columns
  }
}
