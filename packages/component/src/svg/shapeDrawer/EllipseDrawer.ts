/**
 * EllipseDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Svg } from '@svgdotjs/svg.js';
import { applyBorder, applyFillColor } from './applyStyle';
import {
  DrawerParams,
  Ellipse,
  EllipseDrawerInterface,
  Scale
} from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './types';

export class EllipseDrawer implements EllipseDrawerInterface {
  readonly #svg: Svg
  readonly #scale: Scale

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(ellipse: Ellipse, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const { x, y, width, height } = scale.toPixel(ellipse);
    const ellipseElement = this.#svg.ellipse(width, height).move(x, y);

    applyFillColor(ellipseElement, ellipse.fillColor, opacity);
    applyBorder(scale, ellipseElement, ellipse.border, opacity);
  }
}
