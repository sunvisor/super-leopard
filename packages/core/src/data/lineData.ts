import { LineConfigValue, LineShapeType } from '../object';
import { BorderData } from './borderData';

export type LineData = {
  type: LineShapeType,
  border?: BorderData;
} & LineConfigValue;
