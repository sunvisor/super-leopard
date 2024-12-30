/**
 * CircleDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Svg } from '@svgdotjs/svg.js';
import { Scale, Circle, CircleDrawerInterface, DrawerParams } from '@sunvisor/super-leopard-core';
import { applyBorder, applyFillColor } from './applyStyle';
import { ShapeDrawerProps } from './types';

export class CircleDrawer implements CircleDrawerInterface {
  readonly #svg: Svg
  readonly #scale: Scale

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(circle: Circle, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const diameter = scale.toPixel(circle.diameter);
    const { x, y } = scale.toPixel({ x: circle.x, y: circle.y });
    const circleElement = this.#svg.circle(diameter).move(x, y);

    applyFillColor(circleElement, circle.fillColor, opacity);
    applyBorder(scale, circleElement, circle.border, opacity);
  }
}
