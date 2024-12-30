/**
 * EllipseDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeDrawerProps } from './ShapeDrawer';
import { DrawerParams, Ellipse, EllipseDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { applyStyle } from '../style/style';
import PDFDocument = PDFKit.PDFDocument;

export class EllipseDrawer implements EllipseDrawerInterface {
  readonly #doc: PDFDocument;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(ellipse: Ellipse, params?: DrawerParams): void {
    const pos = this.#scale.toPoint({
      x: ellipse.x + ellipse.width / 2,
      y: ellipse.y + ellipse.height / 2,
    });
    const rx = this.#scale.toPoint(ellipse.width) / 2;
    const ry = this.#scale.toPoint(ellipse.height) / 2;
    const doc = this.#doc.ellipse(pos.x, pos.y, rx, ry);
    applyStyle(doc, ellipse.border, ellipse.fillColor, params?.opacity);
  }

}
