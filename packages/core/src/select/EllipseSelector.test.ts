/**
 * Test for EllipseSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EllipseSelector } from "./EllipseSelector";
import { DPPX, Ellipse, Scale, UnitType } from '../object';
import { Position } from '../value';

describe('Tests for EllipseSelector', () => {

  const scale = new Scale({ unit: UnitType.INCH });
  const selector = new EllipseSelector(scale);
  const ellipse = new Ellipse({ x: 1, y: 1, width: 10, height: 5 });

  describe('Tests for hitTest', () => {

    it('should return true when point is in the ellipse', () => {
      // Arrange
      const pos: Position = { x: 5 * DPPX, y: 5 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, ellipse);
      // Assert
      expect(isHit).toBe(true);
    });

    it('should return false when point is not in the ellipse', () => {
      // Arrange
      const pos: Position = { x: DPPX, y: DPPX };
      // Act
      const isHit = selector.hitTest(pos, ellipse);
      // Assert
      expect(isHit).toBe(false);
    });

    test('Returns true if the hit test detects a hit at the exact boundary', () => {
      // Arrange
      const pos: Position = { x: 6 * DPPX, y: DPPX };
      // Act
      const isHit = selector.hitTest(pos, ellipse);
      // Assert
      expect(isHit).toBe(true);
    });

  });
  describe('Tests for inTheBox', () => {

    it('should return true when the ellipse is in the box', () => {
      // Arrange
      const box = { x: DPPX - 1, y: DPPX - 1, width: DPPX * 11, height: DPPX * 6 };
      // Act
      const isInBox = selector.inTheBox(box, ellipse);
      // Assert
      expect(isInBox).toBe(true);
    });
    it('should return false when the ellipse is not in the box', () => {
      // Arrange
      const box = { x: DPPX + 1, y: DPPX + 1, width: DPPX * 10, height: DPPX * 5 };
      // Act
      const isInBox = selector.inTheBox(box, ellipse);
      // Assert
      expect(isInBox).toBe(false);
    });
  })
});
