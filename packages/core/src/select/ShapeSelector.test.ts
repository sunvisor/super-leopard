/**
 * Test for ShapeSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createShapeSelector } from "./ShapeSelector";
import {
  Border,
  Circle,
  Color,
  DirectionType,
  DPPX,
  Ellipse,
  Group,
  Line,
  Rect,
  Scale,
  Shapes,
  UnitType
} from '../object';
import { Position } from '../value';
import { EllipseSelector } from './EllipseSelector';
import { LineSelectOptions } from './LineSelector';

const lineSelectOptions: LineSelectOptions = {
  minTolerance: 3,
}

describe('Tests for ShapeSelector', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const selector = createShapeSelector(scale, lineSelectOptions);

  describe('Tests for selecting Rect', () => {
    const rect = new Rect({ x: 1, y: 1, width: 10, height: 5 });

    describe('Tests for hitTest', () => {

      it('should return true when point is in the rect', () => {
        // Arrange
        const pos: Position = { x: 5 * DPPX, y: 2 * DPPX };
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

      it('should return true when the shape is in the box', () => {
        // Arrange
        const box = { x: DPPX - 1, y: DPPX - 1, width: DPPX * 11, height: DPPX * 6 };
        // Act
        const isInBox = selector.inTheBox(box, rect);
        // Assert
        expect(isInBox).toBe(true);
      });

      it('should return false when the shape is not in the box', () => {
        // Arrange
        const box = { x: DPPX + 1, y: DPPX + 1, width: DPPX * 10, height: DPPX * 5 };
        // Act
        const isInBox = selector.inTheBox(box, rect);
        // Assert
        expect(isInBox).toBe(false);
      });

    });

  });

  describe('Tests for Circle', () => {
    const circle = new Circle({ x: 1, y: 1, diameter: 10 });

    it('should return true when point is in the shape', () => {
      // Arrange
      const pos: Position = { x: 5 * DPPX, y: 5 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, circle);
      // Assert
      expect(isHit).toBe(true);
    });

    it('should return false when point is not in the shape', () => {
      // Arrange
      const pos: Position = { x: DPPX, y: DPPX };
      // Act
      const isHit = selector.hitTest(pos, circle);
      // Assert
      expect(isHit).toBe(false);
    });

  });

  describe('Tests for Ellipse', () => {
    const selector = new EllipseSelector(scale);

    const ellipse = new Ellipse({ x: 1, y: 1, width: 10, height: 5 });

    it('should return true when point is in the shape', () => {
      // Arrange
      const pos: Position = { x: 5 * DPPX, y: 5 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, ellipse);
      // Assert
      expect(isHit).toBe(true);
    });
    it('should return false when point is not in the shape', () => {
      // Arrange
      const pos: Position = { x: DPPX, y: DPPX };
      // Act
      const isHit = selector.hitTest(pos, ellipse);
      // Assert
      expect(isHit).toBe(false);
    });

  });

  describe('Test for Line', () => {
    const border = new Border({ width: 1, color: new Color('#000000') });

    it('should return true when hit occurs on a line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 100, y2: 100, border });
      const pos: Position = { x: 50 * DPPX, y: 50 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(true);
    });

    it('should return false when hit does not occur on a line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 1, x2: 100, y2: 100, border });
      const pos: Position = { x: 50 * DPPX, y: 55 * DPPX };
      // Act
      const hit = selector.hitTest(pos, line);
      // Assert
      expect(hit).toBe(false);
    });
  });

  describe('Tests for Group', () => {
    const rect = new Rect({ x: 1, y: 1, width: 10, height: 5 });
    const shapes = new Shapes([rect]);
    const group = new Group({
      shapes,
      repeatCount: 10,
      direction: DirectionType.HORIZONTAL,
      width: 100,
      height: 110,
    });

    it('should return true when hit occurs on a group', () => {
      // Arrange
      const pos: Position = { x: 5 * DPPX, y: 2 * DPPX };
      // Act
      const isHit = selector.hitTest(pos, group);
      // Assert
      expect(isHit).toBe(true);
    });

    it('should return false when hit does not occur on a group', () => {
      // Arrange
      const pos: Position = { x: DPPX - 1, y: DPPX - 1 };
      // Act
      const isHit = selector.hitTest(pos, group);
      // Assert
      expect(isHit).toBe(false);
    });

  });
});
