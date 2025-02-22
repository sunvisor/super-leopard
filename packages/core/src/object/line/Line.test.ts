/**
 * Test for Line
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Line } from "./Line";
import { Border, Color } from "../style";
import { Box, Position, PositionPair } from "../../value";
import { LineShape } from '../shape';
import { describe, expect } from 'vitest';

describe('Tests for Line', () => {
  const border = new Border({ width: 1, color: new Color('#000000') });

  describe('Test for create Line', () => {

    test('Creating Line instance', () => {
      // Act
      const line = new Line({ x1: 1, y1: 2, x2: 3, y2: 4, border });
      // Assert
      expect(line.type).toBe(LineShape);
      expect(line.x1).toBe(1);
      expect(line.y1).toBe(2);
      expect(line.x2).toBe(3);
      expect(line.y2).toBe(4);
      expect(line.border).toBe(border);
    });

  });

  describe('Tests for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 30, y2: 40, border });
      // Act
      const bbox = line.bbox;
      // Assert
      expect(bbox.x).toBe(10);
      expect(bbox.y).toBe(20);
      expect(bbox.width).toBe(20);
      expect(bbox.height).toBe(20);
    });

  });

  describe('Tests for positions', () => {

    it('should return positions', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 30, y2: 40, border });
      // Act
      const positions = line.positions;
      // Assert
      expect(positions.x1).toBe(10);
      expect(positions.y1).toBe(20);
      expect(positions.x2).toBe(30);
      expect(positions.y2).toBe(40);
    });

  });

  describe('Tests for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const line = new Line({ x1: 30, y1: 40, x2: 10, y2: 20, border });
      // Act
      const bbox = line.bbox;
      // Assert
      expect(bbox.x).toBe(10);
      expect(bbox.y).toBe(20);
      expect(bbox.width).toBe(20);
      expect(bbox.height).toBe(20);
    });

  });

  describe('Tests for moveTo', () => {

    it('should return moved Line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 2, x2: 3, y2: 4, border });
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newLine = line.moveTo(pos);
      // Assert
      expect(line.x1).toBe(1);
      expect(line.y1).toBe(2);
      expect(line.x2).toBe(3);
      expect(line.y2).toBe(4);
      expect(newLine.x1).toBe(pos.x);
      expect(newLine.y1).toBe(pos.y);
      expect(newLine.x2).toBe(13);
      expect(newLine.y2).toBe(14);
      assertOtherProperties(newLine, line, ['x1', 'y1', 'x2', 'y2']);
    });

    test('Case of x2,y2 is smaller', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const pos: Position = { x: 100, y: 200 };
      // Act
      const newLine = line.moveTo(pos);
      // Assert
      expect(newLine.x1).toBe(110);
      expect(newLine.y1).toBe(220);
      expect(newLine.x2).toBe(100);
      expect(newLine.y2).toBe(200);
      expect(newLine.bbox.x).toBe(pos.x);
      expect(newLine.bbox.y).toBe(pos.y);
      expect(newLine.bbox.width).toBe(line.bbox.width);
      expect(newLine.bbox.height).toBe(line.bbox.height);
      assertOtherProperties(newLine, line, ['x1', 'y1', 'x2', 'y2']);
    });

  });

  describe('Tests for resize', () => {

    it('should return resized Line', () => {
      // Arrange
      const line = new Line({ x1: 1, y1: 2, x2: 3, y2: 4, border });
      const box: Box = { x: 11, y: 12, width: 13, height: 14 };
      // Act
      const newLine = line.resize(box);
      // Assert
      expect(line.x1).toBe(1);
      expect(line.y1).toBe(2);
      expect(line.x2).toBe(3);
      expect(line.y2).toBe(4);
      assertAxis(newLine, box);
      assertOtherProperties(newLine, line, ['x1', 'y1', 'x2', 'y2']);
    });

    test('Case of x2,y2 is smaller', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const box: Box = { x: 10, y: 20, width: 100, height: 200 };
      // Act
      const newLine = line.resize(box);
      // Assert
      expect(newLine.x1).toBe(box.x + box.width);
      expect(newLine.y1).toBe(box.y + box.height);
      expect(newLine.x2).toBe(box.x);
      expect(newLine.y2).toBe(box.y);
      expect(newLine.bbox.x).toBe(box.x);
      expect(newLine.bbox.y).toBe(box.y);
      expect(newLine.bbox.width).toBe(box.width);
      expect(newLine.bbox.height).toBe(box.height);
      assertOtherProperties(newLine, line, ['x1', 'y1', 'x2', 'y2']);
    });

    test('Case of x1=x2 and y1=y2', () => {
      // Arrange
      const line = new Line({ x1: 0, y1: 20, x2: 0, y2: 20, border });
      const box: Box = { x: 0, y: 20, width: 100, height: 200 };
      // Act
      const newLine = line.resize(box);
      // Assert
      assertAxis(newLine, box)
      assertOtherProperties(newLine, line, ['x1', 'y1', 'x2', 'y2']);
    });
  });

  describe('Tests for set', () => {

    it('should return new instance with updated x1', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const x1 = 100;
      // Act
      const newLine = line.set('x1', x1);
      // Assert
      expect(line.x1).toBe(10);
      expect(newLine.x1).toBe(x1);
      assertOtherProperties(newLine, line, ['x1']);
    });

    it('should return new instance with updated y1', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const y1 = 100;
      // Act
      const newLine = line.set('y1', y1);
      // Assert
      expect(line.y1).toBe(20);
      expect(newLine.y1).toBe(y1);
      assertOtherProperties(newLine, line, ['y1']);
    });

    it('should return new instance with updated x2', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const x2 = 100;
      // Act
      const newLine = line.set('x2', x2);
      // Assert
      expect(line.x2).toBe(0);
      expect(newLine.x2).toBe(x2);
      assertOtherProperties(newLine, line, ['x2']);
    });

    it('should return new instance with updated y2', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const y2 = 100;
      // Act
      const newLine = line.set('y2', y2);
      // Assert
      expect(line.y2).toBe(0);
      expect(newLine.y2).toBe(y2);
      assertOtherProperties(newLine, line, ['y2']);
    });

    it('should return new instance with updated border', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 0, y2: 0, border });
      const newBorder = new Border({ width: 2, color: new Color('#00ff00') });
      // Act
      const newLine = line.set('border', newBorder);
      // Assert
      expect(line.border).toBe(border);
      expect(newLine.border).toBe(newBorder);
      assertOtherProperties(newLine, line, ['border']);
    });

  });

  describe('Tests for setPositions', () => {

    it('should return new instance with updated positions', () => {
      // Arrange
      const line = new Line({ x1: 10, y1: 20, x2: 30, y2: 40, border });
      const positions: PositionPair = { x1: 50, y1: 60, x2: 70, y2: 80 };
      // Act
      const newLine = line.setPositions(positions);
      // Assert
      expect(line.positions).toEqual({ x1: 10, y1: 20, x2: 30, y2: 40 });
      expect(newLine.x1).toBe(positions.x1);
      expect(newLine.y1).toBe(positions.y1);
      expect(newLine.x2).toBe(positions.x2);
      expect(newLine.y2).toBe(positions.y2);
    });

  });

  describe('Tests for equals', () => {

    it('should return true when two Line are same', () => {
      // Arrange
      const line1 = new Line({ x1: 10, y1: 20, x2: 30, y2: 40, border });
      const line2 = new Line({ x1: 10, y1: 20, x2: 30, y2: 40, border });
      // Act
      const result = line1.equals(line2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when two Line are different', () => {
      // Arrange
      const line1 = new Line({ x1: 10, y1: 20, x2: 30, y2: 40, border });
      const line2 = new Line({ x1: 50, y1: 60, x2: 70, y2: 80, border });
      // Act
      const result = line1.equals(line2);
      // Assert
      expect(result).toBe(false);
    });

  });

  function assertAxis(newLine: Line, box: Box) {
    expect(newLine.x1).toBe(box.x);
    expect(newLine.y1).toBe(box.y);
    expect(newLine.x2).toBe(box.x + box.width);
    expect(newLine.y2).toBe(box.y + box.height);
  }

  function assertOtherProperties(line1: Line, line2: Line, omitKeys: (keyof Line)[] = []) {
    const allKeys: (keyof Line)[] = [
      'x1', 'y1', 'x2', 'y2', 'border'
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(line1[key]).toBe(line2[key]);
    });
  }
});
