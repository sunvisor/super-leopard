/**
 * ExpandShape
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CirclePropertyValue, expandCircle } from './expandCircle';
import { EllipsePropertyValue, expandEllipse } from './expandEllipse';
import { expandImage, ImagePropertyValue } from './expandImage';
import { expandLine, LinePropertyValue } from './expandLine';
import { expandRect, RectPropertyValue } from './expandRect';
import { expandTextStyle, TextStyleValue } from './expandText';
import { Circle, Ellipse, Image, Line, Rect, Shape, Text } from '../object';

export type ShapePropertyValue =
  CirclePropertyValue |
  EllipsePropertyValue |
  LinePropertyValue |
  ImagePropertyValue |
  RectPropertyValue |
  TextStyleValue;

export function expandShape(shape: Shape): ShapePropertyValue {
  switch (shape.type) {
    case 'circle':
      return expandCircle(shape as Circle);
    case 'ellipse':
      return expandEllipse(shape as Ellipse);
    case 'line':
      return expandLine(shape as Line);
    case 'image':
      return expandImage(shape as Image);
    case 'rect':
      return expandRect(shape as Rect);
    case 'text':
      return expandTextStyle(shape as Text);
    default:
      throw new Error(`Unknown shape type: ${shape.type}`);
  }
}
