/**
 * FieldDesignDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ColorConfig, Field, Text, TextShape } from '../../object';
import { DrawerParams, FieldDrawerInterface, FieldDrawerParams, ShapeDrawerInterface } from '../types';
import { Box } from '../../value';
import createBoundingBox from '../creator/createBoundingBox';


export class FieldDesignDrawer implements FieldDrawerInterface {

  constructor(
    private readonly shapeDrawer: ShapeDrawerInterface,
    private readonly borderColor: ColorConfig,
  ) {
  }

  draw(field: Field, params: DrawerParams): void {
    this.drawRect(field.bbox, params)
    if (field.shape.type === TextShape) {
      this.drawText(field.shape as Text, field.name, params);
      return;
    }
    this.shapeDrawer.draw(field.shape, params);
  }

  private drawRect(box: Box, params: FieldDrawerParams) {
    const rect = createBoundingBox(box, this.borderColor);
    this.shapeDrawer.draw(rect, params);
  }

  private drawText(text: Text, name: string, params?: FieldDrawerParams) {
    const { opacity } = params ?? {};
    this.shapeDrawer.draw(text.set('text', name), { opacity });
  }

}
