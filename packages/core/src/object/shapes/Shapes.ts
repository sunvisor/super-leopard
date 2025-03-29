/**
 * Shapes
 *
 * Created by sunvisor on 2023/12/09.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Boxable, GroupShape, ListShape, Shape, ShapeCollection } from "../shape";
import { Box, Position } from "../../value";
import { mergeBoxes, moveBoxes, resizeBoxes } from '../boxes';
import { sendToBack, bringToForward, sendToBackward, bringToFront } from '../../order';
import { Group } from '../group';
import { List } from '../list';
import { findMinBy, findMaxBy } from './extreme';


export class Shapes implements ShapeCollection, Boxable {
  readonly #items: Shape[];

  constructor(items: Shape[] = []) {
    this.#items = items;
  }

  get count(): number {
    return this.#items.length
  }

  get bbox(): Box {
    return mergeBoxes(this.#items)
  }

  get items(): Shape[] {
    return this.#items;
  }

  get(index: number): Shape {
    if (index < 0 || index >= this.#items.length) {
      throw new Error('Index out of range');
    }
    return this.#items[index];
  }

  add(shape: Shape | Shapes): Shapes {
    if (shape instanceof Shapes) {
      return new Shapes([...this.#items, ...shape.#items]);
    }
    return new Shapes([...this.#items, shape]);
  }

  insert(shape: Shape | Shapes, index: number): Shapes {
    if (shape instanceof Shapes) {
      const newItems = [...this.#items];
      newItems.splice(index, 0, ...shape.#items);
      return new Shapes(newItems);
    }
    const newItems = [...this.#items];
    newItems.splice(index, 0, shape);
    return new Shapes(newItems);
  }

  contains(shape: Shape): boolean {
    return this.#items.includes(shape);
  }

  remove(shape: Shape | Shapes): Shapes {
    if (shape instanceof Shapes) {
      return new Shapes(this.#items.filter(item => !shape.contains(item)));
    }
    return new Shapes(this.#items.filter(item => item !== shape));
  }

  each(callback: (item: Shape) => void) {
    this.#items.forEach(callback)
  }

  map<U>(callback: (item: Shape, index: number) => U): U[] {
    return this.#items.map(callback)
  }

  some<U>(callback: (item: Shape) => U): boolean {
    return this.#items.some(callback)
  }

  filter(callback: (item: Shape) => boolean): Shapes {
    return new Shapes(this.#items.filter(callback));
  }

  indexOf(item: Shape): number {
    return this.#items.indexOf(item)
  }

  moveTo(pos: Position): Shapes {
    return new Shapes(moveBoxes(pos, this.#items) as Shape[]);
  }

  resize(box: Box): Shapes {
    return new Shapes(resizeBoxes(box, this.#items) as Shape[]);
  }

  alignToTop(): Shapes {
    const minItem = findMinBy(this.#items, item => item.bbox.y);
    if (!minItem) return new Shapes([]);
    const y = minItem.bbox.y;
    const newItems = this.#items.map(item => item.moveTo({
      x: item.bbox.x,
      y
    }) as Shape);
    return new Shapes(newItems);
  }

  alignToBottom(): Shapes {
    const maxItem = findMaxBy(this.#items, item => item.bbox.y + item.bbox.height);
    if (!maxItem) return new Shapes([]);
    const y = maxItem.bbox.y + maxItem.bbox.height;
    const newItems = this.#items.map(item => item.moveTo({
      x: item.bbox.x,
      y: y - item.bbox.height
    }) as Shape);
    return new Shapes(newItems);
  }

  alignToLeft(): Shapes {
    const minItem = findMinBy(this.#items, item => item.bbox.x);
    if (!minItem) return new Shapes([]);
    const x = minItem.bbox.x;
    const newItems = this.#items.map(item => item.moveTo({
      x,
      y: item.bbox.y
    }) as Shape);
    return new Shapes(newItems);
  }

  alignToRight(): Shapes {
    const maxItem = findMaxBy(this.#items, item => item.bbox.x + item.bbox.width);
    if (!maxItem) return new Shapes([]);
    const x = maxItem.bbox.x + maxItem.bbox.width;
    const newItems = this.#items.map(item => item.moveTo({
      x: x - item.bbox.width,
      y: item.bbox.y
    }) as Shape);
    return new Shapes(newItems);
  }

  alignToMiddle(): Shapes {
    const maxItem = findMaxBy(this.#items, item => item.bbox.height);
    if (!maxItem) return new Shapes([]);
    const newItems = this.#items.map(item => item.moveTo({
      x: item.bbox.x,
      y: maxItem.bbox.y + (maxItem.bbox.height - item.bbox.height) / 2
    }) as Shape);
    return new Shapes(newItems);
  }

  alignToCenter(): Shapes {
    const maxItem = findMaxBy(this.#items, item => item.bbox.width);
    if (!maxItem) return new Shapes([]);
    const newItems = this.#items.map(item => item.moveTo({
      x: maxItem.bbox.x + (maxItem.bbox.width - item.bbox.width) / 2,
      y: item.bbox.y
    }) as Shape);
    return new Shapes(newItems);
  }

  distributeHorizontally(): Shapes {
    return this.distribute('x');
  }

  distributeVertically(): Shapes {
    return this.distribute('y');
  }

  private sortItemsBy(axis: 'x' | 'y'): Shape[] {
    return [...this.#items].sort((a, b) => a.bbox[axis] - b.bbox[axis]);
  }

  private distribute(axis: 'x' | 'y'): Shapes {
    const fullSize = this.bbox[axis === 'x' ? 'width' : 'height'];

    const sortedItems = this.sortItemsBy(axis);
    const totalSize = sortedItems.reduce((sum, item) => sum + item.bbox[axis === 'x' ? 'width' : 'height'], 0);
    const space = (sortedItems.length > 1) ? (fullSize - totalSize) / (sortedItems.length - 1) : 0;

    let pos = this.bbox[axis];

    const newItems = sortedItems.map(item => {
      const newPos = { x: item.bbox.x, y: item.bbox.y };
      newPos[axis] = pos;
      const newItem = item.moveTo(newPos) as Shape;
      pos += item.bbox[axis === 'x' ? 'width' : 'height'] + space;
      return newItem;
    });

    return new Shapes(newItems);
  }

  bringToFront(shape: Shape): Shapes {
    return new Shapes(bringToFront(shape, this.#items));
  }

  sendToBack(shape: Shape): Shapes {
    return new Shapes(sendToBack(shape, this.#items));
  }

  bringToForward(shape: Shape): Shapes {
    return new Shapes(bringToForward(shape, this.#items));
  }

  sendToBackward(shape: Shape): Shapes {
    return new Shapes(sendToBackward(shape, this.#items));
  }

  update(targets: Shapes, updated: Shapes): Shapes {
    if (targets.count !== updated.count) {
      throw new Error('targets and updated should be same count');
    }
    let self: Shapes = this;
    for (let i = 0; i < targets.count; i++) {
      self = self.updateShape(targets.get(i), updated.get(i));
    }
    return self;
  }

  updateShape(target: Shape, updated: Shape): Shapes {
    const list = [...this.#items];
    const index = list.indexOf(target);
    if (index !== -1) {
      list[list.indexOf(target)] = updated;
      return new Shapes(list);
    }
    const groups = this.filter(shape => shape.type === GroupShape || shape.type === ListShape);
    if (groups.count === 0) {
      return this;
    }
    groups.each(item => {
      const index = list.indexOf(item);
      const group = (item as Group);
      const shapes = group.shapes;
      const newShapes = shapes.updateShape(target, updated)
      if (newShapes !== shapes) {
        list[index] = group.set('shapes', newShapes);
      }
    });
    return new Shapes(list);
  }

  equals(other: Shapes): boolean {
    if (this.count !== other.count) {
      return false;
    }
    for (let i = 0; i < this.count; i++) {
      if (!this.get(i).equals(other.get(i))) {
        return false;
      }
    }
    return true;
  }

  getList(): List | undefined {
    return this.#items.find(item => item.type === ListShape) as List | undefined;
  }
}
