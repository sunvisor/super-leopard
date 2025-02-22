/**
 * CreateDrawer
 *
 * Created by sunvisor on 2025/02/03.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { PdfDrawer } from './PdfDrawer';
import { createScale, Page } from '@sunvisor/super-leopard-core';
import { PdfFont } from '../font/pdfFont';
import { Measurement } from '../shapeDrawer/Measurement';
import { pdfKitDriver } from '../pdfDriver/PdfKitDriver';
import { ImageHandlerProps } from '../shapeDrawer/ShapeDrawer';

type CreatePdfDrawerParams = {
  page: Page;
  fonts: PdfFont;
} & ImageHandlerProps;

export function createPdfDrawer(params: CreatePdfDrawerParams): PdfDrawer {
  const { fonts, page, ...rest } = params;
  const scale = createScale({ unit: page.unit }, page.margin);
  const doc = pdfKitDriver.createDocument();
  fonts.registerFonts(doc);
  const measurement = new Measurement({ doc, fonts });
  return new PdfDrawer({ doc, scale, fonts, measurement, ...rest });
}
