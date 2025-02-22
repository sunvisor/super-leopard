import { CircleConfigValue, CircleShapeType } from '../object';
import { BorderData } from './borderData';
import { ColorData } from './colorData';

export type CircleData = {
  type?: CircleShapeType;
  border?: BorderData;
  fillColor?: ColorData;
} & CircleConfigValue;
