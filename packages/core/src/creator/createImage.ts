/**
 * CreateImage
 *
 * Created by sunvisor on 2023/12/16.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Image, ImageShape } from '../object';
import { ImageData } from '../data';

export function createImage(data: ImageData): Image {
  const { type, ...rest } = data;

  if (type && type !== ImageShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  return new Image(rest);
}
