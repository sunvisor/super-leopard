/**
 * Test for Style
 *
 * Created by sunvisor on 2025/02/11.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { applyStroke, applyFillColor, applyOpacity, applyFont } from "./style";
import { StyleParams, TextParams } from '../pdfDriver/PdfDriverInterface';
import { createBorder, createColor, createFont } from '@sunvisor/super-leopard-core';
import { createTestFonts } from '../__test_assets__';
import { describe, expect } from 'vitest';

describe('Tests for style', () => {

  let options: StyleParams;

  beforeEach(() => {
    options = {};
  });

  test('applyStroke should apply stroke', () => {
    // Arrange
    const border = createBorder({
      style: 'solid',
      color: '#000000',
      width: 1,
      join: 'miter',
      cap: 'butt',
    })
    // Act

    applyStroke(options, border);
    // Assert
    expect(options.stroke).toEqual({
      style: 'solid',
      color: '#000000',
      width: 1,
      join: 'miter',
      cap: 'butt',
    });
  });

  test('options should not change when border is undefined', () => {
    // Arrange
    // Act
    applyStroke(options, undefined);
    // Assert
    expect(options).toEqual({});
  });

  test('applyFillColor should apply fillColor', () => {
    // Arrange
    const fillColor = createColor('#000000');
    // Act
    applyFillColor(options, fillColor);
    // Assert
    expect(options.fillColor).toEqual('#000000');
  });

  test('applyOpacity should apply opacity', () => {
    // Arrange
    const opacity = 0.5;
    // Act
    applyOpacity(options, opacity);
    // Assert
    expect(options.opacity).toEqual(0.5);
  });

  describe('Tests for applyFont', () => {

    const fonts = createTestFonts();
    const textParams: TextParams = {
      x: 10,
      y: 10,
      text: 'Hello, World!',
    };

    test('should apply font to text params', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        size: 12
      });
      // Act
      applyFont(textParams, font, fonts);
      // Assert
      expect(textParams.font).toEqual({
        name: 'Times-Roman',
        size: 12,
      });
    });

    test('font name should set correctly when style is set', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        size: 12,
        style: 'italic'
      });
      // Act
      applyFont(textParams, font, fonts);
      // Assert
      expect(textParams.font).toEqual({
        name: 'Times-Italic',
        size: 12,
      });
    });

    test('options should set correctly when style is set', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSansJP',
        size: 12,
        style: 'italic,underline'
      });
      // Act
      applyFont(textParams, font, fonts);
      // Assert
      expect(textParams.font).toEqual({
        name: 'NotoSansJP-Regular',
        size: 12,
      });
      expect(textParams.options).toEqual({
        oblique: true,
        underline: true
      });
    });

  });

});
