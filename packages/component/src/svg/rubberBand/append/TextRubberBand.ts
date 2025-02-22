/**
 * TextRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Position } from '@sunvisor/super-leopard-core';
import { adjustPosition, moveElement, ShapeRubberBandInterface } from '.';
import { SettingData } from '../../../settings';
import { SvgDrawerInterface, SvgShapeInterface } from '../../../svgDriver';

export class TextRubberBand implements ShapeRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #settings: SettingData;

  constructor({ svg, settings }: {
    svg: SvgDrawerInterface,
    settings: SettingData
  }) {
    this.#svg = svg;
    this.#settings = settings;
  }

  createElement(): SvgShapeInterface {
    const svg = this.#svg;
    const stroke = this.#settings.rubberBand.stroke;

    return svg.rect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      stroke,
    });
  }

  adjustPosition(start: Position, end: Position): Position {
    return adjustPosition(start, end);
  }

  moveElement(start: Position, end: Position, element: SvgShapeInterface) {
    moveElement(start, end, element);
  }

}
