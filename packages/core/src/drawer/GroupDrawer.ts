/**
 * GroupDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Group, GroupShape, ListShape, Shape, Shapes } from '../object';
import { FieldDrawerParams, GroupDrawerInterface, SingleShapeDrawerInterface } from './types';


export class GroupDrawer implements GroupDrawerInterface {

  constructor(
    private readonly drawer: SingleShapeDrawerInterface
  ) {
  }

  draw(group: Group, params?: FieldDrawerParams): void {
    const shapes = group.shapes;
    let x = group.bbox.x;
    let y = group.bbox.y;

    Array.from({ length: group.repeatCount }, () => {
      this.drawShapes(shapes, x, y, params);
      if (group.direction === 'horizontal') {
        x += group.width;
      }
      if (group.direction === 'vertical') {
        y += group.height;
      }
    });
  }

  private drawShapes(shapes: Shapes, x: number, y: number, params: FieldDrawerParams): void {
    const items = shapes.moveTo({ x, y });
    items.each((item: Shape) => {
      if (item.type === ListShape) {
        throw new Error('List is not allowed in Group.');
      }
      this.drawShape(item, params);
    });
  }

  private drawShape(shape: Shape, params: FieldDrawerParams): void {
    if (shape.type === GroupShape) {
      this.draw(shape as Group, params);
      return;
    }
    this.drawer.draw(shape, params);
  }

}
