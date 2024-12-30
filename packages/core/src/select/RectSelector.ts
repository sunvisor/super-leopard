/**
 * RectSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeSelectorInterface } from './ShapeSelector';
import { boxIsInTheBox, positionIsInTheBox, Scale, Shape } from '../object';
import { Box, Position } from '../value';

export class RectSelector implements ShapeSelectorInterface {

  readonly #scale: Scale;

  constructor(scale: Scale) {
    this.#scale = scale;
  }

  inTheBox(box: Box, shape: Shape): boolean {
    const bbox = this.#scale.toPixel(shape.bbox);
    return boxIsInTheBox(bbox, box);
  }

  hitTest(pos: Position, shape: Shape): boolean {
    const bbox = this.#scale.toPixel(shape.bbox);
    return positionIsInTheBox(pos, bbox);
  }
}
