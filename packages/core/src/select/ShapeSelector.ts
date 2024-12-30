import { Box, Position } from '../value';
import { Scale, Shape, ShapeType } from '../object';
import { RectSelector } from './RectSelector';
import { CircleSelector } from './CircleSelector';
import { EllipseSelector } from './EllipseSelector';
import { LineSelectOptions, LineSelector } from './LineSelector';

type ShapeSelectors = Record<ShapeType, ShapeSelectorInterface>

export type ShapeSelectorInterface = {
  /**
   * Checks if the given shape is inside the specified box.
   *
   * @param {Box} box - the box to check against
   * @param {Shape} shape - the shape to check
   * @return {boolean} true if the shape is inside the box, false otherwise
   */
  inTheBox(box: Box, shape: Shape): boolean;

  /**
   * Check if the given position hits the specified shape.
   *
   * @param {Position} pos - the position to check
   * @param {Shape} shape - the shape to check against
   * @return {boolean} true if the position is inside the shape's bounding box, false otherwise
   */
  hitTest(pos: Position, shape: Shape): boolean;
}

/**
 * ShapeSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
class ShapeSelector implements ShapeSelectorInterface {
  readonly #selectors: ShapeSelectors;

  constructor(selectors: ShapeSelectors) {
    this.#selectors = selectors;
  }

  inTheBox(box: Box, shape: Shape): boolean {
    return this.#selectors[shape.type].inTheBox(box, shape);
  }

  hitTest(pos: Position, shape: Shape): boolean {
    return this.#selectors[shape.type].hitTest(pos, shape);
  }

}

export function createShapeSelector(scale: Scale, options: LineSelectOptions): ShapeSelectorInterface {
  return new ShapeSelector(createShapeSelectors(scale, options));
}

function createShapeSelectors(scale: Scale, options: LineSelectOptions): ShapeSelectors {
  const rectSelector = new RectSelector(scale);
  return {
    circle: new CircleSelector(scale),
    ellipse: new EllipseSelector(scale),
    line: new LineSelector(scale, options),
    image: rectSelector,
    text: rectSelector,
    rect: rectSelector,
    group: rectSelector,
    list: rectSelector,
    field: rectSelector,
  };
}
