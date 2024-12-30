import { MeasurementInterface, Scale } from '@sunvisor/super-leopard-core';
import { GetPdfImagePath } from '../index';
import PDFDocument = PDFKit.PDFDocument;
import { PdfFont } from '../font/pdfFont';

export type ShapeDrawerProps = {
  doc: PDFDocument;
  scale: Scale;
}

export type ImageDrawerProps =  ShapeDrawerProps & {
  getImagePath: GetPdfImagePath;
}

export type TextDrawerProps = ShapeDrawerProps & {
  fonts: PdfFont;
  measurement: MeasurementInterface;
}

export type CreateShapeDrawerParams = TextDrawerProps & {
  getImagePath: GetPdfImagePath;
}
