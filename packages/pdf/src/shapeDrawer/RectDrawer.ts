/**
 * RectDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeDrawerProps } from './ShapeDrawer';
import { DrawerParams, Rect, RectDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { PdfDocumentInterface, RectParams } from '../pdfDriver/PdfDriverInterface';
import { applyFillColor, applyOpacity, applyStroke } from './style';

export class RectDrawer implements RectDrawerInterface {
  readonly #doc: PdfDocumentInterface;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(rect: Rect, params?: DrawerParams): void {
    const rectParams: RectParams = this.#scale.toPoint(rect.bbox);
    applyStroke(rectParams, rect.border);
    applyFillColor(rectParams, rect.fillColor);
    applyOpacity(rectParams, params?.opacity);
    this.#doc.rect(rectParams);
  }

}
