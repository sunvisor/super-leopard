/**
 * Test for ImageDrawer
 *
 * Created by sunvisor on 2025/02/02.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ImageDrawer } from './ImageDrawer';
import * as imageType from './imageType';
import { createImage, ImageData, Scale } from '@sunvisor/super-leopard-core';
import { GetPdfImagePath } from '../index';
import { mockDoc } from '../__test_assets__';
import fs from 'fs';


vi.mock('fs');
vi.mock('./imageType', () => ({
  isJPEGFile: vi.fn(),
  isPngFile: vi.fn(),
  isSVGFile: vi.fn(),
}));

describe('ImageDrawer', () => {
  let scale: Scale;
  let getImagePath: GetPdfImagePath;
  let imageDrawer: ImageDrawer;

  beforeEach(() => {
    scale = { toPoint: vi.fn((value) => value) } as unknown as Scale;
    getImagePath = vi.fn((src) => `/mock/path/${src}`);
    imageDrawer = new ImageDrawer({ doc: mockDoc, scale, getImagePath });

    vi.mocked(imageType.isPngFile).mockReturnValue(false);
    vi.mocked(imageType.isJPEGFile).mockReturnValue(false);
    vi.mocked(imageType.isSVGFile).mockReturnValue(false);
  });

  afterEach(() => {
    vi.resetAllMocks();
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
    expect(mockDoc.image).toHaveBeenCalledWith({
      x: 10,
      y: 20,
      width: 100,
      height: 50,
      src: '/mock/path/test.png',
    });
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
    expect(mockDoc.image).toHaveBeenCalledWith({
      x: 5,
      y: 15,
      width: 80,
      height: 40,
      src: '/mock/path/test.jpg',
    });
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
    expect(mockDoc.image).toHaveBeenCalledWith({
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      svg: '<svg></svg>',
    });
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
    expect(mockDoc.image).toHaveBeenCalledWith({
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      src: '/mock/path/test.png',
      opacity: 0.5
    });
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
