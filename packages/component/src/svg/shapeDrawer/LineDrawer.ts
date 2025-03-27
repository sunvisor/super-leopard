/**
 * LineDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { borderToStroke } from '../utils';
import { DrawerParams, Line, LineDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './types';
import { SvgDrawerInterface } from '@/svgDriver';

export class LineDrawer implements LineDrawerInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(line: Line, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const pos = scale.toPixel({
      x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2
    });
    this.#svg.line({
      ...pos,
      stroke: borderToStroke(scale, line.border),
      opacity,
    })
  }
}
