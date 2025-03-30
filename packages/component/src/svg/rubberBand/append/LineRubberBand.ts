/**
 * LineRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeRubberBandInterface } from '../';
import { createBorder, Position, Scale, } from '@sunvisor/super-leopard-core';
import { borderToStroke } from '@/svg/utils';
import { adjustLinePosition } from '@/svg/rubberBand';
import { StylesData } from '@/svg/style';
import {
  StrokeOptions,
  SvgDrawerInterface,
  SvgLineInterface,
  SvgShapeInterface
} from '@/svgDriver';

export class LineRubberBand implements ShapeRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #stroke: StrokeOptions | undefined;

  constructor({ svg, scale, styles }: {
    svg: SvgDrawerInterface,
    scale: Scale,
    styles: StylesData
  }) {
    this.#svg = svg;
    this.#stroke = borderToStroke(scale, createBorder(styles.border));
  }

  createElement(): SvgShapeInterface {
    const svg = this.#svg;

    return svg.line({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      stroke: this.#stroke,
    });
  }

  adjustPosition(start: Position, end: Position): Position {
    return adjustLinePosition(start, end);
  }

  moveElement(start: Position, end: Position, element: SvgShapeInterface) {
    (element as SvgLineInterface).plot(start.x, start.y, end.x, end.y);
  }

}
