import { FieldData } from './fieldData';
import { ListData } from './listData';
import { GroupData } from './groupData';
import { CircleData } from './circleData';
import { EllipseData } from './ellipseData';
import { RectData } from './rectData';
import { LineData } from './lineData';
import { ImageData } from './imageData';
import { TextData } from './textData';
import { BarcodeData } from './barcodeData';

export type StaticShapeData =
  CircleData | EllipseData | RectData | LineData | TextData | ImageData | BarcodeData;
export type CompositeShapeData = GroupData;

export type ShapeData =
  StaticShapeData | FieldData | ListData | CompositeShapeData;

