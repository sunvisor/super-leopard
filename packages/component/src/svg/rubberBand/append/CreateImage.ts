/**
 * CreateImage
 *
 * Image object creator for RubberBand
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeCreatorInterface } from '.';
import { createImage, Position, positionsToBox, Scale, Shape } from '@sunvisor/super-leopard-core';


export class CreateImage implements ShapeCreatorInterface {
  readonly #scale: Scale;

  constructor({ scale }: {
    scale: Scale,
  }) {
    this.#scale = scale;
  }

  create(start: Position, end: Position): Shape {
    const box = this.#scale.fromPixel(positionsToBox(start, end));

    return createImage({
      type: 'image',
      ...box,
      src: '',
    });
  }
}
