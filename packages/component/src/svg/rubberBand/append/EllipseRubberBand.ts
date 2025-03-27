/**
 * EllipseRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { adjustPosition, moveElement, ShapeRubberBandInterface } from '.';
import { borderToStroke } from '@/svg/utils';
import { StylesData } from '@/svg/style';
import { createBorder, createColor, Position, Scale } from '@sunvisor/super-leopard-core';
import { StrokeOptions, SvgDrawerInterface, SvgShapeInterface } from '@/svgDriver';

export class EllipseRubberBand implements ShapeRubberBandInterface {
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

    return svg.ellipse({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      stroke: this.#stroke,
      fillColor: this.#fillColor,
    });
  }

  adjustPosition(start: Position, end: Position): Position {
    return adjustPosition(start, end);
  }

  moveElement(start: Position, end: Position, element: SvgShapeInterface) {
    moveElement(start, end, element);
  }

}
