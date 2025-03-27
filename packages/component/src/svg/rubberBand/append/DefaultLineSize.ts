/**
 * DefaultLineSize
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Size, Scale } from '@sunvisor/super-leopard-core';
import { DefaultShapeSizeInterface, DefaultSizeParams } from '.';
import { DefaultShapeSize } from '@/settings';

export class DefaultLineSize implements DefaultShapeSizeInterface {
  readonly #scale: Scale;
  readonly #defaultSize: DefaultShapeSize;

  constructor(params: DefaultSizeParams) {
    this.#scale = params.scale;
    this.#defaultSize = params.defaultSize;
  }

  size(): Size {
    const size = this.#defaultSize;
    return {
      width: this.#scale.pointToPixel(size.width),
      height: this.#scale.pointToPixel(0),
    }
  }
}
