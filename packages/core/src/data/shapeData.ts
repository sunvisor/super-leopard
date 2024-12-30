import { CircleData, EllipseData, ImageData, LineData, RectData, TextData } from './index';
import { FieldData } from './fieldData';
import { ListData } from './listData';
import { GroupData } from './groupData';

export type StaticShapeData =
  CircleData | EllipseData | RectData | LineData | TextData | ImageData;
export type CompositeShapeData = GroupData;

export type ShapeData =
  StaticShapeData | FieldData | ListData | CompositeShapeData;

