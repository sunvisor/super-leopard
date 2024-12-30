/**
 * EllipseRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Shape as SvgShape, Svg } from '@svgdotjs/svg.js';
import { adjustPosition, moveElement, ShapeRubberBandInterface } from '.';
import { applyBorder, applyFillColor } from '../../shapeDrawer/applyStyle';
import { StylesData } from '../../style';
import { createBorder, createColor, Position, Scale } from '@sunvisor/super-leopard-core';

export class EllipseRubberBand implements ShapeRubberBandInterface {
  readonly #svg: Svg;
  readonly #scale: Scale;
  readonly #styles: StylesData;

  constructor({ svg, scale, styles }: {
    svg: Svg,
      scale: Scale,
      styles: StylesData
  }) {
    this.#svg = svg;
    this.#scale = scale;
    this.#styles = styles;
  }

  createElement(): SvgShape {
    const svg = this.#svg;
    const element = svg.ellipse();
    const border = createBorder(this.#styles.border);
    applyBorder(this.#scale, element, border);
    applyFillColor(element, createColor(this.#styles.fillColor));

    return element;
  }

  adjustPosition(start: Position, end: Position): Position {
    return adjustPosition(start, end);
  }

  moveElement(start: Position, end: Position, element: SvgShape) {
    moveElement(start, end, element);
  }

}
