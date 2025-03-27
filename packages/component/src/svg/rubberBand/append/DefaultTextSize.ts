/**
 * DefaultTextSize
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Size, Scale } from '@sunvisor/super-leopard-core';
import { DefaultShapeSizeInterface, DefaultSizeParams } from '.';
import { DefaultShapeSize } from '@/settings';
import { StylesData } from '@/svg/style';

export class DefaultTextSize implements DefaultShapeSizeInterface {
  readonly #scale: Scale;
  readonly #styles: StylesData;
  readonly #defaultSize: DefaultShapeSize;

  constructor(params: DefaultSizeParams) {
    this.#scale = params.scale;
    this.#styles = params.styles!;
    this.#defaultSize = params.defaultSize;
  }

  size(): Size {
    const size = this.#defaultSize;
    const font = this.#styles.font;
    return {
      width: this.#scale.pointToPixel(size.width),
      height: this.#scale.pointToPixel(font.size * 1.2),
    }
  }
}
