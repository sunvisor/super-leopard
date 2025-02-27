/**
 * Test for BarcodeDrawer
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeDrawer, defaultErrorImageLoader } from "./BarcodeDrawer";
import { BarcodeData, createBarcode, Scale } from '@sunvisor/super-leopard-core';
import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { createBarcodeSvg } from '@sunvisor/super-leopard-barcode';
import { afterEach } from 'vitest';


vi.mock('@sunvisor/super-leopard-barcode', () => ({
  createBarcodeSvg: vi.fn(() => '<svg></svg>'),
}));

describe('Tests for BarcodeDrawer', () => {
  let doc: PdfDocumentInterface;
  let scale: Scale;

  beforeEach(() => {
    doc = {
      image: vi.fn(),
    } as unknown as PdfDocumentInterface;
    scale = { toPoint: vi.fn((bbox) => bbox) } as unknown as Scale;
  });

  afterEach(() => {
    vi.resetAllMocks();
  })

  it('should draw barcode', () => {
    // Arrange
    const barcodeData: BarcodeData = {
      type: 'barcode', format: 'code128', value: '12345', x: 0, y: 10, width: 200, height: 100
    }
    const barcode = createBarcode(barcodeData);
    const drawer = new BarcodeDrawer({ doc, scale });
    // Act
    drawer.draw(barcode, {})
    // Assert
    expect(doc.image).toHaveBeenCalledWith({
      svg: '<svg></svg>', x:0, y: 10, width: 200, height: 100
    });
  });

  it('should draw error image when createBarcodeSvg fails', () => {
    // Arrange
    vi.mocked(createBarcodeSvg).mockImplementationOnce(() => { throw new Error('error') });
    const barcodeData: BarcodeData = {
      type: 'barcode', format: 'code128', value: '12345', x: 0, y: 10, width: 200, height: 100
    }
    const barcode = createBarcode(barcodeData);
    const drawer = new BarcodeDrawer({ doc, scale });
    // Act
    drawer.draw(barcode, {})
    // Assert
    expect(doc.image).toHaveBeenCalledWith({
      svg: defaultErrorImageLoader() , x:0, y: 10, width: 200, height: 100
    });
  });

});
