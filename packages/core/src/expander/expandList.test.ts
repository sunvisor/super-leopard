/**
 * Test for ExpandList
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandList } from "./expandList";
import { createList } from '../creator';
import { DirectionType, ListShape } from '../object';

describe('Test for expandList', () => {

  test('Should expand list to ListPropertyValue', () => {
    // Arrange
    const list = createList({
      type: ListShape,
      width: 100,
      height: 100,
      direction: DirectionType.HORIZONTAL,
      rows: 10,
      columns: 2,
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
      }]
    });
    // Act
    const expandedList = expandList(list);
    // Assert
    expect(expandedList).toEqual({
      width: 100,
      height: 100,
      direction: DirectionType.HORIZONTAL,
      rows: 10,
      columns: 2,
    });
  });
});
