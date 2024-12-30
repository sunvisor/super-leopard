/**
 * Test for Page
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Page, OrientationType } from "./Page";
import { Size } from "../../value";
import { UnitType } from '../scale';
import { describe } from 'vitest';

describe('Tests for Page', () => {

  const unit = UnitType.MILLIMETER;

  describe('Tests for creation', () => {

    test('Create Page instance with size', () => {
      // Arrange
      const size: Size = { width: 100, height: 200 };
      const orientation = OrientationType.PORTRAIT;
      // Act
      const page = new Page({ size, orientation, unit });
      // Assert
      expect(page.width).toBe(100);
      expect(page.height).toBe(200);
      expect(page.size).toEqual(size);
      expect(page.orientation).toBe(orientation);
      expect(page.margin).toBeUndefined();
    });

    test('Create Page instance with unit', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.PORTRAIT;
      // Act
      const page = new Page({ size, orientation, unit: UnitType.INCH });
      // Assert
      expect(page.unit).toBe(UnitType.INCH);
    });

    test('Create Page instance with margin', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.PORTRAIT;
      const margin = { top: 10, left: 40 };
      // Act
      const page = new Page({ size, orientation, unit, margin });
      // Assert
      expect(page.margin).toEqual(margin);
    });

    test('width should be positive', () => {
      // Arrange
      const size: Size = { width: -100, height: 200 };
      // Act
      // Assert
      expect(() => new Page({ size, unit })).toThrow('width must be positive');
    });

    test('height should be positive', () => {
      // Arrange
      const size: Size = { width: 100, height: -200 };
      // Act
      // Assert
      expect(() => new Page({ size, unit })).toThrow('height must be positive');
    });

    test('Should set default orientation to PORTRAIT', () => {
      // Arrange
      const size = "A4";
      // Act
      const page = new Page({ size, unit });
      // Assert
      expect(page.orientation).toBe(OrientationType.PORTRAIT);
    });

    test('width and height should set appropriately when set string to size', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.PORTRAIT;
      // Act
      const page = new Page({ size, orientation, unit });
      // Assert
      expect(page.width).toBe(210);
      expect(page.height).toBe(297);
      expect(page.size).toBe(size);
      expect(page.orientation).toBe(orientation);
    });

    test('width and height should be inches when unit is inch', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.PORTRAIT;
      // Act
      const page = new Page({ size, orientation, unit: UnitType.INCH });
      // Assert
      expect(page.width).toBe(8.268);
      expect(page.height).toBe(11.693);
      expect(page.size).toBe(size);
      expect(page.orientation).toBe(orientation);
    });

    test('width and height should be points when unit is point', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.PORTRAIT;
      // Act
      const page = new Page({ size, orientation, unit: UnitType.POINT });
      // Assert
      expect(page.width).toBe(595.276);
      expect(page.height).toBe(841.89);
      expect(page.size).toBe(size);
      expect(page.orientation).toBe(orientation);
    });

    test('Should throw error when size is invalid', () => {
      // Arrange
      const size = "unknown";
      const orientation = OrientationType.PORTRAIT;
      // Act & Assert
      expect(
        () => new Page({ size, orientation, unit })
      ).toThrow('Unknown paper size: unknown');
    });

    test('width and height should be swapped when orientation is LANDSCAPE', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.LANDSCAPE;
      // Act
      const page = new Page({ size, orientation, unit });
      // Assert
      expect(page.width).toBe(297);
      expect(page.height).toBe(210);
      expect(page.size).toBe(size);
      expect(page.orientation).toBe(orientation);
    });

  });

  describe('Test for config', () => {

    test('Should return config values', () => {
      // Arrange
      const size = "A4";
      const orientation = OrientationType.PORTRAIT;
      const margin = { top: 10, left: 40 };
      // Act
      const page = new Page({ size, orientation, unit, margin });
      // Assert
      expect(page.config).toEqual({
        size,
        orientation,
        unit,
        margin
      });
    });

  });

});
