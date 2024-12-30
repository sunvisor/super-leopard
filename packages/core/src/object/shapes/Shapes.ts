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
    let newY = Infinity;
    this.each(item => {
      newY = Math.min(item.bbox.y, newY);
    });
    const newItems: Shape[] = this.#items.map(item => {
      return item.moveTo({
        x: item.bbox.x,
        y: newY
      }) as Shape;
    });
    return new Shapes(newItems);
  }

  alignToBottom(): Shapes {
    let newY = -Infinity;
    this.each(item => {
      newY = Math.max(item.bbox.y + item.bbox.height, newY);
    });
    const newItems: Shape[] = this.#items.map(item => {
      return item.moveTo({
        x: item.bbox.x,
        y: newY - item.bbox.height
      }) as Shape;
    });
    return new Shapes(newItems);
  }

  alignToMiddle(): Shapes {
    let maxHeight = -Infinity;
    this.each(item => {
      maxHeight = Math.max(item.bbox.height, maxHeight);
    });
    const maxHeightShape = this.#items.find(item => item.bbox.height === maxHeight);
    const y = maxHeightShape!.bbox.y;
    const newItems: Shape[] = this.#items.map(item => {
      const newY = y + (maxHeight - item.bbox.height) / 2;
      return item.moveTo({
        x: item.bbox.x,
        y: newY,
      }) as Shape;
    });
    return new Shapes(newItems);
  }

  alignToLeft(): Shapes {
    let newX = Infinity;
    this.each(item => {
      newX = Math.min(item.bbox.x, newX);
    });
    const newItems: Shape[] = this.#items.map(item => {
      return item.moveTo({
        x: newX,
        y: item.bbox.y
      }) as Shape;
    });
    return new Shapes(newItems);
  }

  alignToRight(): Shapes {
    let newX = -Infinity;
    this.each(item => {
      newX = Math.max(item.bbox.x + item.bbox.width, newX);
    });
    const newItems: Shape[] = this.#items.map(item => {
      return item.moveTo({
        x: newX - item.bbox.width,
        y: item.bbox.y
      }) as Shape;
    });
    return new Shapes(newItems);
  }

  alignToCenter(): Shapes {
    let maxWidth = -Infinity;
    this.each(item => {
      maxWidth = Math.max(item.bbox.width, maxWidth);
    });
    const maxWidthShape = this.#items.find(item => item.bbox.width === maxWidth);
    const x = maxWidthShape!.bbox.x;
    const newItems: Shape[] = this.#items.map(item => {
      const newX = x + (maxWidth - item.bbox.width) / 2;
      return item.moveTo({
        x: newX,
        y: item.bbox.y
      }) as Shape;
    });
    return new Shapes(newItems);
  }

  distributeHorizontally(): Shapes {
    const fullWidth = this.bbox.width;
    let width = 0;
    this.each(item => {
      width += item.bbox.width;
    });
    const space = (fullWidth - width) / (this.#items.length - 1);
    let x = this.bbox.x;
    const newItems: Shape[] = this.#items.map((item) => {
      const newItem = item.moveTo({
        x: x,
        y: item.bbox.y
      }) as Shape;
      x += space + item.bbox.width;
      return newItem;
    });
    return new Shapes(newItems);
  }

  distributeVertically(): Shapes {
    const fullHeight = this.bbox.height;
    let height = 0;
    this.each(item => {
      height += item.bbox.height;
    });
    const space = (fullHeight - height) / (this.#items.length - 1);
    let y = this.bbox.y;
    const newItems: Shape[] = this.#items.map((item) => {
      const newItem = item.moveTo({
        x: item.bbox.x,
        y: y
      }) as Shape;
      y += space + item.bbox.height;
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
