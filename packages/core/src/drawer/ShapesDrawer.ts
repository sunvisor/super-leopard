/**
 * ShapesDrawer
 *
 * Abstract drawer for shapes
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Group, GroupShape, List, ListShape, Shape, Shapes } from '../object';
import {
  DataParams,
  GroupDrawerInterface,
  ListDrawerInterface,
  ShapesDrawerInterface,
  SingleShapeDrawerInterface
} from './types';


export class ShapesDrawer implements ShapesDrawerInterface {

  constructor(
    private readonly shapeDrawer: SingleShapeDrawerInterface,
    private readonly groupDrawer: GroupDrawerInterface,
    private readonly listDrawer: ListDrawerInterface,
  ) {
  }

  draw(shapes: Shapes, params?: DataParams) {
    shapes.each((shape: Shape) => {
      this.drawShape(shape, params);
    });
  }

  drawShape(shape: Shape, params?: DataParams) {
    const { values = {}, ...listData } = params || {};

    switch (shape.type) {
      case ListShape:
        this.listDrawer.draw(shape as List, listData);
        break;
      case GroupShape:
        this.groupDrawer.draw(shape as Group, { values });
        break;
      default:
        this.shapeDrawer.draw(shape, { values });
    }
  }
}
