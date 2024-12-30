/**
 * Test for WebFont
 *
 * Created by sunvisor on 2025/02/08.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Text as SvgText } from '@svgdotjs/svg.js';
import { WebFont } from "./WebFont";
import { describe } from 'vitest';
import { webFontMap } from '../../__test_assets__';
import { createFont, createScale, FontData } from '@sunvisor/super-leopard-core';

describe('Tests for WebFont', () => {

  const data: FontData = {
    family: 'TimesRoman',
    size: 12
  }
  const webFont = new WebFont(webFontMap);

  describe('Tests for apply method', () => {

    it('should apply style to element', () => {
      // Arrange
      const scale = createScale({ unit: 'mm' });
      const font = createFont(data);
      const element = {
        font: vi.fn().mockReturnThis(),
        attr: vi.fn().mockReturnThis(),
      } as unknown as SvgText;
      // Act
      webFont.apply(element, font, scale);
      // Assert
      expect(element.font).toHaveBeenCalledWith({
        family: 'Times New Roman',
        size: 16,
        style: 'normal',
        weight: 'normal',
      });
      expect(element.attr).not.toHaveBeenCalled();
    });

    it('should apply text-decoration to element', () => {
      // Arrange
      const scale = createScale({ unit: 'mm' });
      const font = createFont({
        ...data,
        style: 'bold,underline'
      });
      const element = {
        font: vi.fn().mockReturnThis(),
        attr: vi.fn().mockReturnThis(),
      } as unknown as SvgText;
      // Act
      webFont.apply(element, font, scale);
      // Assert
      expect(element.font).toHaveBeenCalledWith({
        family: 'Times New Roman',
        size: 16,
        style: 'normal',
        weight: 'bold'
      });
      expect(element.attr).toHaveBeenCalledWith(
        'text-decoration', 'underline'
      );

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
