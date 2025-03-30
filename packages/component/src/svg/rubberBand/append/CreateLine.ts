/**
 * CreateLine
 *
 * Line object creator for RubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeCreatorInterface } from '.';
import { StylesData } from '@/svg/style';
import { createLine, Position, Scale, Shape } from '@sunvisor/super-leopard-core';

export class CreateLine implements ShapeCreatorInterface {
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
    const pp = this.#scale.fromPixel({
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    });
    const border = this.#styles.border;

    return createLine({
      type: 'line',
      ...pp,
      border,
    });
  }
}
