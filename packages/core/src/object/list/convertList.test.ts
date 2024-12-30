/**
 * Test for ConvertList
 *
 * Created by sunvisor on 2024/02/27.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createShapes } from '../../creator';
import { listToShapes, shapesToList } from './convertList';
import { Shapes } from '../shapes';
import { List } from './List';
import { ListData, ShapeData } from '../../data';

describe('Tests for convertList', () => {

  const shapesData: ShapeData[] = [
    {
      type: 'rect',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fillColor: '#000000',
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
  ];


  describe('Test for shapesToList', () => {

    test('Should return new shapes', () => {
      // Arrange
      const shapes = createShapes(shapesData);
      const targets = new Shapes([shapes.get(1)]);
      // Act
      const { shapes: newShapes, list } = shapesToList(shapes, targets);
      // Assert
      expect(shapes).not.toBe(newShapes);
      expect(newShapes.count).toBe(2);
      expect(list).toBeInstanceOf(List);
    });

  });

  describe('Test for listToShapes', () => {

    const listData: ListData = {
      type: 'list',
      width: 30,
      height: 40,
      rows: 10,
      columns: 1,
      direction: 'vertical',
      shapes: [{
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
      }],
    };
    const shapesData: ShapeData[] = [
      {
        type: 'rect',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fillColor: '#000000',
      },
      listData,
    ];

    test('Should return new shapes', () => {
      // Arrange
      const shapes = createShapes(shapesData);
      const list = shapes.get(1) as List;
      // Act
      const { shapes: newShapes, items } = listToShapes(shapes, list);
      // Assert
      expect(shapes).not.toBe(newShapes);
      expect(newShapes.count).toBe(2);
      expect(items).toHaveLength(1);
    });

  });

});
