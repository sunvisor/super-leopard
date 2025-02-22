/**
 * Test for RectSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { RectSelector } from "./RectSelector";
import { DPPX, Rect, Scale, UnitType } from '../object';
import { Position } from '../value';

describe('Tests for RectSelector', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const selector = new RectSelector(scale);
  const rect = new Rect({ x: 1, y: 1, width: 10, height: 5 });

  describe('Tests for hitTest', () => {

    it('should return true when point is in the rect', () => {
      // Arrange
      const pos: Position = { x: 5 * DPPX, y: 5 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, rect);
      // Assert
      expect(isHit).toBe(true);
    });

    it('should return false when point is not in the rect', () => {
      // Arrange
      const pos: Position = { x: DPPX - 1, y: DPPX - 1 };
      // Act
      const isHit = selector.hitTest(pos, rect);
      // Assert
      expect(isHit).toBe(false);
    });

  });

  describe('Tests for inTheBox', () => {

    it('should return true when the rect is in the box', () => {
      // Arrange
      const box = { x: DPPX - 1, y: DPPX - 1, width: DPPX * 11, height: DPPX * 6 };
      // Act
      const isInBox = selector.inTheBox(box, rect);
      // Assert
      expect(isInBox).toBe(true);
    });

    it('should return false when the rect is not in the box', () => {
      // Arrange
      const box = { x: DPPX + 1, y: DPPX + 1, width: DPPX * 10, height: DPPX * 5 };
      // Act
      const isInBox = selector.inTheBox(box, rect);
      // Assert
      expect(isInBox).toBe(false);
    });

  });

});
