/**
 * CircleDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Scale, Circle, CircleDrawerInterface, DrawerParams } from '@sunvisor/super-leopard-core';
import { borderToStroke } from '../utils';
import { ShapeDrawerProps } from './types';
import { SvgDrawerInterface } from '@/svgDriver';

export class CircleDrawer implements CircleDrawerInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(circle: Circle, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const diameter = scale.toPixel(circle.diameter);
    const { x, y } = scale.toPixel({ x: circle.x, y: circle.y });
    this.#svg.circle({
      diameter,
      x,
      y,
      fillColor: circle.fillColor?.color,
      stroke: borderToStroke(scale, circle.border),
      opacity
    });
  }
}
