/**
 * Test for Border
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Border } from "./Border";
import { Color } from "./Color";
import { describe } from 'vitest';

describe('Tests for border', () => {

  const color = new Color('#000000');

  describe('Tests for creation', () => {

    test('Creating a Border instance', () => {
      // Act
      const border = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      // Assert
      expect(border.width).toBe(1);
      expect(border.color).toBe(color);
      expect(border.style).toBe('solid');
      expect(border.cap).toBe('butt');
      expect(border.join).toBe('miter');
    });

    test('width should be positive', () => {
      // Arrange
      const config = { width: -1, color, style: 'solid', cap: 'butt', join: 'miter' };
      // Act
      // Assert
      expect(() => new Border(config)).toThrow('width must be positive');
    });

    test('width can be omitted and default to 1', () => {
      // Act
      const border = new Border({ color });
      // Assert
      expect(border.width).toBe(1);
    });

    test('style can be omitted and default to solid', () => {
      // Act
      const border = new Border({ width: 1, color });
      expect(border.style).toBe('solid');
    });

    test('cap can be omitted and default to butt', () => {
      // Act
      const border = new Border({ width: 1, color });
      // Assert
      expect(border.cap).toBe('butt');
    });

    test('join can be omitted and default to miter', () => {
      // Act
      const border = new Border({ width: 1, color });
      // Assert
      expect(border.join).toBe('miter');
    });

    test('Should throw an error when specified invalid border style', () => {
      expect(() => new Border({ width: 1, color, style: 'invalid' })).toThrow('Invalid border style');
    });

    test('Should throw an error when specified invalid border cap', () => {
      expect(() => new Border({ width: 1, color, cap: 'invalid' })).toThrow('Invalid border cap');
    });

    test('Should throw an error when specified invalid border join', () => {
      expect(() => new Border({ width: 1, color, join: 'invalid' })).toThrow('Invalid border join');
    });

  });
  describe('Test for config', () => {

    test('Should return config values', () => {
      // Act
      const border = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      // Assert
      expect(border.config).toEqual({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
    });

  });

  describe('Tests for equals', () => {

    test('Should return true when borders are equal', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      const border2 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      // Act
      const result = border1.equals(border2);
      // Assert
      expect(result).toBe(true);
    });

    test('Should return false when width are not equal', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      const border2 = new Border({ width: 2, color, style: 'solid', cap: 'butt', join: 'miter' });
      // Act
      const result = border1.equals(border2);
      // Assert
      expect(result).toBe(false);
    });

    test('Should return false when color are not equal', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      const border2 = new Border({ width: 1, color: new Color('#ffffff'), style: 'solid', cap: 'butt', join: 'miter' });
      // Act
      const result = border1.equals(border2);
      // Assert
      expect(result).toBe(false);
    });

    test('Should return false when style are not equal', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      const border2 = new Border({ width: 1, color, style: 'dashed', cap: 'butt', join: 'miter' });
      // Act
      const result = border1.equals(border2);
      // Assert
      expect(result).toBe(false);
    });

    test('Should return false when cap are not equal', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      const border2 = new Border({ width: 1, color, style: 'solid', cap: 'round', join: 'miter' });
      // Act
      const result = border1.equals(border2);
      // Assert
      expect(result).toBe(false);
    });

    test('Should return false when join are not equal', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      const border2 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'bevel' });
      // Act
      const result = border1.equals(border2);
      // Assert
      expect(result).toBe(false);
    });

    test('Should return false when border is undefined', () => {
      // Arrange
      const border1 = new Border({ width: 1, color, style: 'solid', cap: 'butt', join: 'miter' });
      // Act
      const result = border1.equals(undefined);
      // Assert
      expect(result).toBe(false);
    });

  });

});
