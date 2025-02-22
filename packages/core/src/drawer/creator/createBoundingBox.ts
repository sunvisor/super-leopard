/**
 * CreateBoundingBox
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createRect, Rect } from '../../object';
import { Box } from '../../value';
import { ColorData } from '../../data';


export default function createBoundingBox(box: Box, borderColor: ColorData): Rect {
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
