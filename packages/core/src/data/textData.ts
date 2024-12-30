import { TextConfigValues, TextShapeType } from '../object';
import { FontData } from './fontData';
import { ColorData } from './colorData';

export type TextData = {
  type: TextShapeType;
  font: FontData;
  color?: ColorData;
  fillColor?: ColorData;
} & TextConfigValues;
