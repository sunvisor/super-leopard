/**
 * ContractImage
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ImagePropertyValue } from '../expander';
import { ImageShape } from '../object';
import { createImage } from '../creator';
import { ImageData} from '../data';

export function contractImage(values: ImagePropertyValue) {
  const data: ImageData = {
    type: ImageShape,
    x: values.x,
    y: values.y,
    width: values.width,
    height: values.height,
    src: values.src
  }
  return createImage(data);
}
