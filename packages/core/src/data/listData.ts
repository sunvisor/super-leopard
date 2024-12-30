import { ListConfigValue, ListShapeType } from '../object';
import { ShapeData } from './shapeData';

export type ListData = ListConfigValue & {
  type: ListShapeType;
  shapes: ShapeData[];
}
