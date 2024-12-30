/**
 * Measurement
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { MeasurementInterface, Text } from '@sunvisor/super-leopard-core';
import PDFDocument = PDFKit.PDFDocument;
import { PdfFont } from '../font/pdfFont';

export class Measurement implements MeasurementInterface {

  private readonly doc: PDFDocument;
  private readonly fonts: PdfFont;
  constructor(
    { doc, fonts }: { doc: PDFDocument, fonts: PdfFont }
  ) {
    this.doc = doc;
    this.fonts = fonts;
  }

  measureHeight(text: Text): number {
    this.applyFont(text);
    return this.doc.heightOfString('X');
  }

  measureWidth(text: Text): number {
    this.applyFont(text);
    return this.doc.widthOfString(text.text);
  }

  applyFont(text: Text) {
    const fontName = this.fonts.fontName(text.font);
    this.doc.font(fontName).fontSize(text.font.size);
  }

}
