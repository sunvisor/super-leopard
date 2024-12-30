import { EllipseConfigValue, EllipseShapeType } from '../object';
import { BorderData } from './borderData';
import { ColorData } from './colorData';

export type EllipseData = {
  type: EllipseShapeType;
  border?: BorderData;
  fillColor?: ColorData;
} & EllipseConfigValue;
