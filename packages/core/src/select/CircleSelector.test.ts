/**
 * Test for CircleSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CircleSelector } from "./CircleSelector";
import { Circle, DPPX, Scale, UnitType } from '../object';
import { Position } from '../value';

describe('Tests for CircleSelector', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const selector = new CircleSelector(scale);
  const circle = new Circle({ x: 1, y: 1, diameter: 10 });

  describe('Tests for hitTest', () => {

    it('should return true when point is in the circle', () => {
      // Arrange
      const pos: Position = { x: 5 * DPPX, y: 5 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, circle);
      // Assert
      expect(isHit).toBe(true);
    });

    it('should return false when point is not in the circle', () => {
      // Arrange
      const pos: Position = { x: DPPX, y: DPPX };
      // Act
      const isHit = selector.hitTest(pos, circle);
      // Assert
      expect(isHit).toBe(false);
    });

    test('Returns true if the hit test detects a hit at the exact boundary', () => {
      // Arrange
      const pos: Position = { x: DPPX, y: 6 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, circle);
      // Assert
      expect(isHit).toBe(true);
    });
  });

  describe('Tests for inTheBox', () => {

    it('should return true when the circle is in the box', () => {
      // Arrange
      const box = { x: DPPX - 1, y: DPPX - 1, width: DPPX * 11, height: DPPX * 11 };
      // Act
      const isInBox = selector.inTheBox(box, circle);
      // Assert
      expect(isInBox).toBe(true);
    });

    it('should return false when the circle is not in the box', () => {
      // Arrange
      const box = { x: DPPX + 1, y: DPPX + 1, width: DPPX * 10, height: DPPX * 10 };
      // Act
      const isInBox = selector.inTheBox(box, circle);
      // Assert
      expect(isInBox).toBe(false);
    });

  });
});
