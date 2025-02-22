/**
 * Test for Ellipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Ellipse } from "./Ellipse";
import { Border, Color } from "../style";
import { Box, Position } from "../../value";
import { EllipseShape } from '../shape';
import { describe } from 'vitest';


describe('Tests for Ellipse', () => {

  describe('Tests for create Ellipse', () => {

    test('Creating a Ellipse instance with minimal parameters', () => {
      // Act
      const ellipse = new Ellipse({ x: 1, y: 2, width: 3, height: 4 });
      // Assert
      expect(ellipse.type).toBe(EllipseShape);
      expect(ellipse.x).toBe(1);
      expect(ellipse.y).toBe(2);
      expect(ellipse.width).toBe(3);
      expect(ellipse.height).toBe(4);
      expect(ellipse.border).toBeUndefined();
      expect(ellipse.fillColor).toBeUndefined();
    });

    test('width should be positive', () => {
      // Arrange
      const config = { x: 1, y: 2, width: -3, height: 4 };
      // Assert
      expect(() => new Ellipse(config)).toThrow('width must be positive');
    });

    test('height should be positive', () => {
      // Arrange
      const config = { x: 1, y: 2, width: 3, height: -4 };
      // Assert
      expect(() => new Ellipse(config)).toThrow('height must be positive');
    });

    test('Creating a Ellipse instance with border', () => {
      // Act
      const ellipse = new Ellipse({
        x: 1,
        y: 2,
        width: 3,
        height: 4,
        border: new Border({ width: 1, color: new Color('#000000') })
      });
      // Assert
      expect(ellipse.border?.width).toBe(1);
      expect(ellipse.border?.color?.color).toBe('#000000');
    });

    test('Creating a Ellipse instance with fillColor', () => {
      // Act
      const ellipse = new Ellipse({ x: 1, y: 2, width: 3, height: 4, fillColor: new Color('#000000') });
      // Assert
      expect(ellipse.fillColor?.color).toBe('#000000');
    });

  });

  describe('Tests for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const ellipse = new Ellipse({ x: 10, y: 20, width: 10, height: 20 });
      // Act
      const box = ellipse.bbox;
      // Assert
      expect(box.x).toBe(10);
      expect(box.y).toBe(20);
      expect(box.width).toBe(10);
      expect(box.height).toBe(20);
    });

  });

  describe('Test for config', () => {

    it('should return config values', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 10, y: 11, width: 12, height: 13,
        border,
        fillColor,
      });
      // Act
      const config = ellipse.config;
      // Assert
      expect(config.x).toBe(10);
      expect(config.y).toBe(11);
      expect(config.width).toBe(12);
      expect(config.height).toBe(13);
      expect(config.border).toBe(border);
      expect(config.fillColor).toBe(fillColor);
    });

  });

  describe('Test for set', () => {

    it('should return a new instance with changed x', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newX = 10;
      // Act
      const newEllipse = ellipse.set('x', newX);
      // Assert
      expect(ellipse.x).toBe(1);
      expect(newEllipse.x).toBe(newX);
      assertOtherProperties(ellipse, newEllipse, ['x']);
    });

    it('should return new instance with changed y', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newY = 10;
      // Act
      const newEllipse = ellipse.set('y', newY);
      // Assert
      expect(ellipse.y).toBe(2);
      expect(newEllipse.y).toBe(newY);
      assertOtherProperties(ellipse, newEllipse, ['y']);
    });

    it('should return new instance with changed width', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newWidth = 10;
      // Act
      const newEllipse = ellipse.set('width', newWidth);
      // Assert
      expect(ellipse.width).toBe(3);
      expect(newEllipse.width).toBe(newWidth);
      assertOtherProperties(ellipse, newEllipse, ['width']);
    });

    it('should return new instance with changed height', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newHeight = 10;
      // Act
      const newEllipse = ellipse.set('height', newHeight);
      // Assert
      expect(ellipse.height).toBe(4);
      expect(newEllipse.height).toBe(newHeight);
      assertOtherProperties(ellipse, newEllipse, ['height']);
    });

    it('should return new instance with changed border', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newBorder = new Border({ width: 2, color: new Color('#ff0000') });
      // Act
      const newEllipse = ellipse.set('border', newBorder);
      // Assert
      expect(ellipse.border).toBe(border);
      expect(newEllipse.border).toBe(newBorder);
      assertOtherProperties(ellipse, newEllipse, ['border']);
    });

    it('should return new instance with changed fillColor', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const newFillColor = new Color('#00ff00');
      // Act
      const newEllipse = ellipse.set('fillColor', newFillColor);
      // Assert
      expect(ellipse.fillColor).toBe(fillColor);
      expect(newEllipse.fillColor).toBe(newFillColor);
      assertOtherProperties(ellipse, newEllipse, ['fillColor']);
    });

  });

  describe('Test for moveTo', () => {

    it('should return a new moved instance', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newEllipse = ellipse.moveTo(pos);
      // Assert
      expect(ellipse.x).toBe(1);
      expect(ellipse.y).toBe(2);
      expect(newEllipse.x).toBe(11);
      expect(newEllipse.y).toBe(12);
      assertOtherProperties(ellipse, newEllipse, ['x', 'y']);
    });
  });

  describe('Test for resize', () => {

    it('should return new resized instance', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const box: Box = { x: 11, y: 12, width: 10, height: 11 };
      // Act
      const newEllipse = ellipse.resize(box);
      // Assert
      expect(ellipse.x).toBe(1);
      expect(ellipse.y).toBe(2);
      expect(ellipse.width).toBe(3);
      expect(ellipse.height).toBe(4);
      const newWidth = box.width;
      const newHeight = box.height;
      expect(newEllipse.x).toBe(box.x);
      expect(newEllipse.y).toBe(box.y);
      expect(newEllipse.width).toBe(newWidth);
      expect(newEllipse.height).toBe(newHeight);
      assertOtherProperties(ellipse, newEllipse, ['x', 'y', 'width', 'height']);
    });

  });

  describe('Test for equals', () => {

    it('should return true when two Ellipse are same', () => {
      // Arrange
      const border = new Border({ width: 1, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse1 = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      const ellipse2 = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border,
        fillColor,
      });
      // Act
      const equals = ellipse1.equals(ellipse2);
      // Assert
      expect(equals).toBe(true);
    });

    it('should return true when two Ellipse where border is undefined', () => {
      // Arrange
      const fillColor = new Color('#ff0000');
      const ellipse1 = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        fillColor,
      });
      const ellipse2 = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        fillColor,
      });
      // Act
      const equals = ellipse1.equals(ellipse2);
      // Assert
      expect(equals).toBe(true);
    });

    it('should return false when border are different', () => {
      // Arrange
      const border1 = new Border({ width: 1, color: new Color('#0000ff') });
      const border2 = new Border({ width: 2, color: new Color('#0000ff') });
      const fillColor = new Color('#ff0000');
      const ellipse1 = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border: border1,
        fillColor,
      });
      const ellipse2 = new Ellipse({
        x: 1, y: 2, width: 3, height: 4,
        border: border2,
        fillColor,
      });
      // Act
      const equals = ellipse1.equals(ellipse2);
      // Assert
      expect(equals).toBe(false);
    });

  });

  function assertOtherProperties(ellipse1: Ellipse, ellipse2: Ellipse, omitKeys: (keyof Ellipse)[] = []) {
    const allKeys: (keyof Ellipse)[] = [
      'x', 'y', 'width', 'height', 'border', 'fillColor',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(ellipse1[key]).toBe(ellipse2[key]);
    });
  }

});
