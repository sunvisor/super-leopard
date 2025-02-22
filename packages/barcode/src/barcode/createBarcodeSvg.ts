/**
 * CreateSvg
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  code128,
  code39,
  drawingSVG,
  ean13,
  ean5,
  ean8,
  gs1_128,
  interleaved2of5,
  isbn,
  itf14,
  qrcode,
  rationalizedCodabar,
  RenderOptions,
  upca,
  upce
} from '@bwip-js/generic';
import {
  Barcode,
  BarcodeFormatType,
  BarcodeFormatValue,
  BarcodeRotateType
} from '@sunvisor/super-leopard-core';


const barcodeGenerators: Record<BarcodeFormatValue, (opts: RenderOptions, draw: ReturnType<typeof drawingSVG>) => string> = {
  [BarcodeFormatType.CODE39]: code39,
  [BarcodeFormatType.CODE128]: code128,
  [BarcodeFormatType.JAN]: ean13,
  [BarcodeFormatType.EAN13]: ean13,
  [BarcodeFormatType.EAN8]: ean8,
  [BarcodeFormatType.EAN5]: ean5,
  [BarcodeFormatType.GS1_128]: gs1_128,
  [BarcodeFormatType.ISBN]: isbn,
  [BarcodeFormatType.ITF]: interleaved2of5,
  [BarcodeFormatType.ITF14]: itf14,
  [BarcodeFormatType.UPCA]: upca,
  [BarcodeFormatType.UPCE]: upce,
  [BarcodeFormatType.CODABAR]: rationalizedCodabar,
  [BarcodeFormatType.NW7]: rationalizedCodabar,
  [BarcodeFormatType.QR]: qrcode,
};

type CreateBarcodeSvgOptions = {
  format: BarcodeFormatValue;
  value: string;
  rotate?: BarcodeRotateType;
  includeText?: boolean;
}

export function createBarcodeSvg(barcode: Barcode): string;
export function createBarcodeSvg(barcode: CreateBarcodeSvgOptions): string;
export function createBarcodeSvg(barcode: Barcode | CreateBarcodeSvgOptions): string {
  if (barcode instanceof Barcode) {
    return createBarcodeSvgFromBarcodeObject(barcode);
  }
  return createBarcodeSvgFromOptions(barcode);
}

function createBarcodeSvgFromBarcodeObject(barcode: Barcode): string {
  const options: CreateBarcodeSvgOptions = {
    format: barcode.format,
    value: barcode.value,
    rotate: barcode.options?.rotate,
    includeText: barcode.options?.includeText,
  }
  return createBarcodeSvgFromOptions(options);
}

function createBarcodeSvgFromOptions(barcode: CreateBarcodeSvgOptions): string {
  const format = barcode.format;
  const generator = barcodeGenerators[format];
  if (!generator) {
    throw new Error('Unsupported format');
  }
  const options: RenderOptions = {
    bcid: format,
    text: barcode.value,
    rotate: barcode.rotate || 'N',
    includetext: barcode.includeText || false,
  }

  return generator({ ...options, bcid: format }, drawingSVG());
}


