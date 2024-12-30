/**
 * EllipseSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeSelectorInterface } from './ShapeSelector';
import { boxIsInTheBox, Ellipse, Scale, Shape } from '../object';
import { Box, Position } from '../value';

export class EllipseSelector implements ShapeSelectorInterface {
  readonly #scale: Scale;

  constructor(scale: Scale) {
    this.#scale = scale;
  }

  inTheBox(box: Box, shape: Shape): boolean {
    const bbox = this.#scale.toPixel(shape.bbox);
    return boxIsInTheBox(bbox, box);
  }

  hitTest(pos: Position, shape: Shape): boolean {
    const ellipse = shape as Ellipse;
    const width = this.#scale.toPixel(ellipse.width);
    const height = this.#scale.toPixel(ellipse.height);
    const ellipsePos = this.#scale.toPixel({ x: ellipse.x, y: ellipse.y });
    const rx = width / 2;
    const ry = height / 2;
    const cx = ellipsePos.x + rx;
    const cy = ellipsePos.y + ry;
    const p = Math.pow((pos.x - cx), 2) / Math.pow(rx, 2)
      + Math.pow((pos.y - cy), 2) / Math.pow(ry, 2);

    return p <= 1;
  }
}
