/**
 * Grouping
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */

import { Shapes } from '../shapes';
import { Group } from './Group';
import { Shape } from '../shape';

export function grouping(shapes: Shapes, targets: Shapes): {
  shapes: Shapes,
  group: Group,
} {
  const index = getIndex(shapes, targets);
  const group = new Group({ shapes: targets });
  const newShapes = shapes.insert(group, index).remove(targets);
  return {
    shapes: newShapes,
    group,
  };
}

export function ungrouping(shapes: Shapes, group: Group): {
  shapes: Shapes,
  items: Shape[],
} {
  const index = shapes.indexOf(group);
  const items = group.shapes.map(item => {
    return item;
  });
  const newShapes = shapes.insert(new Shapes(items), index).remove(group);
  return {
    shapes: newShapes,
    items,
  }
}

export function getIndex(shapes: Shapes, targets: Shapes): number {
  let index = 0;
  targets.each(item => {
    if (shapes.indexOf(item) !== -1) {
      index = Math.max(index, shapes.indexOf(item));
    }
  });
  return index;
}
