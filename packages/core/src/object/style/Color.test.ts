/**
 * Test for Color
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Color } from "./Color";
import { describe } from 'vitest';

describe('Tests for Color', () => {

  describe('Creating Color instance', () => {

    test('Create Color with RGB', () => {
      // Act
      const color = new Color({ r: 0, g: 0, b: 0 });
      // Assert
      expect(color.color).toEqual('#000000');
    });

    test('Create Color with Hex string', () => {
      // Act
      const color = new Color('#0080ff');
      // Assert
      expect(color.color).toEqual('#0080ff');
    });

    test('Create Color with three digit Hex string', () => {
      // Act
      const color = new Color('#08f');
      // Assert
      expect(color.color).toEqual('#08f');
    });

  });

  describe('Tests for Invalid Color', () => {

    test('Should throw an error when invalid color type red', () => {
      expect(() => new Color({ r: 256, g: 0, b: 0 })).toThrow('Invalid RGB color');
    });

    test('Should throw an error when invalid color type green', () => {
      expect(() => new Color({ r: 0, g: -1, b: 0 })).toThrow('Invalid RGB color');
    });

    test('Should throw an error when invalid color type blue', () => {
      expect(() => new Color({ r: 0, g: 0, b: 256 })).toThrow('Invalid RGB color');
    });

    test('Should throw an error when hex string does not start with #', () => {
      expect(() => new Color('000000')).toThrow('Invalid color type');
    });

    test('Should throw an error when hex string is invalid', () => {
      expect(() => new Color('#string')).toThrow('Invalid hex color');
    });

    test('Should throw an error when invalid hex length', () => {
      expect(() => new Color('#0000000')).toThrow('Invalid hex color');
    });

  });
});
