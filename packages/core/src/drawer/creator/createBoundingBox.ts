/**
 * CreateBoundingBox
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ColorConfig, Rect } from '../../object';
import { createRect } from '../../creator';
import { Box } from '../../value';


export default function createBoundingBox(box: Box, borderColor: ColorConfig): Rect {
  return createRect({
    type: 'rect',
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    border: {
      color: borderColor,
      width: 1,
    }
  });
}
