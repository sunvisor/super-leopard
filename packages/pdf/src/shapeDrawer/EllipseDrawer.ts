/**
 * EllipseDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeDrawerProps } from './ShapeDrawer';
import { DrawerParams, Ellipse, EllipseDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { EllipseParams, PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { applyFillColor, applyOpacity, applyStroke } from './style';

export class EllipseDrawer implements EllipseDrawerInterface {
  readonly #doc: PdfDocumentInterface;
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
    const ellipseParams: EllipseParams = {
      x: pos.x,
      y: pos.y,
      rx,
      ry
    };
    applyStroke(ellipseParams, ellipse.border);
    applyFillColor(ellipseParams, ellipse.fillColor);
    applyOpacity(ellipseParams, params?.opacity);

    this.#doc.ellipse(ellipseParams);
  }

}
