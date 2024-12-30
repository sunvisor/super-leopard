/**
 * ExpandImage
 *
 * Created by sunvisor on 2024/02/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Image } from '../object';

export type ImagePropertyValue = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
};

export function expandImage(image: Image): ImagePropertyValue {
  return {
    x: image.x,
    y: image.y,
    width: image.width,
    height: image.height,
    src: image.src
  }
}
