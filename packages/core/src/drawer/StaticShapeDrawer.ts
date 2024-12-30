/**
 * StaticShapeDrawer
 *
 * Created by sunvisor on 2025/01/24.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { DrawerParams, ShapeDrawerInterface, StaticShapeDrawers } from './types';
import { Shape } from '../object';


export class StaticShapeDrawer implements ShapeDrawerInterface {

  constructor(
    private readonly shapeDrawers: StaticShapeDrawers
  ) {
  }

  draw(shape: Shape, params?: DrawerParams): void {
    if (!this.shapeDrawers[shape.type]) {
      throw new Error('Unsupported shape: ' + shape.type);
    }
    this.shapeDrawers[shape.type].draw(shape, params);
  }

}
