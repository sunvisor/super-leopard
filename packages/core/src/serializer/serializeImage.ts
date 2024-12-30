import { ImageData } from '../data';
import { Image, ImageShape } from '../object';

/**
 * SerializeImage
 *
 * Created by sunvisor on 2023/12/16.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function serializeImage(image: Image): ImageData {
  return {
    type: ImageShape,
    x: image.x,
    y: image.y,
    src: image.src,
    width: image.width,
    height: image.height,
  };
}
