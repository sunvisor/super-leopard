/**
 * CircleRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Shape as SvgShape, Svg } from '@svgdotjs/svg.js';
import { applyBorder, applyFillColor } from '../../shapeDrawer/applyStyle';
import { ShapeRubberBandInterface } from './index';
import { StylesData } from '../../style';
import { createBorder, createColor, Position, positionsToBox, Scale } from '@sunvisor/super-leopard-core';

export class CircleRubberBand implements ShapeRubberBandInterface {
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
    const element = svg.circle();
    const border = createBorder(this.#styles.border);
    applyBorder(this.#scale, element, border);
    applyFillColor(element, createColor(this.#styles.fillColor));

    return element;
  }

  adjustPosition(_: Position, end: Position): Position {
    return end; // nothing to do
  }

  moveElement(start: Position, end: Position, element: SvgShape) {
    const box = positionsToBox(start, end);
    const diameter = Math.min(box.height, box.width);
    box.width = Math.min(box.height, box.width);
    element.move(box.x, box.y).size(diameter);
  }

}
