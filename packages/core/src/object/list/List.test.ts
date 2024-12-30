/**
 * Test for List
 *
 * Created by sunvisor on 2024/01/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { List, ListConfig } from "./List";
import { Shapes } from '../shapes';
import { ListShape } from '../shape';
import { createShapes } from '../../creator';
import { describe } from 'vitest';
import { createTestShapes } from '../../__test_assets__';


describe('Tests for List', () => {

  const shapes = createShapes([
    {
      type: 'rect',
      x: 0,
      y: 0,
      width: 20,
      height: 30,
      border: {
        color: '#000000',
      }
    },
    {
      type: 'field',
      name: 'field1',
      shape: {
        type: 'text',
        x: 2,
        y: 1,
        width: 50,
        height: 8,
        color: '#000000',
        font: {
          family: 'serif',
          size: 12
        }
      }
    }
  ]);

  const baseConfig: ListConfig = {
    width: 30,
    height: 40,
    rows: 10,
    columns: 1,
    direction: 'vertical',
    shapes,
  };

  describe('Test for create Line', () => {

    test('Creating List instance', () => {
      // Arrange
      const config = baseConfig;
      // Act
      const list = new List(config);
      // Assert
      expect(list).toBeInstanceOf(List);
      expect(list.type).toBe(ListShape);
      expect(list.width).toBe(config.width);
      expect(list.height).toBe(config.height);
      expect(list.rows).toBe(config.rows);
      expect(list.columns).toBe(config.columns);
      expect(list.direction).toBe(config.direction);
      expect(list.shapes).toBe(config.shapes);
    });

    test('width must be positive', () => {
      // Arrange
      const config = {
        ...baseConfig,
        width: -1
      };
      // Act
      // Assert
      expect(() => new List(config)).toThrow('width must be positive');
    });

    test('height must be positive', () => {
      // Arrange
      const config = {
        ...baseConfig,
        height: -1
      };
      // Act
      // Assert
      expect(() => new List(config)).toThrow('height must be positive');
    });

    test('Should throw error when List contains List', () => {
      // Arrange
      const config = {
        ...baseConfig,
        shapes: new Shapes([new List({ ...baseConfig })]),
      };
      // Act
      // Assert
      expect(() => new List(config)).toThrow('List can not have List');
    });

    test('Should throw error when List does not contains Field', () => {
      // Arrange
      const config = {
        ...baseConfig,
        shapes: new Shapes(createTestShapes()),
      };
      // Act
      // Assert
      expect(() => new List(config)).toThrow('List must have at least one Field');
    });

    test('Should throw error when columns is less than 1', () => {
      // Arrange
      const config = {
        ...baseConfig,
        columns: 0,
      };
      // Act
      // Assert
      expect(() => new List(config)).toThrow('columns must be more than 0');
    });

    test('Should throw error when rows is less than 1', () => {
      // Arrange
      const config = {
        ...baseConfig,
        rows: 0,
      };
      // Act
      // Assert
      expect(() => new List(config)).toThrow('rows must be more than 0');
    });

    test('rows should be 1 when rows is omitted', () => {
      // Arrange
      const { rows, ...config } = baseConfig;
      // Act
      const list = new List(config);
      // Assert
      expect(list.rows).toBe(1);
    });

    test('columns should be 1 when columns is omitted', () => {
      // Arrange
      const { columns, ...config } = baseConfig;
      // Act
      const list = new List(config);
      // Assert
      expect(list.columns).toBe(1);
    });

    test('direction should be vertical when direction is omitted', () => {
      // Arrange
      const { direction, ...config } = baseConfig;
      // Act
      const list = new List(config);
      // Assert
      expect(list.direction).toBe('vertical');
    });

  });

  describe('Test for config', () => {

    test('Should return config values', () => {
      // Arrange
      const config = baseConfig;
      // Act
      const list = new List(config);
      // Assert
      expect(list.config).toEqual(config);
    });

  });

  describe('Test for bbox', () => {

    test('Should return bounding box', () => {
      // Arrange
      const list = new List(baseConfig);
      // Act
      const bbox = list.bbox;
      // Assert
      expect(bbox.x).toBe(shapes.bbox.x);
      expect(bbox.y).toBe(shapes.bbox.y);
      expect(bbox.width).toBe(shapes.bbox.width);
      expect(bbox.height).toBe(shapes.bbox.height);
    });

  });

  describe('Test for listCount', () => {

    test.each([
      [ 10, 1, 10 ],
      [ 1, 10, 10 ],
      [ 10, 10, 100 ],
    ])('Should return list count rows=%i, columns=%i, expected=%i', (rows: number, columns: number, expected: number) => {
      // Arrange
      const list = new List({
        ...baseConfig,
        rows,
        columns,
      });
      // Act
      const listCount = list.listCount;
      // Assert
      expect(listCount).toBe(expected);
    });

  });

  describe('Test for set', () => {

    test('Should return a new instance with updated width', () => {
      // Arrange
      const list = new List(baseConfig);
      const newWidth = 100;
      // Act
      const newList = list.set('width', newWidth);
      // Assert
      expect(newList.width).toBe(newWidth);
      assertOtherProperties(list, newList, ['width']);
    });

    test('Should return a new instance with updated height', () => {
      // Arrange
      const list = new List(baseConfig);
      const newHeight = 100;
      // Act
      const newList = list.set('height', newHeight);
      // Assert
      expect(newList.height).toBe(newHeight);
      assertOtherProperties(list, newList, ['height']);
    });

    test('Should return a new instance with updated rows', () => {
      // Arrange
      const list = new List(baseConfig);
      const newRows = 100;
      // Act
      const newList = list.set('rows', newRows);
      // Assert
      expect(newList.rows).toBe(newRows);
      assertOtherProperties(list, newList, ['rows']);
    });

    test('Should return a new instance with updated columns', () => {
      // Arrange
      const list = new List(baseConfig);
      const newColumns = 100;
      // Act
      const newList = list.set('columns', newColumns);
      // Assert
      expect(newList.columns).toBe(newColumns);
      assertOtherProperties(list, newList, ['columns']);
    });

    test('Should return a new instance with updated direction', () => {
      // Arrange
      const list = new List(baseConfig);
      const newDirection = 'horizontal';
      // Act
      const newList = list.set('direction', newDirection);
      // Assert
      expect(newList.direction).toBe(newDirection);
      assertOtherProperties(list, newList, ['direction']);
    });

    test('Should return a new instance with updated shapes', () => {
      // Arrange
      const list = new List(baseConfig);
      const newShapes = createShapes([{
        type: 'field',
        name: 'field1',
        shape: {
          type: 'text',
          x: 0,
          y: 0,
          width: 50,
          height: 8,
          color: '#000000',
          font: {
            family: 'serif',
            size: 12
          }
        }
      }]);
      // Act
      const newList = list.set('shapes', newShapes);
      // Assert
      expect(newList.shapes).toBe(newShapes);
      expect(newList.shapes.count).toBe(1)
      assertOtherProperties(list, newList, ['shapes']);
    });

  });

  describe('Test for moveTo', () => {

    test('Should return a new moved instance', () => {
      // Arrange
      const list = new List(baseConfig);
      const pos = { x: 100, y: 100 };
      // Act
      const newList = list.moveTo(pos);
      // Assert
      expect(newList.bbox.x).toBe(pos.x);
      expect(newList.bbox.y).toBe(pos.y);
      assertOtherProperties(list, newList, ['shapes']);
    });

  });

  describe('Test for resize', () => {

    test('Should return a new resized instance', () => {
      // Arrange
      const list = new List(baseConfig);
      const box = { x: 100, y: 100, width: 100, height: 100 };
      // Act
      const newList = list.resize(box);
      // Assert
      expect(newList.bbox.x).toBe(box.x);
      expect(newList.bbox.y).toBe(box.y);
      expect(newList.bbox.width).toBe(box.width);
      expect(newList.bbox.height).toBe(box.height);
      assertOtherProperties(list, newList, ['shapes']);
    });

  });

  describe('Test for equals', () => {

    test('Should return true when two List are same', () => {
      // Arrange
      const list = new List(baseConfig);
      const list2 = new List(baseConfig);
      // Act
      const result = list.equals(list2);
      // Assert
      expect(result).toBe(true);
    });

    test('Should return false when two List are different', () => {
      // Arrange
      const list = new List(baseConfig);
      const list2 = new List({ ...baseConfig, width: 100 });
      // Act
      const result = list.equals(list2);
      // Assert
      expect(result).toBe(false);
    });

  });

  function assertOtherProperties(list1: List, list2: List, omitKeys: (keyof List)[] = []) {
    const allKeys: (keyof List)[] = [
      'width', 'height', 'rows', 'columns', 'direction', 'shapes',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(list1[key]).toBe(list2[key]);
    });
  }
});
