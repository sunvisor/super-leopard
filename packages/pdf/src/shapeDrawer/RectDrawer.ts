/**
 * RectDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ShapeDrawerProps } from './ShapeDrawer';
import { DrawerParams, Rect, RectDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { applyStyle } from '../style/style';
import PDFDocument = PDFKit.PDFDocument;

export class RectDrawer implements RectDrawerInterface {
  readonly #doc: PDFDocument;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(rect: Rect, params?: DrawerParams): void {
    const box = this.#scale.toPoint({
      x: rect.x, y: rect.y, width: rect.width, height: rect.height,
    });
    const doc = this.#doc.rect(box.x, box.y, box.width, box.height);
    applyStyle(doc, rect.border, rect.fillColor, params?.opacity);
  }

}
