/**
 * LineDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DrawerParams, Line, LineDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ShapeDrawerProps } from './ShapeDrawer';
import { LineParams, PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { applyOpacity, applyStroke } from './style';

export class LineDrawer implements LineDrawerInterface {
  readonly #doc: PdfDocumentInterface;
  readonly #scale: Scale;

  constructor({ doc, scale }: ShapeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
  }

  draw(line: Line, params?: DrawerParams): void {
    const lineParams: LineParams = this.#scale.toPoint({
      x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2,
    });
    applyStroke(lineParams, line.border);
    applyOpacity(lineParams, params?.opacity);
    this.#doc.line(lineParams);
  }

}
