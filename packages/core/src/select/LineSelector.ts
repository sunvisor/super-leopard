/**
 * LineSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeSelectorInterface } from './ShapeSelector';
import { boxIsInTheBox, Line, Scale, Shape } from '../object';
import { Box, Position } from '../value';

export type LineSelectOptions = {
  minTolerance: number;
}

export class LineSelector implements ShapeSelectorInterface {

  readonly #scale: Scale;
  readonly #minTolerance: number;

  constructor(scale: Scale, options: LineSelectOptions) {
    this.#minTolerance = options.minTolerance;
    this.#scale = scale;
  }

  inTheBox(box: Box, shape: Shape): boolean {
    const bbox = this.#scale.toPixel(shape.bbox);
    return boxIsInTheBox(bbox, box);
  }

  hitTest(pos: Position, shape: Shape): boolean {
    const line = shape as Line;
    const tolerance = this.getTolerance(line);
    const { x1, y1, x2, y2 } = this.#scale.toPixel(line.positions);

    if (x1 === x2) {
      return withinTolerance(x1, pos.x, tolerance) && within(pos.y, y1, y2);
    }
    if (y1 === y2) {
      return withinTolerance(y1, pos.y, tolerance) && within(pos.x, x1, x2);
    }
    const slope = (y2 - y1) / (x2 - x1);
    const expectedY = slope * (pos.x - x1) + y1;

    return withinTolerance(expectedY, pos.y, tolerance) && within(pos.x, x1, x2);
  }

  private getTolerance(line: Line): number {
    const lineWidth = this.#scale.pointToPixel(line.border?.width / 2);
    const minTolerance = this.#minTolerance;
    return lineWidth > minTolerance ? lineWidth : minTolerance;
  }
}

/**
 * Check if a value is within a specified range.
 *
 * @param {number} value - the value to check
 * @param {number} from - the start of the range
 * @param {number} to - the end of the range
 * @return {boolean} true if the value is within the range, false otherwise
 */
function within(value: number, from: number, to: number): boolean {
  if (from > to) {
    return value >= to && value <= from;
  }
  return value >= from && value <= to;
}

/**
 * Checks if the actual value is within the expected value with a given tolerance.
 *
 * @param {number} actual - The actual value to compare.
 * @param {number} expected - The expected value for comparison.
 * @param {number} tolerance - The tolerance value for the comparison.
 * @return {boolean} Returns true if the actual value is within the expected value with the given tolerance, otherwise false.
 */
function withinTolerance(actual: number, expected: number, tolerance: number): boolean {
  return Math.abs(expected - actual) <= tolerance;
}
