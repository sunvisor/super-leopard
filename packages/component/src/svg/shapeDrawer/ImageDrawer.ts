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
import { GetSvgImagePath } from '../index';
import { ImageDrawerProps } from './types';
import { SvgDrawerInterface } from '../../svgDriver';

export default class ImageDrawer implements ImageDrawerInterface {

  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;
  readonly #getImagePath: GetSvgImagePath;

  constructor({ svg, scale, getImagePath }: ImageDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
    this.#getImagePath = getImagePath
  }

  draw(image: Image, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const { x, y, width, height } = scale.toPixel(image);
    const imagePath = this.#getImagePath(image.src)

    this.#svg.image({
      x, y, width, height,
      src: imagePath,
      opacity
    });
  }
}
