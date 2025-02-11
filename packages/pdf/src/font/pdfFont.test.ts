/**
 * Test for PdfFont
 *
 * Created by sunvisor on 2025/01/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createPdfFont } from "./pdfFont";
import { additionalPdfFontMap } from '../__test_assets__/font';
import { createFont } from '@sunvisor/super-leopard-core';
import { describe, expect } from 'vitest';
import { mockDoc } from '../__test_assets__';

describe('Tests for PdfFont', () => {

  describe('Tests for registerFonts', () => {

    test('Should register additional fonts to PdfDocument', () => {
      // Arrange
      const options = {
        additionalFontMap: additionalPdfFontMap,
        fontPath: '/fonts',
      }
      const pdfFont = createPdfFont(options);
      // Act
      pdfFont.registerFonts(mockDoc);
      // Assert
      expect(mockDoc.registerFont).toBeCalledTimes(14);
      expect(mockDoc.registerFont).toHaveBeenNthCalledWith(1, {
        name: 'NotoSerifJP-Regular',
        src: '/fonts/NotoSerifJP-Regular.otf',
      });
    });
  });

  describe('Tests for fontName', () => {

    const options = {
      additionalFontMap: additionalPdfFontMap,
      fontPath: '/fonts',
    }
    const pdfFont = createPdfFont(options);

    test('When normal standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'normal',
        size: 12
      });
      // Act
      const fontName = pdfFont.fontName(font);
      // Assert
      expect(fontName).toBe('Times-Roman');
    });

    test('When normal additional font', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSerifJP',
        style: 'normal',
        size: 12
      });
      // Act
      const fontName = pdfFont.fontName(font);
      // Assert
      expect(fontName).toBe('NotoSerifJP-Regular');
    });

    test('When bold standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'bold',
        size: 12
      });
      // Act
      const fontName = pdfFont.fontName(font);
      // Assert
      expect(fontName).toBe('Times-Bold');
    });

    test('When bold additional font', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSerifJP',
        style: 'bold',
        size: 12
      });
      // Act
      const fontName = pdfFont.fontName(font);
      // Assert
      expect(fontName).toBe('NotoSerifJP-Bold');
    });

    test('When italic standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'italic',
        size: 12
      });
      // Act
      const fontName = pdfFont.fontName(font);
      // Assert
      expect(fontName).toBe('Times-Italic');
    });

    test('When bold italic standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'italic,bold',
        size: 12
      });
      // Act
      const fontName = pdfFont.fontName(font);
      // Assert
      expect(fontName).toBe('Times-BoldItalic');
    });

  });

  describe('Tests for textOption', () => {

    const options = {
      additionalFontMap: additionalPdfFontMap,
      fontPath: '../__test_assets__/font',
    }
    const pdfFont = createPdfFont(options);


    test('When normal standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'normal',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({});
    });

    test('When normal additional font', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSerifJP',
        style: 'normal',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({});
    });

    test('When italic standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'italic',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({});
    });

    test('When italic additional font', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSerifJP',
        style: 'italic',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({
        oblique: true,
      });
    });

    test('Should not change original options', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSerifJP',
        style: 'italic,underline',
        size: 12
      });
      const font2 = createFont({
        family: 'NotoSerifJP',
        style: 'italic',
        size: 12
      });
      const textOption = pdfFont.textOption(font);
      expect(textOption).toEqual({
        oblique: true,
        underline: true,
      });
      // Act
      const textOption2 = pdfFont.textOption(font2);
      // Assert
      expect(textOption2).toEqual({
        oblique: true,
      });
    })

    test('When strike standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'strike',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({
        strike: true,
      });
    });

    test('When underline standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'underline',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({
        underline: true,
      });
    });

    test('When strike and underline standard font', () => {
      // Arrange
      const font = createFont({
        family: 'TimesRoman',
        style: 'strike,underline',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({
        strike: true,
        underline: true,
      });
    });

    test('When strike, underline and italic additional font', () => {
      // Arrange
      const font = createFont({
        family: 'NotoSerifJP',
        style: 'strike,underline,italic',
        size: 12
      });
      // Act
      const textOption = pdfFont.textOption(font);
      // Assert
      expect(textOption).toEqual({
        oblique: true,
        strike: true,
        underline: true,
      });
    });

  });

});
