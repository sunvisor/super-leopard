/**
 * Measurement
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { MeasurementInterface, Text } from '@sunvisor/super-leopard-core';
import { PdfFont } from '../font/pdfFont';
import { MeasurementParams, PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { applyFont } from './style';

export class Measurement implements MeasurementInterface {

  private readonly doc: PdfDocumentInterface;
  private readonly fonts: PdfFont;
  constructor(
    { doc, fonts }: { doc: PdfDocumentInterface, fonts: PdfFont }
  ) {
    this.doc = doc;
    this.fonts = fonts;
  }

  measureHeight(text: Text): number {
    const params: MeasurementParams = {
      text: text.text,
    }
    applyFont(params, text.font, this.fonts);
    return this.doc.measureHeight(params);
  }

  measureWidth(text: Text): number {
    const params: MeasurementParams = {
      text: text.text,
    }
    applyFont(params, text.font, this.fonts);
    return this.doc.measureWidth(params);
  }

}
