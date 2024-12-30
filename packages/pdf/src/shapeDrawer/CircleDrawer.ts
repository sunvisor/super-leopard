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
import { applyStyle } from '../style/style';
import PDFDocument = PDFKit.PDFDocument;

export class CircleDrawer implements CircleDrawerInterface {
  readonly #doc: PDFDocument;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(circle: Circle, params?: DrawerParams): void {
    const pos = this.#scale.toPoint({ x: circle.cx, y: circle.cy });
    const x = pos.x;
    const y = pos.y;
    const radius = this.#scale.toPoint(circle.radius);
    const opacity = params?.opacity;
    const doc = this.#doc;

    doc.circle(x, y, radius);
    applyStyle(doc, circle.border, circle.fillColor, opacity);
  }
}
