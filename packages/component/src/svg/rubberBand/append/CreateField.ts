/**
 * CreateField
 *
 * Field object creator for RubberBand
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeCreatorInterface } from '.';
import {
  Scale,
  Shape,
  Position,
  positionsToBox ,
  createField,
} from '@sunvisor/super-leopard-core';
import { StylesData } from '@/svg/style';

export class CreateField implements ShapeCreatorInterface {
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
    const font = this.#styles.font;

    return createField({
      name: 'field',
      type: 'field',
      shape: {
        type: 'text',
        x: box.x,
        y: box.y,
        text: 'Text',
        width: box.width,
        height: box.height,
        font,
      }
    });
  }

}
