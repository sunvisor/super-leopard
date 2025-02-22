/**
 * Test for SerializeList
 *
 * Created by sunvisor on 2024/01/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { serializeList } from "./serializeList";
import { createList } from '../creator';
import { ListData } from '../data';

describe('Tests for serializeList', () => {

  const baseData: ListData = {
    type: 'list',
    width: 30,
    height: 40,
    rows: 10,
    columns: 1,
    direction: 'vertical',
    shapes: [
      {
        type: 'rect',
        x: 0,
        y: 0,
        width: 180,
        height: 8,
      },
      {
        name: 'field1',
        type: 'field',
        shape: {
          type: 'text',
          x: 0,
          y: 0,
          width: 50,
          height: 8,
          color: '#000000',
          font: {
            family: 'sans-serif',
            size: 10,
          }
        }
      },
      {
        name: 'field2',
        type: 'field',
        shape: {
          type: 'text',
          x: 60,
          y: 0,
          width: 50,
          height: 8,
          color: '#000000',
          font: {
            family: 'sans-serif',
            size: 10,
          }
        }
      },
      {
        name: 'field3',
        type: 'field',
        shape: {
          type: 'text',
          x: 120,
          y: 0,
          width: 50,
          height: 8,
          color: '#000000',
          font: {
            family: 'sans-serif',
            size: 10,
          }
        }
      }
    ],
  };

  it('should return serialized ListData', () => {
    // Arrange
    const data = baseData;
    const list = createList(data);
    // Act
    const result = serializeList(list);
    // Assert
    expect(result).toEqual(data);
  });

  test('Serialized data should not include width when width is not specified', () => {
    // Arrange
    const { width, ...data } = baseData;
    const list = createList(data);
    // Act
    const result = serializeList(list);
    // Assert
    expect(result).toEqual(data);
  });

  test('Serialized data should not include width when height is not specified', () => {
    // Arrange
    const { height, rows, columns, ...rest } = baseData;
    const data = { ...rest, rows: 1, columns: 2 };
    const list = createList(data);
    // Act
    const result = serializeList(list);
    // Assert
    expect(result).toEqual(data);
  });

});

