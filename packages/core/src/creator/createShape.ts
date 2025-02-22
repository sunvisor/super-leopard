/**
 * CreateShape
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import {
  BarcodeShape,
  CircleShape,
  createBarcode,
  createCircle,
  createEllipse,
  createImage,
  createLine,
  createRect,
  createText,
  EllipseShape,
  Field,
  FieldShape,
  Group,
  GroupConfig,
  GroupShape,
  ImageShape,
  LineShape,
  List,
  ListShape,
  RectShape,
  Shape,
  Shapes,
  TextShape
} from "../object";
import {
  BarcodeData,
  CircleData,
  EllipseData,
  FieldData,
  GroupData,
  ImageData,
  LineData,
  ListData,
  RectData,
  ShapeData,
  StaticShapeData,
  TextData
} from '../data';

export function createShape(data: ShapeData): Shape {
  switch (data.type) {
    case FieldShape:
      return createField(data as FieldData);
    case GroupShape:
      return createGroup(data as GroupData);
    case ListShape:
      return createList(data as ListData);
    default:
      return createStaticShape(data as StaticShapeData);
  }
}

export function createStaticShape(data: StaticShapeData): Shape {
  switch (data.type) {
    case CircleShape:
      return createCircle(data as CircleData);
    case EllipseShape:
      return createEllipse(data as EllipseData);
    case RectShape:
      return createRect(data as RectData);
    case LineShape:
      return createLine(data as LineData);
    case TextShape:
      return createText(data as TextData);
    case ImageShape:
      return createImage(data as ImageData);
    case BarcodeShape:
      return createBarcode(data as BarcodeData);
    default:
      // @ts-expect-error Unknown type
      throw new Error(`Unknown shape type: ${data.type}`);
  }
}

export function createShapes(data: ShapeData[]): Shapes {
  const shapes = data.map(item => createShape(item));
  return new Shapes(shapes);
}

/**
 * Create Group from ShapeData
 */
export function createGroup(data: GroupData): Group {
  const { type, shapes, ...rest } = data;
  if (type && type !== GroupShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  return new Group({ shapes: createShapes(shapes), ...rest });
}

/**
 * Create Group from ShapeCollection object
 */
export function createGroupFromShapes(data: GroupConfig): Group {
  return new Group(data);
}

export function createField(data: FieldData) {
  const {name, shape} = data;
  return new Field(
    name,
    createStaticShape(shape),
  );
}

export function createList(data: ListData): List {
  const { shapes, ...rest } = data;

  return new List({
    shapes: createShapes(shapes),
    ...rest,
  });
}
