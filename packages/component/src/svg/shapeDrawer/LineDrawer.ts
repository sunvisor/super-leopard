/**
 * LineDrawer
 *
 * Created by sunvisor on 2023/12/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Svg } from '@svgdotjs/svg.js';
import { applyBorder } from './applyStyle';
import { DrawerParams, Line, LineDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './types';

export class LineDrawer implements LineDrawerInterface {
  readonly #svg: Svg;
  readonly #scale: Scale;

  constructor({ svg, scale }: ShapeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
  }

  draw(line: Line, { opacity = 1 }: DrawerParams): void {
    const scale = this.#scale;
    const pos1 = scale.toPixel({ x: line.x1, y: line.y1 });
    const pos2 = scale.toPixel({ x: line.x2, y: line.y2 });
    const lineElement = this.#svg.line(
      pos1.x,
      pos1.y,
      pos2.x,
      pos2.y,
    );
    applyBorder(scale, lineElement, line.border, opacity);
  }
}
