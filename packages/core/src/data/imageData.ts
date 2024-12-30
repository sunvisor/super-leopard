import { ImageConfig, ImageShapeType } from '../object';

export type ImageData = {
  type: ImageShapeType;
} & ImageConfig;
