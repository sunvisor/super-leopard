/**
 * Test for SingleShapeDrawer
 *
 * Created by sunvisor on 2025/01/26.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { SingleShapeDrawer } from "./SingleShapeDrawer";
import { describe } from 'vitest';
import { createField, createGroup, createList, createRect } from '../creator';

describe('Tests for SingleShapeDrawer', () => {

  const shapeDrawer = {
    draw: vi.fn(),
  }
  const fieldDrawer = {
    draw: vi.fn(),
  }
  const params = { opacity: 1 };

  test('Should call draw method of StaticShapeDrawer when shape type is static shape', () => {
    // Arrange
    const drawer = new SingleShapeDrawer(shapeDrawer, fieldDrawer)
    const rect = createRect({
      type: 'rect',
      x: 10,
      y: 20,
      width: 30,
      height: 40,
      border: {
        width: 1,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(rect, params);
    // Assert
    expect(shapeDrawer.draw).toHaveBeenCalledWith(rect, params);
  });

  test('Should call draw method of FieldDrawer when shape type is field', () => {
    // Arrange
    const drawer = new SingleShapeDrawer(shapeDrawer, fieldDrawer);
    const field = createField({
      type: 'field',
      name: 'field1',
      shape: {
        type: 'text',
        x: 10,
        y: 20,
        height: 6,
        width: 200,
        font: {
          family: 'Helvetica',
          size: 12
        },
      },
    });
    const params = { values: { field1: 'value1'},  opacity: 1 };
    // Act
    drawer.draw(field, params);
    // Assert
    expect(fieldDrawer.draw).toHaveBeenCalledWith(field, params);
  });

  test('Should throw error when shape type is group', () => {
    // Arrange
    const drawer = new SingleShapeDrawer(shapeDrawer, fieldDrawer)
    const group = createGroup({
      type: 'group',
      shapes: [
        {
          type: 'rect',
          x: 10,
          y: 20,
          width: 30,
          height: 40,
          border: {
            width: 1,
            color: '#000000',
          }
        },
      ]
    });
    // Act
    // Assert
    expect(() => drawer.draw(group, params)).toThrowError('Unsupported shape: group');
  });

  test('Should throw error when shape type is list', () => {
    // Arrange
    const drawer = new SingleShapeDrawer(shapeDrawer, fieldDrawer)
    const list = createList({
      shapes: [{
        type: 'field',
        name: 'field1',
        shape: {
          type: 'text',
          x: 10,
          y: 20,
          height: 6,
          width: 200,
          font: {
            family: 'Helvetica',
            size: 12
          },
        },
      }],
      type: 'list'
    });
    // Act
    // Assert
    expect(() => drawer.draw(list, params)).toThrowError('Unsupported shape: list');
  });

});
