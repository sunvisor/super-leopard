/**
 * Test for LineSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { LineSelector } from "./LineSelector";
import { Border, Color, DPPX, Line, Scale, UnitType } from '../object';
import { Position } from '../value';

describe('Tests for LineSelector', () => {

  const scale = new Scale({ unit: UnitType.INCH });
  const selector = new LineSelector(scale, {
    minTolerance: 3,
  });
  const border = new Border({ width: 1, color: new Color('#000000') });
  const line = new Line({ x1: 1, y1: 1, x2: 11, y2: 6, border });

  describe('Test for hitTest', () => {

    test('Should return true when hit occurs on a horizontal line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 100, y2: 1, border });
      const pos: Position = { x: DPPX, y: DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    test('Should return true when hit occurs on a horizontally reversed line', () => {
      // Arrange
      const line = new Line({ x1: 100, y1: 1, x2: 1, y2: 1, border });
      const pos: Position = { x: DPPX, y: DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    test('Should return false when hit does not occur on a horizontal line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 100, y2: 1, border });
      const pos: Position = { x: DPPX, y: DPPX * 2 };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(false);
    });

    test('Should return true when hit occurs on a vertical line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 1, y2: 100, border });
      const pos: Position = { x: DPPX, y: 100 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    test('Should return true when hit occurs on a vertically reversed line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 100, x2: 1, y2: 1, border });
      const pos: Position = { x: DPPX, y: 100 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    test('Should return false when hit does not occur on a vertical line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 1, y2: 100, border });
      const pos: Position = { x: DPPX, y: 102 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(false);
    });

    test('Should return true when hit occurs on a diagonal line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 100, y2: 100, border });
      const pos: Position = { x: 50 * DPPX, y: 50 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    test('Should return true when hit occurs on a diagonal reversed line', () => {
      // Arrange
      const line = new Line({ x1: 100, y1: 100, x2: 1, y2: 1, border });
      const pos: Position = { x: 50 * DPPX, y: 50 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    test('Should return false when hit does not occur on a diagonal line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 100, y2: 100, border });
      const pos: Position = { x: 50 * DPPX, y: 55 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(false);
    });

  });

  describe('Tests for inTheBox', () => {

    test('Should return true when the line is in the box', () => {
      // Arrange
      const box = { x: DPPX - 1, y: DPPX - 1, width: DPPX * 11, height: DPPX * 6 };
      // Act
      const isInBox = selector.inTheBox(box, line);
      // Assert
      expect(isInBox).toBe(true);
    });

    test('Should return false when the line is not in the box', () => {
      // Arrange
      const box = { x: DPPX + 1, y: DPPX + 1, width: DPPX * 10, height: DPPX * 5 };
      // Act
      const isInBox = selector.inTheBox(box, line);
      // Assert
      expect(isInBox).toBe(false);
    });

  });

});
