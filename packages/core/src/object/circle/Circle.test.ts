/**
 * Test for Circle
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Circle } from "./Circle";
import { Border, Color } from "../style";
import { Box, Position } from "../../value";
import { CircleShape } from '../shape';
import { Rect } from '../rect';
import { describe } from 'vitest';

describe('Tests for Circle', () => {

  describe('Tests for create Circle', () => {

    test('Creating a Circle instance with minimal parameters', () => {
      // Act
      const circle = new Circle({ x: 1, y: 2, diameter: 10 });
      // Assert
      expect(circle.type).toBe(CircleShape);
      expect(circle.x).toBe(1);
      expect(circle.y).toBe(2);
      expect(circle.cx).toBe(6);
      expect(circle.cy).toBe(7);
      expect(circle.diameter).toBe(10);
      expect(circle.radius).toBe(5);
      expect(circle.border).toBeUndefined();
      expect(circle.fillColor).toBeUndefined();
    });

    test('diameter should be positive', () => {
      // Arrange
      const diameter = -10;
      // Assert
      expect(() => new Circle({ x: 1, y: 2, diameter })).toThrow('diameter must be positive');
    });

    test('Creating a Circle instance with border', () => {
      // Act
      const circle = new Circle({
        x: 1,
        y: 2,
        diameter: 3,
        border: new Border({ width: 1, color: new Color('#000000') })
      });
      // Assert
      expect(circle.border?.width).toBe(1);
      expect(circle.border?.color?.color).toBe('#000000');
    });

    test('Creating a Circle instance with fillColor', () => {
      // Act
      const circle = new Circle({ x: 1, y: 2, diameter: 3, fillColor: new Color('#000000') });
      // Assert
      expect(circle.fillColor?.color).toBe('#000000');
    });

  });

  describe('Test for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const circle = new Circle({ x: 10, y: 10, diameter: 20 });
      // Act
      const bbox = circle.bbox;
      // Assert
      expect(bbox.x).toBe(10);
      expect(bbox.y).toBe(10);
      expect(bbox.width).toBe(20);
      expect(bbox.height).toBe(20);
    });

  });

  describe('Test for config', () => {

    it('should return config values', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const circle = new Circle({
        x: 10, y: 11, diameter: 12,
        border,
        fillColor,
      });
      // Act
      const config = circle.config;
      // Assert
      expect(config.x).toBe(10);
      expect(config.y).toBe(11);
      expect(config.diameter).toBe(12);
      expect(config.border).toBe(border);
      expect(config.fillColor).toBe(fillColor);
    });

  });

  describe('Test for moveTo', () => {

    it('should return new moved instance', () => {
      // Arrange
      const circle = new Circle({
        x: 1, y: 2, diameter: 3,
        border: new Border({ width: 1, color: new Color('#0000ff') }),
        fillColor: new Color('#ff0000'),
      });
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newCircle = circle.moveTo(pos);
      // Assert
      expect(circle.x).toBe(1);
      expect(circle.y).toBe(2);
      expect(newCircle.x).toBe(11);
      expect(newCircle.y).toBe(12);
      assertOtherProperties(circle, newCircle, ['x', 'y']);
    });

  });

  describe('Test for resize', () => {

    it('should return new resized instance', () => {
      // Arrange
      const circle = new Circle({ x: 1, y: 2, diameter: 3 });
      const box: Box = { x: 11, y: 12, width: 10, height: 11 };
      // Act
      const newCircle = circle.resize(box);
      // Assert
      expect(circle.x).toBe(1);
      expect(circle.y).toBe(2);
      expect(circle.diameter).toBe(3);
      const newD = 10;
      expect(newCircle.x).toBe(box.x);
      expect(newCircle.y).toBe(box.y);
      expect(newCircle.diameter).toBe(newD);
      assertOtherProperties(circle, newCircle, ['x', 'y', 'diameter']);
    });

  });

  describe('Test for set', () => {

    it('should return new instance with updated x', () => {
      // Arrange
      const circle = new Circle({ x: 1, y: 2, diameter: 3 });
      const newX = 5;
      // Act
      const newCircle = circle.set('x', newX);
      // Assert
      expect(circle.x).toBe(1);
      expect(newCircle.x).toBe(newX);
      assertOtherProperties(circle, newCircle, ['x']);
    });

    it('should return a new instance with updated y', () => {
      // Arrange
      const circle = new Circle({ x: 1, y: 2, diameter: 3 });
      const newY = 5;
      // Act
      const newCircle = circle.set('y', newY);
      // Assert
      expect(circle.y).toBe(2);
      expect(newCircle.y).toBe(newY);
      assertOtherProperties(circle, newCircle, ['y']);
    });

    it('should return new instance with updated width', () => {
      // Arrange
      const circle = new Circle({ x: 1, y: 2, diameter: 3 });
      const newD = 5;
      // Act
      const newCircle = circle.set('diameter', newD);
      // Assert
      expect(circle.diameter).toBe(3);
      expect(newCircle.diameter).toBe(newD);
      assertOtherProperties(circle, newCircle, ['diameter']);
    });

    it('should return new instance with updated border', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const circle = new Circle({ x: 1, y: 2, diameter: 3, border });
      const newBorder = new Border({ width: 2, color: new Color('#ff0000') });
      // Act
      const newCircle = circle.set('border', newBorder);
      // Assert
      expect(circle.border).toBe(border);
      expect(newCircle.border).toBe(newBorder);
      assertOtherProperties(circle, newCircle, ['border']);
    });

    it('should return new instance with updated fillColor', () => {
      // Arrange
      const fillColor = new Color('#ff0000');
      const circle = new Circle({ x: 1, y: 2, diameter: 3, fillColor });
      const newFillColor = new Color('#0000ff');
      // Act
      const newCircle = circle.set('fillColor', newFillColor);
      // Assert
      expect(circle.fillColor).toBe(fillColor);
      expect(newCircle.fillColor).toBe(newFillColor);
      assertOtherProperties(circle, newCircle, ['fillColor']);
    });

  });

  describe('Test for equals', () => {

    const border1 = new Border({ width: 1, color: new Color('#0000ff') });
    const border2 = new Border({ width: 2, color: new Color('#ff0000') });

    it('should return true when two Circle are same', () => {
      // Arrange
      const circle1 = new Circle({ x: 1, y: 2, diameter: 3 });
      const circle2 = new Circle({ x: 1, y: 2, diameter: 3 });
      // Act
      const result = circle1.equals(circle2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when border are different', () => {
      // Arrange
      const circle1 = new Circle({
        x: 1,
        y: 2,
        diameter: 3,
        border: border1,
      });
      const circle2 = new Circle({
        x: 1,
        y: 2,
        diameter: 3,
        border: border2,
      });
      // Act
      const result = circle1.equals(circle2);
      // Assert
      expect(result).toBe(false);
    });

    it('should return false when other border are undefined', () => {
      // Arrange
      const circle1 = new Circle({
        x: 1,
        y: 2,
        diameter: 3,
        border: border1
      });
      const circle2 = new Circle({ x: 1, y: 2, diameter: 3 });
      // Act
      const result = circle1.equals(circle2);
      // Assert
      expect(result).toBe(false);
    });

    it('should return false when own border are undefined', () => {
      // Arrange
      const circle1 = new Circle({
        x: 1,
        y: 2,
        diameter: 3,
      });
      const circle2 = new Circle({ x: 1, y: 2, diameter: 3, border: border2 });
      // Act
      const result = circle1.equals(circle2);
      // Assert
      expect(result).toBe(false);
    });

    it('should return false when type are different', () => {
      // Arrange
      const circle1 = new Circle({ x: 1, y: 2, diameter: 3 });
      const rect = new Rect({ x: 1, y: 2, width: 3, height: 4 });
      // Act
      const result = circle1.equals(rect);
      // Assert
      expect(result).toBe(false);
    });

  });

  /**
   * Check that there are no changes to other properties.
   */
  function assertOtherProperties(circle1: Circle, circle2: Circle, omitKeys: (keyof Circle)[] = []) {
    const allKeys: (keyof Circle)[] = [
      'x', 'y', 'diameter', 'border', 'fillColor',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(circle1[key]).toBe(circle2[key]);
    });
  }

});
