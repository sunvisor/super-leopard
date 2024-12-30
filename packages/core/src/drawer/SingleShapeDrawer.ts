/**
 * SingleShapeDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { FieldDrawerInterface, FieldDrawerParams, ShapeDrawerInterface, SingleShapeDrawerInterface, } from './types';
import { Field, FieldShape, GroupShape, ListShape, Shape } from '../object';


export class SingleShapeDrawer implements SingleShapeDrawerInterface {

  constructor(
    private readonly shapeDrawer: ShapeDrawerInterface,
    private readonly fieldDrawer: FieldDrawerInterface
  ) {
  }

  draw(shape: Shape, params?: FieldDrawerParams): void {
    const { opacity } = params ?? {};
    switch (shape.type) {
      case FieldShape:
        this.fieldDrawer.draw(shape as Field, params);
        break;
      case GroupShape:
      case ListShape:
        throw new Error('Unsupported shape: ' + shape.type);
      default:
        return this.shapeDrawer.draw(shape, { opacity });
    }
  }

}
