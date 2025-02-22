/**
 * Test for createSvg
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeData, BarcodeFormatType, createBarcode } from '@sunvisor/super-leopard-core';
import { createBarcodeSvg } from './createBarcodeSvg';

vi.mock('@bwip-js/generic', () => ({
  drawingSVG: vi.fn(() => '<svg>drawingSVG</svg>'),
  code39: vi.fn(() => '<svg>code39</svg>'),
  code128: vi.fn(() => '<svg>code128</svg>'),
  ean13: vi.fn(() => '<svg>ean13</svg>'),
  ean8: vi.fn(() => '<svg>ean8</svg>'),
  ean5: vi.fn(() => '<svg>ean5</svg>'),
  gs1_128: vi.fn(() => '<svg>gs1_128</svg>'),
  isbn: vi.fn(() => '<svg>isbn</svg>'),
  interleaved2of5: vi.fn(() => '<svg>itf</svg>'),
  itf14: vi.fn(() => '<svg>itf14</svg>'),
  upca: vi.fn(() => '<svg>upca</svg>'),
  upce: vi.fn(() => '<svg>upce</svg>'),
  rationalizedCodabar: vi.fn(() => '<svg>codabar</svg>'),
  qrcode: vi.fn(() => '<svg>qrcode</svg>'),
}));

describe('Tests for createSvg', () => {
  const base: Omit<BarcodeData, 'value' | 'format'> = {
    type: 'barcode',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }
  let barcodeLib: typeof import('@bwip-js/generic');

  beforeEach(async () => {
    vi.resetModules();
    barcodeLib = await import('@bwip-js/generic');
  });

  it('should call the correct barcode generator for CODE39', () => {
    // Arrange
    const barcode = createBarcode({
      ...base,
      value: '12345678',
      format: BarcodeFormatType.CODE39
    });
    // Act
    createBarcodeSvg(barcode);
    // Assert
    expect(barcodeLib.code39).toHaveBeenCalled();
    expect(barcodeLib.drawingSVG).toHaveBeenCalled();
  });

  it('should call the correct barcode generator for CODE128', () => {
    // Arrange
    const barcode = createBarcode({
      ...base,
      value: '12345678',
      format: BarcodeFormatType.CODE128
    });
    // Act
    createBarcodeSvg(barcode);
    // Assert
    expect(barcodeLib.code128).toHaveBeenCalled();
  });

  it('should call the correct barcode generator for EAN13', () => {
    // Arrange
    const barcode = createBarcode({
      ...base,
      value: '12345678',
      format: BarcodeFormatType.EAN13
    });
    // Act
    createBarcodeSvg(barcode);
    // Assert
    expect(barcodeLib.ean13).toHaveBeenCalled();
  });

  it('should call the correct barcode generator for QR', () => {
    // Arrange
    const barcode = createBarcode({
      ...base,
      value: '12345678',
      format: BarcodeFormatType.QR
    });
    // Act
    createBarcodeSvg(barcode);
    // Assert
    expect(barcodeLib.qrcode).toHaveBeenCalled();
  });

  it('should call with correct options', () => {
    // Arrange
    const barcode = createBarcode({
      ...base,
      value: '12345678',
      format: BarcodeFormatType.CODE39,
      options: {
        rotate: 'R',
        includeText: true
      }
    });
    // Act
    createBarcodeSvg(barcode);
    // Assert
    expect(barcodeLib.code39).toHaveBeenCalledWith({
      bcid: 'code39',
      text: '12345678',
      rotate: 'N',
      includetext: false,
    }, expect.anything());
  });

});
