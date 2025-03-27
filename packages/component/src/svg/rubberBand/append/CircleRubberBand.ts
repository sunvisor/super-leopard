/**
 * CircleRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { borderToStroke } from '@/svg/utils';
import { ShapeRubberBandInterface } from './index';
import { StylesData } from '@/svg/style';
import { createBorder, createColor, Position, positionsToBox, Scale } from '@sunvisor/super-leopard-core';
import { StrokeOptions, SvgDrawerInterface, SvgShapeInterface } from '@/svgDriver';

export class CircleRubberBand implements ShapeRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #stroke: StrokeOptions | undefined;
  readonly #fillColor: string | undefined;

  constructor({ svg, scale, styles }: {
    svg: SvgDrawerInterface,
    scale: Scale,
    styles: StylesData
  }) {
    this.#svg = svg;
    this.#stroke = borderToStroke(scale, createBorder(styles.border));
    this.#fillColor = createColor(styles.fillColor)?.color;
  }

  createElement(): SvgShapeInterface {
    const svg = this.#svg;

    return svg.circle({
      x: 0,
      y: 0,
      diameter: 0,
      stroke: this.#stroke,
      fillColor: this.#fillColor,
    });
  }

  adjustPosition(_: Position, end: Position): Position {
    return end; // nothing to do
  }

  moveElement(start: Position, end: Position, element: SvgShapeInterface) {
    const box = positionsToBox(start, end);
    const diameter = Math.min(box.height, box.width);
    box.width = Math.min(box.height, box.width);
    element.move(box.x, box.y).size(diameter);
  }

}
