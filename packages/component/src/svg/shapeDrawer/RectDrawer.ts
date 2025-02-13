/**
 * RectDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { borderToStroke } from '../utils';
import { DrawerParams, Rect, RectDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './types';
import { SvgDrawerInterface } from '../../svgDriver';

export class RectDrawer implements RectDrawerInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(rect: Rect, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const box = scale.toPixel(rect.bbox);
    this.#svg.rect({
      ...box,
      stroke: borderToStroke(scale, rect.border),
      fillColor: rect.fillColor?.color,
      opacity,
    });
  }
}
