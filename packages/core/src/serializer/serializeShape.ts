import {
  Circle,
  CircleShape,
  Ellipse,
  EllipseShape,
  Field,
  FieldShape,
  Group,
  GroupShape,
  Image,
  ImageShape,
  Line,
  LineShape,
  List,
  ListShape,
  Rect,
  RectShape,
  Shape,
  Shapes,
  Text,
  TextShape
} from "../object";
import { FieldData, GroupData, ListData, ShapeData, StaticShapeData } from "../data";
import { serializeCircle } from './serializeCircle';
import { serializeEllipse } from './serializeEllipse';
import { serializeRect } from './serializeRect';
import { serializeLine } from './serializeLine';
import { serializeText } from './serializeText';
import { serializeImage } from './serializeImage';

/**
 * SerializeShape
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function serializeShape(shape: Shape): ShapeData {
  switch (shape.type) {
    case CircleShape:
      return serializeCircle(shape as Circle);
    case EllipseShape:
      return serializeEllipse(shape as Ellipse)
    case RectShape:
      return serializeRect(shape as Rect);
    case LineShape:
      return serializeLine(shape as Line);
    case TextShape:
      return serializeText(shape as Text);
    case ImageShape:
      return serializeImage(shape as Image);
    case GroupShape:
      return serializeGroup(shape as Group);
    case FieldShape:
      return serializeField(shape as Field);
    case ListShape:
      return serializeList(shape as List);
    default:
      throw new Error(`Unknown shape type: ${shape.type}`);
  }
}

export function serializeGroup(group: Group): GroupData {
  const { shapes, ...rest } = group.config;
  return {
    type: group.type,
    shapes: serializeShapes(group.shapes),
    ...rest,
  }
}

export function serializeShapes(shapes: Shapes): ShapeData[] {
  return shapes.map(item => serializeShape(item));
}

export function serializeField(field: Field): FieldData {
  return {
    name: field.name,
    type: field.type,
    shape: serializeShape(field.shape) as StaticShapeData,
  };
}

export function serializeList(list: List): ListData {
  const { shapes, ...rest } = list.config;
  return {
    type: list.type,
    ...rest,
    shapes: serializeShapes(list.shapes),
  };
}
