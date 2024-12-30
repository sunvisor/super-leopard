/**
 * RectDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Svg } from '@svgdotjs/svg.js';
import { applyBorder, applyFillColor } from './applyStyle';
import {
  DrawerParams,
  Rect,
  RectDrawerInterface,
  Scale
} from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './types';

export class RectDrawer implements RectDrawerInterface {
  readonly #svg: Svg;
  readonly #scale: Scale;

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(rect: Rect, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const { x, y, width, height } = scale.toPixel(rect);
    const rectElement = this.#svg.rect(width, height).move(x, y);

    applyFillColor(rectElement, rect.fillColor, opacity);
    applyBorder(scale, rectElement, rect.border, opacity);
  }
}
