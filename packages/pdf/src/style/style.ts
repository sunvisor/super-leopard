/**
 * Border
 *
 * Created by sunvisor on 2024/03/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PDFDocument = PDFKit.PDFDocument;
import { Border, Color, StyleType } from '@sunvisor/super-leopard-core';

export function applyBorderStyle(doc: PDFDocument, border: Border | undefined, opacity?: number | undefined): void {
  if (!border) return;
  if (opacity) {
    doc.opacity(opacity);
  }
  if (border.style === StyleType.SOLID) {
    doc.undash();
  }
  if (border.style === StyleType.DASHED) {
    doc.dash(4, { space: 4 });
  }
  if (border.style === StyleType.DOTTED) {
    doc.dash(1, { space: 2 });
  }
  doc
    .lineJoin(border.join)
    .lineCap(border.cap)
    .lineWidth(border.width)
    .strokeColor(border.color.color);
}

export function applyFillColor(doc: PDFDocument, color: Color | undefined, opacity?: number | undefined): void {
  if (!color) return;
  if (opacity) {
    doc.fillOpacity(opacity);
  }
  doc.fillColor(color.color);
}

export function applyStyle(
  doc: PDFDocument,
  border: Border | undefined,
  fillColor: Color | undefined,
  opacity?: number | undefined
) : void {
  applyBorderStyle(doc, border, opacity);
  applyFillColor(doc, fillColor, opacity);

  if (border && fillColor) {
    doc.fillAndStroke();
  }
  if (border) {
    doc.stroke();
  }
  if (fillColor) {
    doc.fill();
  }
}
