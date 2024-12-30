/**
 * ConvertList
 *
 * Created by sunvisor on 2024/02/27.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Shapes } from '../shapes';
import { List } from './List';
import { getIndex } from '../group';
import { Shape } from '../shape';

export function shapesToList(shapes: Shapes, targets: Shapes): {
  shapes: Shapes,
  list: List,
} {
  const index = getIndex(shapes, targets);
  const list = new List({ shapes: targets });
  const newShapes = shapes.insert(list, index).remove(targets);
  return {
    shapes: newShapes,
    list,
  }
}

export function listToShapes(shapes: Shapes, list: List): {
  shapes: Shapes,
  items: Shape[],
} {
  const index = shapes.indexOf(list);
  const items = list.shapes.map((item: Shape) => item);
  const newShapes = shapes.insert(new Shapes(items), index).remove(list);
  return {
    shapes: newShapes,
    items,
  }
}
