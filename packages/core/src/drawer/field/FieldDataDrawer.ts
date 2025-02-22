/**
 * FieldDataDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { DrawerParams, FieldDrawerInterface, FieldDrawerParams, StaticShapeDrawerInterface } from '../types';
import { FieldValueType, getValue } from '../../data';
import { Barcode, BarcodeShape, Field, Text, TextShape } from '../../object';


export class FieldDataDrawer implements FieldDrawerInterface {

  constructor(
    private readonly shapeDrawer: StaticShapeDrawerInterface,
  ) {
  }

  draw(field: Field, params: FieldDrawerParams): void {
    const { values, opacity } = params;
    if (!values) {
      throw new Error('values is required');
    }
    const value = getValue(values, field);
    if (field.shape.type === TextShape) {
      this.drawText(field.shape as Text, value, { opacity });
      return;
    }
    if (field.shape.type === BarcodeShape) {
      if (typeof value !== 'string') {
        return;
      }
      const barcode = (field.shape as Barcode).set('value', value);
      this.shapeDrawer.draw(barcode, { opacity });
    }
    if (value) {
      this.shapeDrawer.draw(field.shape, { opacity });
    }
  }

  private drawText(shape: Text, value: FieldValueType, options?: DrawerParams) {
    const text = shape.set('text', value ?? '');
    this.shapeDrawer.draw(text, options);
  }
}
