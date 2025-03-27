/**
 * EllipseDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { borderToStroke } from '../utils';
import { DrawerParams, Ellipse, EllipseDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './types';
import { SvgDrawerInterface } from '@/svgDriver';

export class EllipseDrawer implements EllipseDrawerInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(ellipse: Ellipse, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const { x, y, width, height } = scale.toPixel(ellipse);
    this.#svg.ellipse({
      width,
      height,
      x,
      y,
      stroke: borderToStroke(scale, ellipse.border),
      fillColor: ellipse.fillColor?.color,
      opacity,
    });
  }
}
