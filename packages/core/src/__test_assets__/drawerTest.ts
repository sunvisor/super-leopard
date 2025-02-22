/**
 * TestUtils for drawer
 *
 * Created by sunvisor on 2025/01/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeShape, CircleShape, EllipseShape, ImageShape, LineShape, RectShape, TextShape } from '../object';
import { ShapeDrawerInterface } from '../drawer';
import { BarcodeData, FieldData, ListData, RectData, TextData } from '../data';


function createMockDrawer(): ShapeDrawerInterface {
  return {
    draw: vi.fn(),
  };
}

const rectDrawer = createMockDrawer();
const lineDrawer = createMockDrawer();
const circleDrawer = createMockDrawer();
const ellipseDrawer = createMockDrawer();
const textDrawer = createMockDrawer();
const imageDrawer = createMockDrawer();
const barcodeDrawer = createMockDrawer();

export const mockShapeDrawers = {
  [RectShape]: rectDrawer,
  [LineShape]: lineDrawer,
  [CircleShape]: circleDrawer,
  [EllipseShape]: ellipseDrawer,
  [TextShape]: textDrawer,
  [ImageShape]: imageDrawer,
  [BarcodeShape]: barcodeDrawer,
};


export const textFieldData: FieldData<TextData> = {
  type: 'field',
  name: 'myField',
  shape: {
    type: 'text',
    x: 1,
    y: 2,
    width: 100,
    height: 200,
    font: {
      family: 'Arial',
      size: 12,
    }
  }
}

export const barcodeFieldData: FieldData<BarcodeData> = {
  type: 'field',
  name: 'myField',
  shape: {
    type: 'barcode',
    x: 1,
    y: 2,
    width: 100,
    height: 200,
    format: 'qr',
  }
}

export const rectFieldData: FieldData<RectData> = {
  type: 'field',
  name: 'myField',
  shape: {
    type: 'rect',
    x: 1,
    y: 2,
    width: 100,
    height: 200,
    fillColor: '#ff0000',
  }
}

export const fieldData: FieldData<TextData> = {
  type: 'field',
  name: 'myField',
  shape: {
    type: 'text',
    x: 2,
    y: 1,
    width: 50,
    height: 8,
    color: '#000000',
    font: {
      family: 'Helvetica',
      size: 12,
    }
  }
}

export const listData: ListData = {
  type: 'list',
  width: 100,
  height: 10,
  rows: 10,
  columns: 1,
  direction: 'vertical',
  shapes: [fieldData],
};

export const listWithGroupData: ListData = {
  type: 'list',
  width: 100,
  height: 10,
  rows: 10,
  columns: 1,
  direction: 'vertical',
  shapes: [
    fieldData,
    {
      type: 'group',
      direction: 'horizontal',
      repeatCount: 2,
      shapes: [{
        type: 'rect',
        x: 0,
        y: 0,
        width: 100,
        height: 10,
      }],
    }
  ],
};

