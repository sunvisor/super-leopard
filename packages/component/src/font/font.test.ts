/**
 * Test for Font
 *
 * Created by sunvisor on 2024/04/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { adjustFontStyle } from './font';
import { fontList } from '../__test_assets__';

describe('Tests for font', () => {

  describe('Tests for adjustFontStyle', () => {

    test('Should exclude unsupported styles even if specified', async () => {
      // Arrange
      const family = 'NotoSansJP';
      const style = ['bold', 'italic'];
      const multiLine = false;
      // Act
      const result = adjustFontStyle({family, style, multiLine, fontList});
      // Assert
      expect(result).toEqual(['bold']);
    });

    test('Should set supported styles when specified', async () => {
      // Arrange
      const family = 'NotoSansJP';
      const style = ['bold', 'underline'];
      const multiLine = false;
      // Act
      const result = adjustFontStyle({family, style, multiLine, fontList});
      // Assert
      expect(result).toEqual(['bold', 'underline']);
    });

    test('Should exclude underline or strike when multiLine is true', async () => {
      // Arrange
      const family = 'NotoSansJP';
      const style = ['bold', 'underline', 'strike'];
      const multiLine = true;
      // Act
      const result = adjustFontStyle({family, style, multiLine, fontList});
      // Assert
      expect(result).toEqual(['bold']);
    });

  });

});
