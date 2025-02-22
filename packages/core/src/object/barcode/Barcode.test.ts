/**
 * Test for Barcode
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Barcode, BarcodeConfig } from "./Barcode";
import { describe } from 'vitest';
import { Box } from '../../value';


describe('Tests for Barcode', () => {
  const config: BarcodeConfig = {
    x: 10,
    y: 20,
    width: 30,
    height: 10,
    format: 'code128',
    value: 'value'
  };

  describe('Tests for constructor', () => {

    it('should create a new Barcode instance', () => {
      // Act
      const barcode = new Barcode(config);
      // Assert
      expect(barcode).toBeInstanceOf(Barcode);
      expect(barcode.x).toBe(config.x);
      expect(barcode.y).toBe(config.y);
      expect(barcode.width).toBe(config.width);
      expect(barcode.height).toBe(config.height);
      expect(barcode.format).toBe(config.format);
      expect(barcode.options.rotate).toBe('N');
      expect(barcode.value).toBe(config.value);

    });

    it('should throw error when width is negative', () => {
      // Arrange
      const wrongConfig = {
        ...config,
        width: -10,
      };
      // Act
      // Assert
      expect(() => new Barcode(wrongConfig)).toThrow('width must be positive');
    });

    it('should throw error when height is negative', () => {
      // Arrange
      const wrongConfig = {
        ...config,
        height: -10,
      };
      // Act
      // Assert
      expect(() => new Barcode(wrongConfig)).toThrow('height must be positive');
    });

    it('should throw error when invalid format is specified', () => {
      // Arrange
      const wrongConfig = {
        ...config,
        format: 'invalid',
      };
      // Act
      // Assert
      expect(() => new Barcode(wrongConfig)).toThrow('Invalid barcode format');
    });

  });

  describe('Test for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const barcode = new Barcode(config);
      // Act
      const bbox = barcode.bbox;
      // Assert
      expect(bbox.x).toBe(config.x);
      expect(bbox.y).toBe(config.y);
      expect(bbox.width).toBe(config.width);
      expect(bbox.height).toBe(config.height);
    });

  });

  describe('Tests for config', () => {

    it('should return config values', () => {
      // Arrange
      const barcode = new Barcode(config);
      // Act
      const result = barcode.config;
      // Assert
      expect(result.x).toBe(config.x);
      expect(result.y).toBe(config.y);
      expect(result.width).toBe(config.width);
      expect(result.height).toBe(config.height);
      expect(result.format).toBe(config.format);
      expect(result.options).toEqual(config.options);
      expect(result.value).toBe(config.value);
    });

    it('should not have options property when options is not specified', () => {
      // Arrange
      const config: BarcodeConfig = {
        x: 10,
        y: 20,
        width: 30,
        height: 10,
        format: 'code128',
        value: 'value'
      };
      const barcode = new Barcode(config);
      // Act
      const result = barcode.config;
      // Assert
      expect(result.options).toBeUndefined();
    });

  });

  describe('Test for set', () => {

    it('should return new instance with updated x', () => {
      // Arrange
      const barcode = new Barcode(config);
      // Act
      const newBarcode = barcode.set('x', 11);
      // Assert
      expect(barcode.x).toBe(config.x);
      expect(newBarcode.x).toBe(11);
      assertOtherProperties(newBarcode, barcode, ['x']);
    });

  });

  describe('Test for moveTo', () => {

    it('should return a new moved instance', () => {
      // Arrange
      const barcode = new Barcode(config);
      // Act
      const newBarcode = barcode.moveTo({ x: 11, y: 12 });
      // Assert
      expect(barcode.x).toBe(config.x);
      expect(barcode.y).toBe(config.y);
      expect(newBarcode.x).toBe(11);
      expect(newBarcode.y).toBe(12);
      assertOtherProperties(newBarcode, barcode, ['x', 'y']);
    });

  });

  describe('Test for resize', () => {

    it('should return a new resized instance', () => {
      // Arrange
      const barcode = new Barcode(config);
      // Act
      const box: Box = { x: 11, y: 12, width: 13, height: 14 };
      const newBarcode = barcode.resize(box);
      // Assert
      expect(barcode.bbox).toEqual({
        x: config.x, y: config.y, width: config.width, height: config.height
      });
      expect(newBarcode.bbox).toEqual(box)
      assertOtherProperties(newBarcode, barcode, ['x', 'y', 'width', 'height']);
    });

  });

  describe('Test for equals', () => {

    it('should return true when two Barcode are same', () => {
      // Arrange
      const barcode1 = new Barcode(config);
      const barcode2 = new Barcode(config);
      // Act
      const result = barcode1.equals(barcode2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when two Barcode are different', () => {
      // Arrange
      const barcode1 = new Barcode(config);
      const barcode2 = new Barcode({ ...config, x: 11 });
      // Act
      const result = barcode1.equals(barcode2);
      // Assert
      expect(result).toBe(false);
    });

  });
});

function assertOtherProperties(barcode1: Barcode, barcode2: Barcode, omitKeys: (keyof Barcode)[] = []) {
  const allKeys: (keyof Barcode)[] = [
    'x', 'y', 'width', 'height', 'format', 'value',
  ];
  allKeys.forEach(key => {
    if (omitKeys.includes(key)) {
      return;
    }
    expect(barcode1[key]).toBe(barcode2[key]);
  });
  if (!omitKeys.includes('options')) {
    expect(barcode1.options).toEqual(barcode2.options);
  }
}
