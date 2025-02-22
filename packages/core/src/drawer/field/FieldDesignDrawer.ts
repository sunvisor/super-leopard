/**
 * FieldDesignDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Field, Text, TextShape } from '../../object';
import { DrawerParams, FieldDrawerInterface, FieldDrawerParams, ShapeDrawerInterface } from '../types';
import { Box } from '../../value';
import createBoundingBox from '../creator/createBoundingBox';
import { ColorData } from '../../data';


export class FieldDesignDrawer implements FieldDrawerInterface {

  constructor(
    private readonly shapeDrawer: ShapeDrawerInterface,
    private readonly borderColor: ColorData,
  ) {
  }

  draw(field: Field, params: DrawerParams): void {
    if (field.shape.type === TextShape) {
      this.drawText(field.shape as Text, field.name, params);
    } else {
      this.shapeDrawer.draw(field.shape, params);
    }
    this.drawRect(field.bbox, params)
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
