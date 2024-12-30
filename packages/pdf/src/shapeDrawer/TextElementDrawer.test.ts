/**
 * Test for TextDrawer
 *
 * Created by sunvisor on 2025/02/03.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { TextElementDrawer } from './TextElementDrawer';
import { AlignType, createText, Text, Scale } from '@sunvisor/super-leopard-core';
import PdfDocument from 'pdfkit';
import { PdfFont } from '../font/pdfFont';

const mockDoc = new PdfDocument();
mockDoc.font = vi.fn().mockReturnThis();
mockDoc.fontSize = vi.fn().mockReturnThis();
mockDoc.text = vi.fn();
mockDoc.heightOfString = vi.fn().mockReturnValue(10);
mockDoc.widthOfString = vi.fn().mockReturnValue(50);

const mockScale = {
  toPoint: vi.fn(({ x, y }) => ({ x: x * 2, y: y * 2 })),
  fromPoint: vi.fn(({ x, y }) => ({ x: x / 2, y: y / 2 }))
} as unknown as Scale;

const mockMeasurement = {
  measureHeight: (text: Text) => text.font.size,
  measureWidth: (text: Text) => text.font.size * text.text.length,
}

const mockFonts = {
  fontName: vi.fn().mockReturnValue('MockFont'),
  textOption: vi.fn().mockReturnValue({}),
} as unknown as PdfFont;

describe('Tests for TextDrawer', () => {

  function createDrawer() {
    return new TextElementDrawer({ doc: mockDoc, scale: mockScale, fonts: mockFonts, measurement: mockMeasurement });
  }

  it('should apply font correctly', () => {
    // Arrange
    const textDrawer = createDrawer();
    const text = createText({
      type: 'text',
      x: 20,
      y: 20,
      width: 170,
      height: 7,
      text: 'Hello',
      font: {
        family: 'TimesRoman',
        size: 12
      },
      color: '#000000',
    })
    // Act
    textDrawer.draw(text);
    // Assert
    expect(mockFonts.fontName).toHaveBeenCalled();
    expect(mockDoc.font).toHaveBeenCalledWith('MockFont');
    expect(mockDoc.fontSize).toHaveBeenCalledWith(12);
  });

  it('should draw text at the correct position', () => {
    // Arrange
    const textDrawer = createDrawer();
    const text = createText({
      type: 'text',
      x: 10,
      y: 20,
      width: 170,
      height: 7,
      text: 'Hello',
      font: {
        family: 'TimesRoman',
        size: 12
      },
      align: AlignType.LEFT,
      color: '#000000',
    });
    // Act
    textDrawer.draw(text);
    // Assert
    expect(mockDoc.text).toHaveBeenCalledWith('Hello', 20, 40, expect.any(Object));
  });

  it('should set correct text options', () => {
    // Arrange
    const textDrawer = createDrawer();
    const text = createText({
      type: 'text',
      x: 10,
      y: 20,
      width: 170,
      height: 7,
      text: 'Hello',
      font: {
        family: 'TimesRoman',
        size: 12
      },
      align: AlignType.CENTER,
      color: '#000000',
    });

    const options = textDrawer["textOptions"](text);
    expect(options.align).toBe('center');
  });

});
