import { MeasurementInterface, Scale } from '@sunvisor/super-leopard-core';
import { GetPdfImagePath } from '../index';
import { PdfFont } from '../font/pdfFont';
import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';

export type ShapeDrawerProps = {
  doc: PdfDocumentInterface;
  scale: Scale;
}

export type ImageDrawerProps =  ShapeDrawerProps & {
  getImagePath: GetPdfImagePath;
}

export type TextDrawerProps = ShapeDrawerProps & {
  fonts: PdfFont;
  measurement: MeasurementInterface;
}

export type BarcodeDrawerProps = ShapeDrawerProps & {
  loadErrorImage: () => string;
}

export type ImageHandlerProps = {
  getImagePath: GetPdfImagePath;
  loadErrorImage: () => string;
}

export type PdfDrawerProps = TextDrawerProps & ImageHandlerProps;

export type CreateShapeDrawerParams = PdfDrawerProps;
