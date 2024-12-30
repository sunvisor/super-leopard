/**
 * Test for Rect
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Rect } from "./Rect";
import { Border, Color } from "../style";
import { Box, Position } from "../../value";
import { RectShape } from '../shape';

describe('Tests for Rect', () => {

  describe('Tests for Creation', () => {

    test('Creating Rect instance', () => {
      // Act
      const rect = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      // Arrange
      expect(rect.type).toBe(RectShape);
      expect(rect.x).toBe(1);
      expect(rect.y).toBe(2);
      expect(rect.width).toBe(3);
      expect(rect.height).toBe(4);
      expect(rect.border).toBeUndefined();
      expect(rect.fillColor).toBeUndefined();
    });

    test('width should be positive', () => {
      // Arrange
      const config = { x: 1, y: 2, width: -10, height: 4 };
      // Act
      expect(() => new Rect(config)).toThrow('width must be positive');
    });

    test('height should be positive', () => {
      // Arrange
      const config = { x: 1, y: 2, width: 3, height: -10 };
      // Act
      expect(() => new Rect(config)).toThrow('height must be positive');
    });

    test('Creating Rect instance with border', () => {
      // Act
      const rect = new Rect({
        x: 1,
        y: 2,
        width: 3,
        height: 4,
        border: new Border({ width: 1, color: new Color('#000000') })
      });
      // Assert
      expect(rect.border?.width).toBe(1);
      expect(rect.border?.color?.color).toBe('#000000');
    });

    test('Creating Rect instance with fillColor', () => {
      // Act
      const rect = new Rect({ x: 1, y: 2, width: 3, height: 4, fillColor: new Color('#000000') });
      // Assert
      expect(rect.fillColor?.color).toBe('#000000');
    });

  });

  describe('Test for bbox', () => {

    test('Should return bounding box', () => {
      // Arrange
      const rect = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      // Act
      const box = rect.bbox;
      // Assert
      expect(box.x).toBe(1);
      expect(box.y).toBe(2);
      expect(box.width).toBe(3);
      expect(box.height).toBe(4);
    });

  });

  describe('Test for config', () => {

    test('Should return config values', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      // Act
      const config = rect.config;
      // Assert
      expect(config.x).toBe(1);
      expect(config.y).toBe(2);
      expect(config.width).toBe(3);
      expect(config.height).toBe(4);
      expect(config.border).toBe(border);
      expect(config.fillColor).toBe(fillColor);
    });
  });

  describe('Tests for set', () => {

    test('Should return a new instance with updated x', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newX = 11;
      // Act
      const newRect = rect.set('x', newX);
      // Assert
      expect(rect.x).toBe(1);
      expect(newRect.x).toBe(newX);
      assertOtherProperties(newRect, rect, ['x']);
    });

    test('Should return a new instance with updated y', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newY = 12;
      // Act
      const newRect = rect.set('y', newY);
      // Assert
      expect(rect.y).toBe(2);
      expect(newRect.y).toBe(newY);
      assertOtherProperties(newRect, rect, ['y']);
    });

    test('Should return a new instance with updated width', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newWidth = 13;
      // Act
      const newRect = rect.set('width', newWidth);
      // Assert
      expect(rect.width).toBe(3);
      expect(newRect.width).toBe(newWidth);
      assertOtherProperties(newRect, rect, ['width']);
    });

    test('Should return a new instance with updated height ', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newHeight = 14;
      // Act
      const newRect = rect.set('height', newHeight);
      // Assert
      expect(rect.height).toBe(4);
      expect(newRect.height).toBe(newHeight);
      assertOtherProperties(newRect, rect, ['height']);
    });

    test('Should return a new instance with updated border ', () => {
      // Arrange
      const fillColor = new Color('#ff0000');
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newBorder = new Border({ width: 2, color: new Color('#00ff00') });
      // Act
      const newRect = rect.set('border', newBorder);
      // Assert
      expect(rect.border).toBe(border);
      expect(newRect.border).toBe(newBorder);
      assertOtherProperties(newRect, rect, ['border']);
    });

    test('Should return a new instance with updated fillColor ', () => {
      // Arrange
      const fillColor = new Color('#ff0000');
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      })
      const newColor = new Color('#00ff00');
      // Act
      const newRect = rect.set('fillColor', newColor);
      // Assert
      expect(rect.fillColor).toBe(fillColor);
      expect(newRect.fillColor).toBe(newColor);
      assertOtherProperties(newRect, rect, ['fillColor']);
    });

  });

  describe('Tests for moveTo', () => {

    test('Should return a new moved instance', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newRect = rect.moveTo(pos);
      // Assert
      expect(rect.x).toBe(1);
      expect(rect.y).toBe(2);
      expect(newRect.x).toBe(11);
      expect(newRect.y).toBe(12);
      assertOtherProperties(newRect, rect, ['x', 'y']);
    });

  });

  describe('Tests for resize', () => {

    test('Should return a new resized instance', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const rect = new Rect({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const box: Box = { x: 11, y: 12, width: 13, height: 14 };
      // Act
      const newRect = rect.resize(box);
      // Assert
      expect(rect.x).toBe(1);
      expect(rect.y).toBe(2);
      expect(rect.width).toBe(3);
      expect(rect.height).toBe(4);
      expect(newRect.x).toBe(box.x);
      expect(newRect.y).toBe(box.y);
      expect(newRect.width).toBe(box.width);
      expect(newRect.height).toBe(box.height);
      assertOtherProperties(newRect, rect, ['x', 'y', 'width', 'height']);
    });

    test('Should return a new instance with height 0 when resize with height 0', () => {
      // Arrange
      const rect = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      const box: Box = { x: 11, y: 12, width: 13, height: 0 };
      // Act
      const newRect = rect.resize(box);
      // Assert
      expect(newRect.height).toBe(0);
    });

    test('Should return a new instance with specified height even if original height is 0', () => {
      // Arrange
      const rect = new Rect({ x: 1, y: 2, width: 3, height: 0 });
      const box: Box = { x: 11, y: 12, width: 13, height: 14 };
      // Act
      const newRect = rect.resize(box);
      // Assert
      expect(newRect.height).toBe(box.height);
    });

  });

  describe('Tests for equals', () => {

    test('Should return true when two Rect are same', () => {
      // Arrange
      const rect1 = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      const rect2 = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      // Act
      const isEqual = rect1.equals(rect2);
      // Assert
      expect(isEqual).toBe(true);

    });

    test('Should return false when two Rect are different', () => {
      // Arrange
      const rect1 = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      const rect2 = new Rect({ x: 2, y: 3, width: 4, height: 5 });
      // Act
      const isEqual = rect1.equals(rect2);
      // Assert
      expect(isEqual).toBe(false);
    });

  });

  function assertOtherProperties(rect1: Rect, rect2: Rect, omitKeys: (keyof Rect)[] = []) {
    const allKeys: (keyof Rect)[] = [
      'x', 'y', 'width', 'height', 'border', 'fillColor',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(rect1[key]).toBe(rect2[key]);
    });
  }

});
