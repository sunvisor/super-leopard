import { ShapeCreatorInterface } from './index';
import {
  createBarcode,
  Position,
  positionsToBox,
  sampleBarcodeValues,
  Scale,
  Shape
} from '@sunvisor/super-leopard-core';
import { StylesData } from '@/svg/style';

/**
 * CreateBarcode
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export class CreateBarcode implements ShapeCreatorInterface {
  readonly #scale: Scale;

  constructor({ scale }: {
    scale: Scale,
    styles: StylesData
  }) {
    this.#scale = scale;
  }

  create(start: Position, end: Position): Shape {
    const box = this.#scale.fromPixel(positionsToBox(start, end));

    return createBarcode({
      type: 'barcode',
      ...box,
      format: 'code128',
      value: sampleBarcodeValues.code128,
    });
  }
}
