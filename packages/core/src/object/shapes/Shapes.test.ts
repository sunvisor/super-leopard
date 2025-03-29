/**
 * Test for Shapes
 *
 * Created by sunvisor on 2023/12/09.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Shapes } from "./Shapes";
import { createShape, createShapes } from '../../creator';
import { CircleShape, ListShape, RectShape } from '../shape';
import { Group } from '../group';
import { ShapeData } from '../../data';
import { describe, expect } from 'vitest';
import { createTestShapes, listTestData } from '../../__test_assets__';
import { createRect } from '../rect';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


const nestedShapesData: ShapeData[] = [
  { type: 'rect', x: 10, y: 10, width: 10, height: 10, },
  { type: 'rect', x: 11, y: 11, width: 11, height: 11, },
  { type: 'rect', x: 12, y: 12, width: 12, height: 12, },
  {
    type: 'group', shapes: [
      { type: 'rect', x: 13, y: 13, width: 13, height: 13, },
      { type: 'rect', x: 14, y: 14, width: 14, height: 14, },
    ]
  },
  {
    type: 'group', shapes: [
      { type: 'rect', x: 15, y: 15, width: 15, height: 15, },
      { type: 'rect', x: 16, y: 16, width: 16, height: 16, },
      {
        type: 'group', shapes: [
          { type: 'rect', x: 17, y: 17, width: 17, height: 17, },
          { type: 'rect', x: 18, y: 18, width: 18, height: 18, },
        ]
      }
    ]
  }
];

describe('Tests for Shapes', () => {
  const shapeCount = shapeTestData.length;

  describe('Tests for Creation', () => {

    test('Shapes can be empty', () => {
      // Act
      const shapes = new Shapes();
      // Assert
      expect(shapes.count).toBe(0);
    });

    test('Creating Shapes instance', () => {
      // Arrange
      const items = createTestShapes();
      // Act
      const result = new Shapes(items);
      // Assert
      expect(result.count).toEqual(items.length);
      expect(result.get(0)).toEqual(items[0]);
      expect(result.get(1)).toEqual(items[1]);
      expect(result.get(2)).toEqual(items[2]);
      expect(result.get(3)).toEqual(items[3]);
    });
  });

  describe('Test for count', () => {

    it('should return shape count', () => {
      // Arrange
      const shapes = new Shapes(createTestShapes());
      // Act
      const count = shapes.count;
      // Assert
      expect(count).toBe(shapeCount);
    });

  });

  describe('Test for items', () => {

    it('should return array of shape', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const result = shapes.items;
      // Assert
      expect(result).toEqual(items);
    });
  });

  describe('Tests for get', () => {

    it('should return shape', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const item = shapes.get(1);
      // Assert
      expect(item).toEqual(items[1]);
    });

    it('should throw error when index is out of range', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      // Assert
      expect(() => shapes.get(-1)).toThrow();
      expect(() => shapes.get(shapeCount)).toThrow();
    });

  });

  describe('Tests for add', () => {

    it('should return a new instance with added shape', () => {
      // Arrange
      const shapes = new Shapes(createTestShapes());
      const newShape = createShape({
        type: CircleShape,
        x: 100,
        y: 100,
        diameter: 50,
        fillColor: '#ff0000',
      });
      // Act
      const result = shapes.add(newShape);
      // Assert
      expect(shapes.count).toEqual(shapeCount);
      expect(result.count).toEqual(shapeCount + 1);
      expect(result.get(shapeCount)).toEqual(newShape);
    });

    it('should return a new instance with added shapes', () => {
      // Arrange
      const shapes = new Shapes(createTestShapes());
      const shape1 = createShape({
        type: CircleShape,
        x: 100,
        y: 100,
        diameter: 50,
        fillColor: '#ff0000',
      });
      const shape2 = createShape({
        type: RectShape,
        x: 200,
        y: 100,
        width: 100,
        height: 100,
        fillColor: '#ff0000',
      });
      const newShapes = new Shapes([shape1, shape2]);
      // Act
      const result = shapes.add(newShapes);
      // Assert
      expect(result.count).toEqual(shapes.count + newShapes.count);
    });

  });

  describe('Tests for insert', () => {

    it('should return a new instance with inserted shape at the specified index', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      const newShape = createShape({
        type: CircleShape,
        x: 100,
        y: 100,
        diameter: 50,
        fillColor: '#ff0000',
      });
      // Act
      const result = shapes.insert(newShape, 3);
      // Assert
      expect(shapes.count).toEqual(shapeCount);
      expect(result.get(3)).toEqual(newShape);
    });

    it('should return return a new instance with inserted shapes at the specified index', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      const shape1 = createShape({
        type: CircleShape,
        x: 100,
        y: 100,
        diameter: 50,
        fillColor: '#ff0000',
      });
      const shape2 = createShape({
        type: RectShape,
        x: 200,
        y: 100,
        width: 100,
        height: 100,
        fillColor: '#ff0000',
      });
      const newShapes = new Shapes([shape1, shape2]);
      // Act
      const result = shapes.insert(newShapes, 3);
      // Assert
      expect(result.count).toEqual(shapes.count + newShapes.count);
      expect(result.get(3)).toEqual(shape1);
      expect(result.get(4)).toEqual(shape2);
    });
  });

  describe('Tests for contains', () => {

    it('should return true when specified shape exists', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const result = shapes.contains(items[1]);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when specified shape does not exist', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      const target = createShape({
        type: CircleShape,
        x: 100,
        y: 100,
        diameter: 50,
        fillColor: '#ff0000',
      });
      // Act
      const result = shapes.contains(target);
      // Assert
      expect(result).toBe(false);
    });

  });

  describe('Tests for remove', () => {

    it('should return a new instance with removed shape', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const result = shapes.remove(items[1]);
      // Assert
      expect(shapes.count).toBe(shapeCount);
      expect(result.count).toBe(shapeCount - 1);
      expect(result.get(0)).toEqual(items[0]);
      expect(result.get(1)).toEqual(items[2]);
      expect(result.get(2)).toEqual(items[3]);
    });

    it('should return a new instance with removed shapes', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      const targets = new Shapes([items[1], items[3]]);
      // Act
      const result = shapes.remove(targets);
      // Assert
      expect(result.count).toBe(shapeCount - 2);
      expect(result.get(0)).toEqual(items[0]);
      expect(result.get(1)).toEqual(items[2]);
      expect(result.get(2)).toEqual(items[4]);
    });

  });

  describe('Test for each', () => {

    it('should call callback for each shape', () => {
      // Arrange
      const shapes = new Shapes(createTestShapes());
      const result: string[] = [];
      // Act
      shapes.each((item) => {
        result.push(item.type);
      });
      // Assert
      expect(result).toEqual(['circle', 'ellipse', 'rect', 'text', 'group']);
    });

  });

  describe('Test for map', () => {

    it('should call callback for each shape and return result as array', () => {
      // Arrange
      const shapes = new Shapes(createTestShapes());
      // Act
      const result: string[] = shapes.map((item) => item.type);
      // Assert
      expect(result).toEqual(['circle', 'ellipse', 'rect', 'text', 'group']);
    });

  });

  describe('Test for some', () => {

    it('should return true when callback returns true', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const result = shapes.some((item) => item.type === 'circle');
      // Assert
      expect(result).toBe(true);
    });
  });

  describe('Test for filter', () => {

    it('should return filtered shapes', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const result = shapes.filter((item) => item.type === 'circle');
      // Assert
      expect(result.count).toBe(1);
      expect(result.get(0)).toEqual(items[0]);
    });

  });

  describe('Test for indexOf', () => {

    it('should return index of specified shape', () => {
      // Arrange
      const items = createTestShapes();
      const shapes = new Shapes(items);
      // Act
      const index = shapes.indexOf(items[1]);
      // Assert
      expect(index).toBe(1);
    });
  });

  describe('Tests for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const bbox = collection.bbox;
      // Assert
      expect(bbox.x).toEqual(5);
      expect(bbox.y).toEqual(5);
      expect(bbox.width).toEqual(100);
      expect(bbox.height).toEqual(19);
    });

    it('should return Box with all properties 0 when shapes are empty', () => {
      // Arrange
      const collection = new Shapes([]);
      // Act
      const bbox = collection.bbox;
      // Assert
      expect(bbox).toEqual({ x: 0, y: 0, width: 0, height: 0 });
    });

  });

  describe('Tests for moveTo', () => {

    it('should return a new moved instance', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = collection.moveTo({ x: 10, y: 10 });
      // Assert
      expect(collection.bbox.x).toEqual(5);
      expect(collection.bbox.y).toEqual(5);
      expect(result.bbox.x).toEqual(10);
      expect(result.bbox.y).toEqual(10);
      expect(result.bbox.width).toEqual(collection.bbox.width);
      expect(result.bbox.height).toEqual(collection.bbox.height);
    });

  });

  describe('Tests for resize', () => {

    it('should return a new resized instance', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = collection.resize({
        x: 0, y: 0, width: 200, height: 38
      });
      // Assert
      expect(collection.bbox.x).toEqual(5);
      expect(collection.bbox.y).toEqual(5);
      expect(result.bbox.x).toEqual(0);
      expect(result.bbox.y).toEqual(0);
      expect(result.get(0).bbox).toEqual({ x: 0, y: 0, width: 20, height: 20 });
      expect(result.get(1).bbox).toEqual({ x: 30, y: 0, width: 40, height: 20 });
      expect(result.get(2).bbox).toEqual({ x: 80, y: 0, width: 20, height: 20 });
      expect(result.get(3).bbox).toEqual({ x: 110, y: 0, width: 80, height: 20 });
      expect(result.bbox.width).toEqual(200);
      expect(result.bbox.height).toEqual(38);
    });
  });

  describe('Tests for align methods', () => {

    const shapesForAlign: ShapeData[] = [
      { type: 'rect', x: 10, y: 20, width: 30, height: 40 },
      { type: 'rect', x: 11, y: 21, width: 31, height: 41 },
      { type: 'rect', x: 12, y: 22, width: 32, height: 42 },
      { type: 'rect', x: 13, y: 23, width: 33, height: 43 },
    ];

    it('should return a new instance with align to top', () => {
      // Arrange
      const shapes = createTestShapes(shapesForAlign);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.alignToTop();
      // Assert
      expect(collection.get(0)).toEqual(shapes[0]);
      expect(result).not.toBe(collection);
      expect(result.get(0).bbox.y).toEqual(20);
      expect(result.get(1).bbox.y).toEqual(20);
      expect(result.get(2).bbox.y).toEqual(20);
      expect(result.get(3).bbox.y).toEqual(20);
    });

    it('should return a new instance with align to bottom', () => {
      // Arrange
      const shapes = createTestShapes(shapesForAlign);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.alignToBottom();
      // Assert
      expect(collection.get(3)).toEqual(shapes[3]);
      expect(result).not.toBe(collection);
      expect(result.get(0).bbox.y).toEqual(26);
      expect(result.get(1).bbox.y).toEqual(25);
      expect(result.get(2).bbox.y).toEqual(24);
      expect(result.get(3).bbox.y).toEqual(23);
    });

    it('should return a new instance with align to middle', () => {
      // Arrange
      const shapes = createTestShapes(shapesForAlign);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.alignToMiddle();
      // Assert
      expect(collection.get(1)).toEqual(shapes[1]);
      expect(result).not.toBe(collection);
      expect(result.get(0).bbox.y).toEqual(24.5);
      expect(result.get(1).bbox.y).toEqual(24);
      expect(result.get(2).bbox.y).toEqual(23.5);
      expect(result.get(3).bbox.y).toEqual(23);
    })

    it('should return a new instance with align to left', () => {
      // Arrange
      const shapes = createTestShapes(shapesForAlign);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.alignToLeft();
      // Assert
      expect(collection.get(0)).toEqual(shapes[0]);
      expect(result).not.toBe(collection);
      expect(result.get(0).bbox.x).toEqual(10);
      expect(result.get(1).bbox.x).toEqual(10);
      expect(result.get(2).bbox.x).toEqual(10);
      expect(result.get(3).bbox.x).toEqual(10);
    });

    it('should return a new instance with align to right', () => {
      // Arrange
      const shapes = createTestShapes(shapesForAlign);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.alignToRight();
      // Assert
      expect(collection.get(3)).toEqual(shapes[3]);
      expect(result).not.toBe(collection);
      expect(result.get(0).bbox.x).toEqual(16);
      expect(result.get(1).bbox.x).toEqual(15);
      expect(result.get(2).bbox.x).toEqual(14);
      expect(result.get(3).bbox.x).toEqual(13);
    });

    it('should return a new instance with align to center', () => {
      // Arrange
      const shapes = createTestShapes(shapesForAlign);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.alignToCenter();
      // Assert
      expect(collection.get(1)).toEqual(shapes[1]);
      expect(result).not.toBe(collection);
      expect(result.get(0).bbox.x).toEqual(14.5);
      expect(result.get(1).bbox.x).toEqual(14);
      expect(result.get(2).bbox.x).toEqual(13.5);
      expect(result.get(3).bbox.x).toEqual(13);
    });

  });

  describe('Tests for distribute methods', () => {

    it('should return a new instance with distribute horizontally', () => {
      // Arrange
      const data: ShapeData[] = [
        { type: 'rect', x: 10, y: 20, width: 10, height: 40 },
        { type: 'rect', x: 20, y: 20, width: 10, height: 40 },
        { type: 'rect', x: 40, y: 20, width: 10, height: 40 },
        { type: 'rect', x: 70, y: 20, width: 10, height: 40 },
      ];
      const shapes = createTestShapes(data);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.distributeHorizontally();
      // Assert
      expect(result).not.toBe(collection);
      expect(collection.get(1)).toEqual(shapes[1]);
      expect(result.get(0).bbox.x).toEqual(10);
      expect(result.get(1).bbox.x).toEqual(30);
      expect(result.get(2).bbox.x).toEqual(50);
      expect(result.get(3).bbox.x).toEqual(70);
    });

    it('should not change horizontal order of items', () => {
      // Arrange
      const data: ShapeData[] = [
        { type: 'ellipse', x: 70, y: 20, width: 10, height: 40 },
        { type: 'ellipse', x: 40, y: 20, width: 10, height: 40 },
        { type: 'rect', x: 20, y: 20, width: 10, height: 40 },
        { type: 'rect', x: 10, y: 20, width: 10, height: 40 },
      ];
      const shapes = createTestShapes(data);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.distributeHorizontally();
      // Assert
      expect(result).not.toBe(collection);
      expect(collection.get(1)).toEqual(shapes[1]);
      expect(result.get(0).type).toEqual('rect');
      expect(result.get(1).type).toEqual('rect');
      expect(result.get(2).type).toEqual('ellipse');
      expect(result.get(3).type).toEqual('ellipse');
    });

    it('should return a new instance with distribute vertically', () => {
      // Arrange
      const data: ShapeData[] = [
        { type: 'rect', x: 10, y: 10, width: 10, height: 10 },
        { type: 'rect', x: 20, y: 20, width: 10, height: 10 },
        { type: 'rect', x: 40, y: 40, width: 10, height: 10 },
        { type: 'rect', x: 70, y: 70, width: 10, height: 10 },
      ];
      const shapes = createTestShapes(data);
      const collection = new Shapes(shapes);
      // Act
      const result = collection.distributeVertically();
      // Assert
      expect(result).not.toBe(collection);
      expect(collection.get(1)).toEqual(shapes[1]);
      expect(result.get(0).bbox.y).toEqual(10);
      expect(result.get(1).bbox.y).toEqual(30);
      expect(result.get(2).bbox.y).toEqual(50);
      expect(result.get(3).bbox.y).toEqual(70);
    });
  });

  describe('Tests for ZOrder methods', () => {

    it('should return a new instance with specified shape bring to front', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = collection.bringToFront(shapes[2]);
      // Assert
      expect(collection.get(0)).toEqual(shapes[0]);
      expect(result).not.toBe(collection);
      expect(result.get(0)).toEqual(shapes[2]);
      expect(result.get(1)).toEqual(shapes[0]);
      expect(result.get(2)).toEqual(shapes[1]);
      expect(result.get(3)).toEqual(shapes[3]);
    });

    it('should return a new instance with specified shape send to back', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = collection.sendToBack(shapes[2]);
      // Assert
      expect(collection.get(3)).toEqual(shapes[3]);
      expect(result).not.toBe(collection);
      expect(result.get(2)).toEqual(shapes[0]);
      expect(result.get(0)).toEqual(shapes[1]);
      expect(result.get(1)).toEqual(shapes[3]);
      expect(result.get(3)).toEqual(shapes[2]);
    });

    it('should return a new instance with specified shape send to backward', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = collection.sendToBackward(shapes[2]);
      // Assert
      expect(collection.get(2)).toEqual(shapes[2]);
      expect(result).not.toBe(collection);
      expect(result.get(0)).toEqual(shapes[0]);
      expect(result.get(1)).toEqual(shapes[2]);
      expect(result.get(2)).toEqual(shapes[1]);
      expect(result.get(3)).toEqual(shapes[3]);
    });

    it('should return a new instance with specified shape bring to forward', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = collection.bringToForward(shapes[2]);
      // Assert
      expect(collection.get(2)).toEqual(shapes[2]);
      expect(result).not.toBe(collection);
      expect(result.get(0)).toEqual(shapes[0]);
      expect(result.get(1)).toEqual(shapes[1]);
      expect(result.get(2)).toEqual(shapes[3]);
      expect(result.get(3)).toEqual(shapes[2]);
    });

  });

  describe('Tests for update', () => {

    it('should return a new updated instance', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      const target = new Shapes([shapes[2], shapes[3]]);
      const updated = target.moveTo({ x: 0, y: 0 });
      // Act
      const result = collection.update(target, updated);
      // Assert
      expect(collection.get(2)).toBe(target.get(0));
      expect(collection.get(3)).toBe(target.get(1));
      expect(result.get(2)).toBe(updated.get(0));
      expect(result.get(3)).toBe(updated.get(1));
    });

    it('should throw error when targets and updated does not have same count', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      const targets = new Shapes([shapes[0], shapes[1]]);
      const updated = new Shapes([]);
      // Act
      // Assert
      expect(() => {
        collection.update(targets, updated);
      }).toThrow('targets and updated should be same count');
    });

    it('should return updated Shapes when nested shapes are specified', () => {
      // Arrange
      const shapes = createShapes(nestedShapesData)
      const item1 = shapes.get(4) as Group;
      const item2 = item1.shapes.get(2) as Group;
      const target = item2.shapes.get(1);
      const updated = createRect({
        type: 'rect', x: 100, y: 100, width: 100, height: 100,
      });
      // Act
      const result = shapes.update(new Shapes([target]), new Shapes([updated]));
      // Assert
      expect(((result.get(4) as Group).shapes.get(2) as Group).shapes.get(1)).toBe(updated);
      expect(result.get(4)).not.toBe(shapes.get(4))
    });
  });

  describe('Tests for updateShape', () => {

    it('should return a new instance with updated single shape', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      const target = shapes[0];
      const updated = createRect({
        type: 'rect', x: 100, y: 100, width: 100, height: 100,
      });
      // Act
      const result = collection.updateShape(target, updated);
      // Assert
      expect(collection.get(0)).toBe(target);
      expect(result.get(0)).toBe(updated);
    });

    it('should return a new instance with updated single shape when nested shape are specified', () => {
      // Arrange
      const shapes = createShapes(nestedShapesData)
      const item1 = shapes.get(4) as Group;
      const item2 = item1.shapes.get(2) as Group;
      const target = item2.shapes.get(1);
      const updated = createRect({
        type: 'rect', x: 100, y: 100, width: 100, height: 100,
      });
      // Act
      const result = shapes.updateShape(target, updated);
      // Assert
      expect(((result.get(4) as Group).shapes.get(2) as Group).shapes.get(1)).toBe(updated);
      expect(result.get(4)).not.toBe(shapes.get(4))
    });

  });

  describe('Tests for equals', () => {

    it('should return true when shapes are equal', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      const target = new Shapes(shapes);
      // Act
      const result = collection.equals(target);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when shapes are not equal', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      const target = new Shapes([shapes[0]]);
      // Act
      const result = collection.equals(target);
      // Assert
      expect(result).toBe(false);
    });

  });
  describe('Tests for getList', () => {

    it('should return list', () => {
      // Arrange
      const shapes = createShapes([
        ...shapeTestData,
        listTestData,
      ]);
      // Act
      const result = shapes.getList();
      // Assert
      expect(result!.type).toBe(ListShape);
    });

    it('should return undefined when shapes does not have list', () => {
      // Arrange
      const shapes = createShapes(shapeTestData);
      // Act
      const result = shapes.getList();
      // Assert
      expect(result).toBeUndefined();
    });

  });
});
