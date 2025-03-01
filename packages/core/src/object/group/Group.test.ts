/**
 * Test for Group
 *
 * Created by sunvisor on 2023/12/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { DirectionType, DirectionValue, Group } from "./Group";
import { Shapes } from '../shapes';
import { Box, Position } from '../../value';
import { GroupShape } from '../shape';
import { createList, createShapes } from '../../creator';
import { describe, expect } from 'vitest';
import { listTestData } from '../../__test_assets__';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


describe('Tests for Group', () => {
  const shapes = createShapes(shapeTestData);
  const group = new Group({
    shapes,
    repeatCount: 10,
    direction: DirectionType.HORIZONTAL,
    width: 100,
    height: 110,
  });

  describe('Tests for create Group', () => {
    test('Creating Group instance', () => {
      // Act
      const group = new Group({ shapes });
      // Assert
      expect(group.type).toBe(GroupShape);
      expect(group.shapes).toBe(shapes);
    });

    test('width should be positive', () => {
      // Arrange
      const width = -100;
      // Act
      // Assert
      expect(() => new Group({ shapes, width })).toThrow('width must be positive');
    });

    test('height should be positive', () => {
      // Arrange
      const height = -100;
      // Act
      // Assert
      expect(() => new Group({ shapes, height })).toThrow('height must be positive');
    });

    test('repeatCount should be 1 when repeatCount is not specified', () => {
      // Act
      const group = new Group({ shapes });
      // Assert
      expect(group.repeatCount).toBe(1);
      expect(group.direction).toBe(DirectionType.VERTICAL);
      expect(group.width).toBe(shapes.bbox.width);
      expect(group.height).toBe(shapes.bbox.height);
    });

    test('repeatCount should not be 0', () => {
      // Arrange
      const repeatCount = 0;
      // Act
      // Assert
      expect(() => new Group({ shapes, repeatCount })).toThrow('repeatCount must be more than 0');
    });

    test('repeatCount should be positive', () => {
      // Arrange
      const repeatCount = -1;
      // Act
      // Assert
      expect(() => new Group({ shapes, repeatCount })).toThrow('repeatCount must be more than 0');
    });

    test('Creating Group instance with vertical direction', () => {
      // Arrange
      const repeatCount = 10;
      const direction: DirectionValue = DirectionType.VERTICAL;
      const height = 100;
      // Act
      const group = new Group({ shapes, direction, repeatCount, height });
      // Assert
      expect(group.repeatCount).toBe(repeatCount);
      expect(group.direction).toBe(direction);
      expect(group.width).toBe(shapes.bbox.width);
      expect(group.height).toBe(height);
    });

    test('Creating Group instance with horizontal direction', () => {
      // Arrange
      const repeatCount = 10;
      const direction: DirectionValue = DirectionType.HORIZONTAL;
      const width = 100;
      // Act
      const group = new Group({ shapes, direction, repeatCount, width });
      // Assert
      expect(group.repeatCount).toBe(repeatCount);
      expect(group.direction).toBe(direction);
      expect(group.width).toBe(width);
      expect(group.height).toBe(shapes.bbox.height);
    });

    test('Shapes should not be empty', () => {
      // Arrange
      const shapes = createShapes([]);
      // Act
      // Assert
      expect(() => {
        new Group({
          shapes,
          repeatCount: 10, direction: DirectionType.HORIZONTAL,
          width: 100, height: 110,
        })
      }).toThrow('Shapes must have at least one shape.');
    });

    test('Group should not contain List', () => {
      // Arrange
      const list = createList(listTestData);
      const shapes = new Shapes([list]);
      // Act
      // Assert
      expect(() => new Group({ shapes })).toThrow('List is not allowed in Group.');
    })

  });

  describe('Tests for bbox', () => {

    it('should return bounding box', () => {
      // Act
      const bbox = group.bbox;
      // Assert
      expect(bbox.x).toBe(shapes.bbox.x);
      expect(bbox.y).toBe(shapes.bbox.y);
      expect(bbox.width).toBe(shapes.bbox.width);
      expect(bbox.height).toBe(shapes.bbox.height);
    });

  });

  describe('Tests for set', () => {

    it('should return a new instance with changed width', () => {
      // Arrange
      const newWidth = 200;
      // Act
      const newGroup = group.set('width', newWidth);
      // Assert
      expect(group.width).toBe(100);
      expect(newGroup.width).toBe(newWidth);
      assertOtherProperties(newGroup, group, ['width']);
    });

    it('should return a new instance with changed height', () => {
      // Arrange
      const newHeight = 210;
      // Act
      const newGroup = group.set('height', newHeight);
      // Assert
      expect(group.height).toBe(110);
      expect(newGroup.height).toBe(newHeight);
      assertOtherProperties(newGroup, group, ['height']);
    });

    it('should return a new instance with changed repeatCount', () => {
      // Arrange
      const newRepeatCount = 11;
      // Act
      const newGroup = group.set('repeatCount', newRepeatCount);
      // Assert
      expect(group.repeatCount).toBe(10);
      expect(newGroup.repeatCount).toBe(newRepeatCount);
      assertOtherProperties(newGroup, group, ['repeatCount']);
    });

    it('should return a new instance with changed direction', () => {
      // Arrange
      const newDirection: DirectionValue = DirectionType.VERTICAL;
      // Act
      const newGroup = group.set('direction', newDirection);
      // Assert
      expect(group.direction).toBe(DirectionType.HORIZONTAL);
      expect(newGroup.direction).toBe(newDirection);
      assertOtherProperties(newGroup, group, ['direction']);
    });

  });

  describe('Tests for moveTo', () => {

    it('should return a new moved instance', () => {
      // Arrange
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newGroup = group.moveTo(pos);
      // Assert
      expect(group.bbox.x).toBe(5);
      expect(group.bbox.y).toBe(5);
      expect(newGroup.bbox.x).toBe(pos.x);
      expect(newGroup.bbox.y).toBe(pos.y);
      assertOtherProperties(newGroup, group, ['shapes']);
    });

  });

  describe('Tests for resize', () => {

    it('should return a new resized instance', () => {
      // Arrange
      const box: Box = { x: 11, y: 12, width: 200, height: 210 };
      const originalBox = group.bbox;
      // Act
      const newGroup = group.resize(box);
      // Assert
      expect(group.bbox).toEqual(originalBox);
      expect(newGroup.bbox).toEqual(box);
      assertOtherProperties(newGroup, group, ['shapes']);
    });

  });
  describe('Tests for equals', () => {

    it('should return true when two Group are same', () => {
      // Arrange
      const group2 = new Group({
        shapes,
        repeatCount: 10,
        direction: DirectionType.HORIZONTAL,
        width: 100,
        height: 110,
      });
      // Act
      const result = group.equals(group2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when two Group are different', () => {
      // Arrange
      const group2 = new Group({
        shapes,
        repeatCount: 11,
        direction: DirectionType.HORIZONTAL,
        width: 100,
        height: 110,
      });
      // Act
      const result = group.equals(group2);
      // Assert
      expect(result).toBe(false);
    });

  });

  function assertOtherProperties(group1: Group, group2: Group, omitKeys: (keyof Group)[] = []) {
    const allKeys: (keyof Group)[] = [
      'width', 'height',
      'shapes', 'repeatCount', 'direction',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(group1[key]).toBe(group2[key]);
    });
  }
});
