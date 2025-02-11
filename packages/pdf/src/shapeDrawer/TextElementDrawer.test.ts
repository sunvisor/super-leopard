/**
 * Test for TextDrawer
 *
 * Created by sunvisor on 2025/02/03.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { TextElementDrawer } from './TextElementDrawer';
import { AlignType, createText, Text, Scale } from '@sunvisor/super-leopard-core';
import { PdfFont } from '../font/pdfFont';
import { mockDoc } from '../__test_assets__';

const mockScale = {
  toPoint: vi.fn(value => value),
  fromPoint: vi.fn(value => value),
} as unknown as Scale;

const mockMeasurement = {
  measureHeight: (text: Text) => text.font.size,
  measureWidth: (text: Text) => text.font.size * text.text.length,
}

const mockFonts = {
  fontName: vi.fn().mockReturnValue('MockFont'),
  textOption: vi.fn().mockReturnValue({}),
} as unknown as PdfFont;

describe('Tests for TextElementDrawer', () => {

  function createDrawer() {
    return new TextElementDrawer({ doc: mockDoc, scale: mockScale, fonts: mockFonts, measurement: mockMeasurement });
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

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
    expect(mockDoc.text).toHaveBeenCalledWith({
      x: 20,
      y: 20,
      text: 'Hello',
      font: { name: 'MockFont', size: 12 },
      options: {
        align: 'left',
        width: 170,
      },
      opacity: 1,
    });
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
    expect(mockDoc.text).toHaveBeenCalledWith({
      text: 'Hello',
      x: 10,
      y: 20,
      font: expect.any(Object),
      options: expect.any(Object),
      opacity: 1
    });
  });

});
