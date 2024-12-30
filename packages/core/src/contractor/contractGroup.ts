/**
 * ContractGroup
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { GroupPropertyValue } from '../expander';
import { Group, Shapes } from '../object';

export function contractGroup(property: GroupPropertyValue, shapes: Shapes): Group {
  return new Group({
    width: property.width,
    height: property.height,
    repeatCount: property.repeatCount,
    direction: property.direction,
    shapes,
  });
}
