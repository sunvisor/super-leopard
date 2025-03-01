import { BarcodeOptions, BarcodeShapeType } from '../object';


export const BarcodeFormatType = {
  CODE39: 'code39',
  CODE128: 'code128',
  JAN: 'ean13', // same as EAN13
  EAN13: 'ean13',
  EAN8: 'ean8',
  EAN5: 'ean5',
  GS1_128: 'gs1-128',
  ISBN: 'isbn',
  ITF: 'itf', // interleaved2of5
  ITF14: 'itf14',
  UPCA: 'upca',
  UPCE: 'upce',
  CODABAR: 'codabar',
  NW7: 'nw7', // use codabar
  QR: 'qr',
}

export type BarcodeRotateType = 'N' | 'R' | 'L' | 'I';

export type BarcodeFormatValue = typeof BarcodeFormatType[keyof typeof BarcodeFormatType];

export type BarcodeData = {
  type?: BarcodeShapeType,
  x: number;
  y: number;
  width: number;
  height: number;
  format: BarcodeFormatValue;
  options?: BarcodeOptions;
  value?: string;
}

// noinspection JSUnusedGlobalSymbols
export const barcodeDescriptions: Record<BarcodeFormatValue, string> = {
  [BarcodeFormatType.CODE39]: 'Code 39',
  [BarcodeFormatType.CODE128]: 'Code 128',
  [BarcodeFormatType.JAN]: 'JAN',
  [BarcodeFormatType.EAN13]: 'EAN-13',
  [BarcodeFormatType.EAN8]: 'EAN-8',
  [BarcodeFormatType.EAN5]: 'EAN-5',
  [BarcodeFormatType.GS1_128]: 'GS1-128',
  [BarcodeFormatType.ISBN]: 'ISBN',
  [BarcodeFormatType.ITF]: 'ITF',
  [BarcodeFormatType.ITF14]: 'ITF-14',
  [BarcodeFormatType.UPCA]: 'UPC-A',
  [BarcodeFormatType.UPCE]: 'UPC-E',
  [BarcodeFormatType.CODABAR]: 'CODABAR',
  [BarcodeFormatType.NW7]: 'NW7',
  [BarcodeFormatType.QR]: 'QR Code',
}

export const sampleBarcodeValues: Record<BarcodeFormatValue, string> = {
  [BarcodeFormatType.CODE39]: '12345678',
  [BarcodeFormatType.CODE128]: 'sunvisorlab',
  [BarcodeFormatType.JAN]: '4901234567894',
  [BarcodeFormatType.EAN13]: '4901234567894',
  [BarcodeFormatType.EAN8]: '12345670',
  [BarcodeFormatType.EAN5]: '12345',
  [BarcodeFormatType.GS1_128]: '(01)14912345678901',
  [BarcodeFormatType.ISBN]: '978-4-4341-8119-1',
  [BarcodeFormatType.ITF]: '12345678',
  [BarcodeFormatType.ITF14]: '1234567890123',
  [BarcodeFormatType.UPCA]: '123456789012',
  [BarcodeFormatType.UPCE]: '1234567',
  [BarcodeFormatType.CODABAR]: 'A12345678A',
  [BarcodeFormatType.NW7]: 'A12345678A',
  [BarcodeFormatType.QR]: 'https://www.sunvisor.net',
}
