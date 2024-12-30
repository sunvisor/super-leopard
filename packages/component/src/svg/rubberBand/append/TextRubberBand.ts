/**
 * TextRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Shape as SvgShape, Svg } from '@svgdotjs/svg.js';
import { Position } from '@sunvisor/super-leopard-core';
import { adjustPosition, moveElement, ShapeRubberBandInterface } from '.';
import { SettingData } from '../../setting';

export class TextRubberBand implements ShapeRubberBandInterface {
  readonly #svg: Svg;
  readonly #settings: SettingData;

  constructor({ svg, settings }: {
    svg: Svg,
    settings: SettingData
  }) {
    this.#svg = svg;
    this.#settings = settings;
  }

  createElement(): SvgShape {
    const svg = this.#svg;
    const options = this.#settings.rubberBand.stroke;
      const element = svg.rect(0, 0);
    element.stroke(options.stroke).attr(options.attr).fill('none');

    return element;
  }

  adjustPosition(start: Position, end: Position): Position {
    return adjustPosition(start, end);
  }

  moveElement(start: Position, end: Position, element: SvgShape) {
    moveElement(start, end, element);
  }

}
