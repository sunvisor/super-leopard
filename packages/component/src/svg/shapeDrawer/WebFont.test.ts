/**
 * Test for WebFont
 *
 * Created by sunvisor on 2025/02/08.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { WebFont } from "./WebFont";
import { describe } from 'vitest';
import { testFontMap } from '../../__test_assets__';
import { createFont, createScale, FontData } from '@sunvisor/super-leopard-core';

describe('Tests for WebFont', () => {

  const data: FontData = {
    family: 'TimesRoman',
    size: 12
  }
  const webFont = new WebFont(testFontMap);

  describe('Tests for svgFontParams method', () => {

    it('should return font style', () => {
      // Arrange
      const scale = createScale({ unit: 'mm' });
      const font = createFont(data);
      // Act
      const result = webFont.svgFontParams(font, scale);
      // Assert
      expect(result).toEqual({
        family: 'Times New Roman',
        size: 16,
        style: 'normal',
        weight: 'normal',
      });
    });

  });

  describe('Tests for textDecoration method', () => {

    it('should return text decoration', () => {
      // Arrange
      const font = createFont({
        ...data,
        style: 'bold,underline'
      });
      // Act
      const result = webFont.textDecoration(font);
      // Assert
      expect(result).toEqual('underline');
    });

    it('should return undefined when text decoration is not specified', () => {
      // Arrange
      const font = createFont({
        ...data,
      });
      // Act
      const result = webFont.textDecoration(font);
      // Assert
      expect(result).toBeUndefined();
    });

  });

  describe('Tests for webFontAttr method', () => {

    it('should return web font attribute', () => {
      // Arrange
      const font = createFont(data);
      // Act
      const attr = webFont.webFontAttr(font);
      // Assert
      expect(attr).toEqual('normal normal 12pt "Times New Roman"');
    });

  });
});
