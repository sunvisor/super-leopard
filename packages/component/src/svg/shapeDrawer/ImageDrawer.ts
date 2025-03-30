/**
 * ImageDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import {
  DrawerParams,
  Image,
  ImageDrawerInterface,
  Scale
} from '@sunvisor/super-leopard-core';
import { GetImageUrl } from '@/settings';
import { ImageDrawerProps } from './types';
import { SvgDrawerInterface } from '@/svgDriver';

export class ImageDrawer implements ImageDrawerInterface {

  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;
  readonly #getImageUrl: GetImageUrl;
  readonly #noImageUrl: string;

  constructor({ svg, scale, imageOptions }: ImageDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
    this.#getImageUrl = imageOptions.getImageUrl
    this.#noImageUrl = imageOptions.noImageUrl;
  }

  draw(image: Image, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const { x, y, width, height } = scale.toPixel(image);
    const url = image.src.length ? this.#getImageUrl(image.src) : this.#noImageUrl;

    this.#svg.image({
      x, y, width, height,
      src: url,
      opacity
    });
  }
}
