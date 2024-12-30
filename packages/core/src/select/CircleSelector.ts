/**
 * CircleSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeSelectorInterface } from './ShapeSelector';
import { boxIsInTheBox, Circle, Scale, Shape } from '../object';
import { Box, Position } from '../value';

export class CircleSelector implements ShapeSelectorInterface {
  readonly #scale: Scale;

  constructor(scale: Scale) {
    this.#scale = scale;
  }

  inTheBox(box: Box, shape: Shape): boolean {
    const bbox = this.#scale.toPixel(shape.bbox);
    return boxIsInTheBox(bbox, box);
  }

  hitTest(pos: Position, shape: Shape): boolean {
    const circle = shape as Circle;
    const circlePos = this.#scale.toPixel({ x: circle.x, y: circle.y });
    const radius = this.#scale.toPixel(circle.radius);
    const cx = circlePos.x + radius;
    const cy = circlePos.y + radius;
    const distance = Math.sqrt((pos.x - cx) ** 2 + (pos.y - cy) ** 2);

    return distance <= radius;
  }
}
