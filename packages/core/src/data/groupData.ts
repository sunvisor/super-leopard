import { GroupConfigValue, GroupShapeType } from '../object';
import { ShapeData } from './shapeData';

export type GroupData = {
  type?: GroupShapeType;
  shapes: ShapeData[];
} & GroupConfigValue;
