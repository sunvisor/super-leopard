import { Scale, Shape, Shapes } from '../object';
import { Box, Position } from '../value';
import { createShapeSelector, ShapeSelectorInterface } from './ShapeSelector';
import { LineSelectOptions } from './LineSelector';

/**
 * ShapesSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
class ShapesSelector {
  readonly #shapeSelector: ShapeSelectorInterface;

  constructor(shapeSelector: ShapeSelectorInterface) {
    this.#shapeSelector = shapeSelector;
  }

  /**
   * Selects shapes from the targetShapes array based on the given position.
   * @param pos - The position by pixel coordinate
   * @param targetShapes - The target shapes array
   * @returns - A new Shapes array containing the selected shape, or an empty array if no shape is found
   */
  selectByPosition(pos: Position, targetShapes: Shapes): Shapes {
    for (let index = targetShapes.count - 1; index >= 0; index--) {
      const item = targetShapes.get(index);
      if (this.hitText(item, pos)) {
        return new Shapes([item]);
      }
    }
    return new Shapes([]);
  }

  /**
   * Selects shapes from the targetShapes that are within the specified box.
   *
   * @param {Box} box - the box to check against
   * @param {Shapes} targetShapes - the shapes to filter
   * @return {Shapes} a new Shapes instance containing the selected shapes
   */
  selectByBox(box: Box, targetShapes: Shapes): Shapes {
    const resultItems: Shape[] = [];
    targetShapes.each(shape => {
      if (this.inTheBox(shape, box)) {
        resultItems.push(shape);
      }
    });
    return new Shapes(resultItems);
  }

  hitText(shape: Shape, pos: Position): boolean {
    return this.#shapeSelector.hitTest(pos, shape);
  }

  inTheBox(shape: Shape, box: Box): boolean {
    return this.#shapeSelector.inTheBox(box, shape);
  }
}

export function createShapesSelector(scale: Scale, options: LineSelectOptions): ShapesSelector {
  return new ShapesSelector(createShapeSelector(scale, options));
}
