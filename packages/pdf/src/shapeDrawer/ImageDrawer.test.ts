/**
 * Test for ImageDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import fs from 'fs';
import PdfDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';
import { ImageDrawer } from './ImageDrawer';
import * as imageType from './imageType';
import PDFDocument = PDFKit.PDFDocument;
import { createImage, ImageData, Scale } from '@sunvisor/super-leopard-core';
import { GetPdfImagePath } from '../index';

vi.mock('fs');
vi.mock('svg-to-pdfkit');
vi.mock('./imageType', () => ({
  isJPEGFile: vi.fn(),
  isPngFile: vi.fn(),
  isSVGFile: vi.fn(),
}));

describe('ImageDrawer', () => {
  let doc: PDFDocument;
  let scale: Scale;
  let getImagePath: GetPdfImagePath;
  let imageDrawer: ImageDrawer;

  beforeEach(() => {
    doc = new PdfDocument();
    doc.image = vi.fn();
    doc.opacity = vi.fn();
    scale = { toPoint: vi.fn((bbox) => bbox) } as unknown as Scale;
    getImagePath = vi.fn((src) => `/mock/path/${src}`);
    imageDrawer = new ImageDrawer({ doc, scale, getImagePath });

    vi.mocked(imageType.isPngFile).mockReturnValue(false);
    vi.mocked(imageType.isJPEGFile).mockReturnValue(false);
    vi.mocked(imageType.isSVGFile).mockReturnValue(false);
  });

  it('should draw a PNG image', () => {
    // Arrange
    const imageData: ImageData = {
      type: 'image', src: 'test.png', x: 10, y: 20, width: 100, height: 50
    };
    const image = createImage(imageData);
    vi.mocked(imageType.isPngFile).mockReturnValue(true);
    // Act
    imageDrawer.draw(image);
    // Assert
    expect(doc.image).toHaveBeenCalledWith(
      '/mock/path/test.png',
      10, 20,
      { fit: [100, 50], align: 'center', valign: 'center' }
    );
  });

  it('should draw a JPEG image', () => {
    // Arrange
    const imageData: ImageData = {
      type: 'image', src: 'test.jpg', x: 5, y: 15, width: 80, height: 40
    };
    const image = createImage(imageData);
    vi.mocked(imageType.isJPEGFile).mockReturnValue(true);
    // Act
    imageDrawer.draw(image);
    // Assert
    expect(doc.image).toHaveBeenCalledWith(
      '/mock/path/test.jpg',
      5, 15,
      { fit: [80, 40], align: 'center', valign: 'center' }
    );
  });

  it('should draw an SVG image', () => {
    // Arrange
    const imageData: ImageData = {
      type: 'image', src: 'test.svg', x: 0, y: 0, width: 200, height: 100
    };
    const image = createImage(imageData);
    vi.mocked(imageType.isSVGFile).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue('<svg></svg>');
    // Act
    imageDrawer.draw(image);
    // Assert
    expect(SVGtoPDF).toHaveBeenCalledWith(doc, '<svg></svg>', 0, 0, { width: 200, height: 100 });
  });

  it('should set opacity if specified', () => {
    const imageData: ImageData = {
      type: 'image', src: 'test.png', x: 0, y: 0, width: 100, height: 50,
    };
    const image = createImage(imageData);
    vi.mocked(imageType.isPngFile).mockReturnValue(true);
    // Act
    imageDrawer.draw(image, { opacity: 0.5 });
    // Assert
    expect(doc.opacity).toHaveBeenCalledWith(0.5);
  });

  it('should throw an error for unsupported formats', () => {
    // Arrange
    const imageData: ImageData = {
      type: 'image', src: 'test.txt', x: 0, y: 0, width: 100, height: 50
    };
    const image = createImage(imageData);
    // Act & Assert
    expect(() => imageDrawer.draw(image)).toThrow('Unsupported image file: /mock/path/test.txt');
  });
});
