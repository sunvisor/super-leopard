/**
 * Test for Font
 *
 * Created by sunvisor on 2023/11/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Font, FontStyleType } from "./Font";
import { describe } from 'vitest';

describe('Tests for Font', () => {

  describe('Tests for Creation', () => {

    test('Creating Font instance', () => {
      // Arrange
      const config = {
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      };
      // Act
      const font = new Font(config);
      // Assert
      expect(font.family).toBe(config.family);
      expect(font.style).toEqual(config.style);
      expect(font.size).toBe(config.size);
    });

    test('size must be more than 0', () => {
      // Arrange
      const config = {
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: -1
      };
      // Act
      // Assert
      expect(() => new Font(config)).toThrow('size must be more than 0');
    });

    test('Creating Font instance with multiple styles', () => {
      // Arrange
      const config = {
        family: 'serif',
        style: [
          FontStyleType.ITALIC,
          FontStyleType.BOLD,
          FontStyleType.UNDERLINE,
          FontStyleType.STRIKE
        ],
        size: 12
      };
      // Act
      const font = new Font(config);
      // Assert
      expect(font.style).toEqual(config.style);
    });

    test('style can be omitted and default to []', () => {
      // Arrange
      const config = {
        family: 'serif',
        size: 12
      };
      // Act
      const font = new Font(config);
      // Assert
      expect(font.style).toEqual([]);
      expect(font.config).toEqual(config);
    });

  });

  describe('Tests for config', () => {

    it('should return config values', () => {
      // Arrange
      const config = {
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      };
      // Act
      const font = new Font(config);
      // Assert
      expect(font.config).toEqual(config);
    });

  });

  describe('Tests for set', () => {

    it('should return a new instance with changed family', () => {
      // Arrange
      const font = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      // Act
      const result = font.set('family', 'sans-serif');
      // Assert
      expect(result.family).toBe('sans-serif');
      expect(result.style).toEqual(font.style);
      expect(result.size).toBe(font.size);
    });

    it('should return a new instance with changed style', () => {
      // Arrange
      const font = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      // Act
      const result = font.set('style', [FontStyleType.BOLD]);
      // Assert
      expect(result.family).toBe(font.family);
      expect(result.style).toEqual([FontStyleType.BOLD]);
      expect(result.size).toBe(font.size);
    });

    it('should return a new instance with changed size', () => {
      // Arrange
      const font = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      // Act
      const result = font.set('size', 14);
      // Assert
      expect(result.family).toBe(font.family);
      expect(result.style).toEqual(font.style);
      expect(result.size).toBe(14);
    });

  });

  describe('Tests for equals', () => {

    it('should return true when font is equal', () => {
      // Arrange
      const font1 = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      const font2 = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      // Act
      const result = font1.equals(font2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return true when even if style order is different', () => {
      // Arrange
      const font1 = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC, FontStyleType.BOLD],
        size: 12
      });
      const font2 = new Font({
        family: 'serif',
        style: [FontStyleType.BOLD, FontStyleType.ITALIC],
        size: 12
      });
      // Act
      const result = font1.equals(font2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when family are not equal', () => {
      // Arrange
      const font1 = new Font({
        family: 'serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      const font2 = new Font({
        family: 'sans-serif',
        style: [FontStyleType.ITALIC],
        size: 12
      });
      // Act
      const result = font1.equals(font2);
      // Assert
      expect(result).toBe(false);
    });

  });

});
