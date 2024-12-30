/**
 * ExpandGroup
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DirectionValue, Group } from '../object';

export type GroupPropertyValue = {
  repeatCount: number;
  direction: DirectionValue;
  width: number;
  height: number;
}
export function expandGroup(group: Group): GroupPropertyValue {
  return {
    width: group.width,
    height: group.height,
    repeatCount: group.repeatCount,
    direction: group.direction,
  }
}
