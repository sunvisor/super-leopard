/**
 * LineDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DrawerParams, Line, LineDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './ShapeDrawer';
import { applyStyle } from '../style/style';
import PDFDocument = PDFKit.PDFDocument;

export class LineDrawer implements LineDrawerInterface {
  readonly #doc: PDFDocument;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(line: Line, params?: DrawerParams): void {
    const positions = this.#scale.toPoint({
      x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2,
    });
    const doc = this.#doc.moveTo(positions.x1, positions.y1)
      .lineTo(positions.x2, positions.y2);
    applyStyle(doc, line.border, undefined, params?.opacity);
  }

}
