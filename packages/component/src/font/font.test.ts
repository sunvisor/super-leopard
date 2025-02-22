/**
 * Test for Font
 *
 * Created by sunvisor on 2024/04/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { adjustFontStyle, getFontList } from './font';
import { testFontList, testFontMap } from '../__test_assets__';
import { describe } from 'vitest';

describe('Tests for font', () => {

  describe('Tests for adjustFontStyle', () => {

    it('should exclude unsupported styles even if specified', async () => {
      // Arrange
      const family = 'RampartOne';
      const style = ['bold', 'italic'];
      const multiLine = false;
      // Act
      const result = adjustFontStyle({family, style, multiLine, fontList: testFontList});
      // Assert
      expect(result).toEqual(['italic']);
    });

    it('should set supported styles when specified', async () => {
      // Arrange
      const family = 'NotoSansJP';
      const style = ['bold', 'underline'];
      const multiLine = false;
      // Act
      const result = adjustFontStyle({family, style, multiLine, fontList: testFontList});
      // Assert
      expect(result).toEqual(['bold', 'underline']);
    });

    it('should exclude underline or strike when multiLine is true', async () => {
      // Arrange
      const family = 'NotoSansJP';
      const style = ['bold', 'underline', 'strike'];
      const multiLine = true;
      // Act
      const result = adjustFontStyle({family, style, multiLine, fontList: testFontList});
      // Assert
      expect(result).toEqual(['bold']);
    });

  });

  describe('Tests for getFontList', () => {

    it('should return font list', async () => {
      // Act
      const result = getFontList(testFontMap)
      // Assert
      expect(result).toEqual(testFontList);
    })
  })

});
