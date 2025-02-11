/**
 * CircleDrawer
 *
 * Created by sunvisor on 2024/03/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  Circle,
  CircleDrawerInterface,
  DrawerParams,
  Scale
} from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './ShapeDrawer';
import { CircleParams, PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { applyFillColor, applyOpacity, applyStroke } from './style';

export class CircleDrawer implements CircleDrawerInterface {
  readonly #doc: PdfDocumentInterface;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(circle: Circle, params?: DrawerParams): void {
    const pos = this.#scale.toPoint({ x: circle.cx, y: circle.cy });
    const circleParams: CircleParams = {
      x: pos.x,
      y: pos.y,
      radius: this.#scale.toPoint(circle.radius),
    }
    applyStroke(circleParams, circle.border);
    applyFillColor(circleParams, circle.fillColor);
    applyOpacity(circleParams, params?.opacity);
    this.#doc.circle(circleParams);
  }
}
