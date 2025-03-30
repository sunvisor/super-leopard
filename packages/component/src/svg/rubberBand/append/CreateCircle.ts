/**
 * CreateCircle
 *
 * Circle object creator for RubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Position, positionsToBox, Shape, createCircle, Scale } from '@sunvisor/super-leopard-core';
import { ShapeCreatorInterface } from '.';
import { StylesData } from '@/svg/style';

export class CreateCircle implements ShapeCreatorInterface {
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

    return createCircle({
      type: 'circle',
      x: box.x,
      y: box.y,
      diameter: Math.min(box.width, box.height),
      border,
      fillColor,
    });
  }
}
