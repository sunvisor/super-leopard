import { contractCircle } from '../contractor';
import { contractEllipse } from '../contractor';
import { contractImage } from '../contractor';
import { contractLine } from '../contractor';
import { contractRect } from '../contractor';
import { contractText } from '../contractor';
import { CirclePropertyValue } from '../expander';
import { EllipsePropertyValue } from '../expander';
import { ImagePropertyValue } from '../expander';
import { LinePropertyValue } from '../expander';
import { RectPropertyValue } from '../expander';
import { ShapePropertyValue } from '../expander';
import { TextPropertyValue } from '../expander';
import {
  CircleShape,
  EllipseShape,
  ImageShape,
  LineShape,
  RectShape,
  Shape,
  StaticShapeType,
  TextShape
} from '../object';

/**
 * ContractShape
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
export function contractStaticShape(type: StaticShapeType, values: ShapePropertyValue): Shape {
  switch (type) {
    case CircleShape:
      return contractCircle(values as CirclePropertyValue);
    case EllipseShape:
      return contractEllipse(values as EllipsePropertyValue);
    case LineShape:
      return contractLine(values as LinePropertyValue);
    case RectShape:
      return contractRect(values as RectPropertyValue);
    case TextShape:
      return contractText(values as TextPropertyValue);
    case ImageShape:
      return contractImage(values as ImagePropertyValue);
  }
}
