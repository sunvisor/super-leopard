/**
 * LineRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeRubberBandInterface } from '../';
import { Line as SvgLine, Shape as SvgShape, Svg } from '@svgdotjs/svg.js';
import {
  Scale,
  createBorder,
  Position,
} from '@sunvisor/super-leopard-core';
import { applyBorder } from '../../shapeDrawer/applyStyle';
import { adjustLinePosition } from '../LineRubberBand';
import { StylesData } from '../../style';

export class LineRubberBand implements ShapeRubberBandInterface {
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
    const element = svg.line();
    const border = createBorder(this.#styles.border);
    applyBorder(this.#scale, element, border);

    return element;
  }

  adjustPosition(start: Position, end: Position): Position {
    return adjustLinePosition(start, end);
  }

  moveElement(start: Position, end: Position, element: SvgShape) {
    (element as SvgLine).plot(start.x, start.y, end.x, end.y);
  }

}
