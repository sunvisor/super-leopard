import { RectConfigValue, RectShapeType } from '../object';
import { BorderData } from './borderData';
import { ColorData } from './colorData';

export type RectData = {
  type: RectShapeType;
  border?: BorderData;
  fillColor?: ColorData;
} & RectConfigValue;
