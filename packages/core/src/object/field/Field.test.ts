/**
 * Test for Field
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Field } from "./Field";
import { FieldShape } from '../shape';
import { createShape } from '../../creator';
import { ShapeData } from '../../data';
import { expect } from 'vitest';

describe('Tests for Field', () => {
  const name = 'myField';
  const shapeData: ShapeData = {
    type: 'text',
    x: 1,
    y: 2,
    width: 100,
    height: 6,
    font: {
      family: 'serif',
      size: 12
    },
  };
  const shape = createShape(shapeData);

  describe('Tests for create Field', () => {

    test('Creating a Field instance', () => {
      // Arrange
      // Act
      const field = new Field(name, shape);
      // Assert
      expect(field).toBeInstanceOf(Field);
      expect(field.type).toBe(FieldShape);
      expect(field.name).toBe(name);
      expect(field.shape).toBe(shape);
    });
  });

  describe('Tests for bbox', () => {

    test('Should return bounding box', () => {
      // Arrange
      const field = new Field('myField', shape);
      // Act
      const result = field.bbox;
      // Assert
      expect(result).toEqual({ x: 1, y: 2, width: 100, height: 6 });
    });
  });

  describe('Tests for setName', () => {

    test('Should return new instance with updated name', () => {
      // Arrange
      const field = new Field('myField', shape);
      const newName = 'newName';
      // Act
      const result = field.setName(newName);
      // Assert
      expect(field.name).toBe('myField');
      assertOtherProperties(field, result, ['name']);
      expect(result.name).toBe(newName);
    });

  });

  describe('Tests for setShape', () => {

    test('Should return new instance with updated shape', () => {
      // Arrange
      const field = new Field('myField', shape);
      const newShape = createShape({
        type: 'line',
        x1: 1,
        y1: 2,
        x2: 3,
        y2: 4
      });
      // Act
      const result = field.setShape(newShape);
      // Assert
      expect(field.shape).toBe(shape);
      assertOtherProperties(field, result, ['shape']);
      expect(result.shape).toEqual(newShape);
    });

  });

  describe('Tests for moveTo', () => {

    test('Should return a new moved instance', () => {
      // Arrange
      const field = new Field('myField', shape);
      const point = { x: 10, y: 10 };
      // Act
      const result = field.moveTo(point);
      // Assert
      expect(field.bbox).toEqual({ x: 1, y: 2, width: 100, height: 6 });
      assertOtherProperties(field, result, ['shape']);
      expect(result.bbox.x).toEqual(10);
      expect(result.bbox.y).toEqual(10);
    });
  });

  describe('Tests for resize', () => {
    test('Should return a new resized instance', () => {
      // Arrange
      const field = new Field('myField', shape);
      const box = { x: 10, y: 11, width: 100, height: 110 };
      // Act
      const result = field.resize(box);
      // Assert
      expect(field.bbox).toEqual({ x: 1, y: 2, width: 100, height: 6 });
      assertOtherProperties(field, result, ['shape']);
      expect(result.bbox).toEqual(box);
    });
  });

  describe('Tests for equals', () => {

    test('Should return true when two Field are same', () => {
      // Arrange
      const field1 = new Field('myField', shape);
      const field2 = new Field('myField', shape);
      // Act
      const result = field1.equals(field2);
      // Assert
      expect(result).toBe(true);
    });

    test('Should return false when name are different', () => {
      // Arrange
      const field1 = new Field('myField', shape);
      const field2 = new Field('myField2', shape);
      // Act
      const result = field1.equals(field2);
      // Assert
      expect(result).toBe(false);
    });

    test('Should return false when shape are different', () => {
      // Arrange
      const field1 = new Field('myField', shape);
      const newShape = createShape({
        type: 'line',
        x1: 1,
        y1: 2,
        x2: 3,
        y2: 4
      });
      const field2 = new Field('myField', newShape);
      // Act
      const result = field1.equals(field2);
      // Assert
      expect(result).toBe(false);
    });

  });

  function assertOtherProperties(field1: Field, field2: Field, omitKeys: (keyof Field)[] = []) {
    const allKeys: (keyof Field)[] = [
      'name', 'shape',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(field1[key]).toBe(field2[key]);
    });
  }
});
