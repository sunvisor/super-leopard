/**
 * CreateEllipse
 *
 * Ellipse object creator for RubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeCreatorInterface } from '.'
import { Scale, Shape, createEllipse, Position, positionsToBox } from '@sunvisor/super-leopard-core';
import { StylesData } from '../../style';

export class CreateEllipse implements ShapeCreatorInterface {
  readonly #scale: Scale;
  readonly #styles: StylesData;

  constructor({ scale, styles }: {
    scale: Scale,
    styles: StylesData
  }) {
    this.#scale = scale;
    this.#styles = styles;
  }

  create(start: Position, end: Position): Shape {
    const box = this.#scale.fromPixel(positionsToBox(start, end));
    const border = this.#styles.border;
    const fillColor = this.#styles.fillColor;

    return createEllipse({
      type: 'ellipse',
      ...box,
      border,
      fillColor,
    });
  }

}
