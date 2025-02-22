import { FieldShapeType } from '../object';
import { StaticShapeData } from './shapeData';

export type FieldData<T = StaticShapeData> = {
  name: string;
  type?: FieldShapeType;
  shape: T;
};
