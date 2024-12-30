/**
 * Test for ListBlocks
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ListBlocks } from "./ListBlocks";
import { FieldValues, ListData, ShapeData } from '../../data';
import { DirectionType, Shapes } from '../../object';
import { createList } from '../../creator';
import { describe } from 'vitest';


function dummyValues(count: number): FieldValues[] {
  const values: FieldValues[] = [];
  for (let i = 0; i < count; i++) {
    values.push({
      name: `data${i + 1}`,
      value: i * 1000,
    });
  }
  return values;
}

describe('Tests for ListBlocks', () => {

  const shapes: ShapeData[] = [{
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
  }];

  const baseConfig: ListData = {
    type: 'list',
    width: 100,
    height: 10,
    shapes,
  }
  const dummyShape = new Shapes([]); // Should be passed to callback as second argument

  it('should throw error when record count is grater than list count', () => {
    // Arrange
    const records = dummyValues(11);
    const list = createList({
      ...baseConfig,
      rows: 10,
      columns: 1,
      direction: DirectionType.VERTICAL,
    });
    // Act
    // Assert
    expect(() => new ListBlocks({ records, list })).toThrow('record count must be less than list count');
  });

  describe('Tests for each', () => {

    test('when vertical direction and one column', () => {
      // Arrange
      const records = dummyValues(10);
      const list = createList({
        ...baseConfig,
        rows: 10,
        columns: 1,
        direction: DirectionType.VERTICAL,
      });
      const target = new ListBlocks({ records, list });
      const callback = vi.fn();
      // Act
      target.each(callback);
      // Assert
      expect(callback).toHaveBeenCalledTimes(10);
      expect(callback).toHaveBeenCalledWith(records[0], dummyShape, 0, 0);
      expect(callback).toHaveBeenLastCalledWith(records[9], dummyShape, 9, 0);
    });

    test('when vertical direction and two columns', () => {
      // Arrange
      const records = dummyValues(10);
      const list = createList({
        ...baseConfig,
        rows: 5,
        columns: 2,
        direction: DirectionType.VERTICAL,
      });
      const target = new ListBlocks({ records, list });
      const callback = vi.fn();
      // Act
      target.each(callback);
      // Assert
      expect(callback).toHaveBeenCalledTimes(10);
      expect(callback).toHaveBeenCalledWith(records[0], dummyShape, 0, 0);
      expect(callback).toHaveBeenNthCalledWith(2, records[1], dummyShape, 1, 0); // increase row number first
      expect(callback).toHaveBeenLastCalledWith(records[9], dummyShape, 4, 1);
    });

    test('when horizontal direction and one column', () => {
      // Arrange
      const records = dummyValues(5);
      const list = createList({
        ...baseConfig,
        rows: 1,
        columns: 5,
        direction: DirectionType.HORIZONTAL,
      });
      const target = new ListBlocks({ records, list });
      const callback = vi.fn();
      // Act
      target.each(callback);
      // Assert
      expect(callback).toHaveBeenCalledTimes(5);
      expect(callback).toHaveBeenCalledWith(records[0], dummyShape, 0, 0);
      expect(callback).toHaveBeenLastCalledWith(records[4], dummyShape, 0, 4);
    });

    test('when horizontal direction and two columns', () => {
      // Arrange
      const records = dummyValues(10);
      const list = createList({
        ...baseConfig,
        rows: 5,
        columns: 2,
        direction: DirectionType.HORIZONTAL,
      });
      const target = new ListBlocks({ records, list });
      const callback = vi.fn();
      // Act
      target.each(callback);
      // Assert
      expect(callback).toHaveBeenCalledTimes(10);
      expect(callback).toHaveBeenCalledWith(records[0], dummyShape, 0, 0);
      expect(callback).toHaveBeenNthCalledWith(2, records[1], dummyShape, 0, 1); // increase column number first
      expect(callback).toHaveBeenLastCalledWith(records[9], dummyShape, 4, 1);
    });

    test('should not call callback when records is empty', () => {
      // Arrange
      const records: FieldValues[] = [];
      const list = createList({
        ...baseConfig,
        rows: 5,
        columns: 2,
        direction: DirectionType.VERTICAL,
      });
      const target = new ListBlocks({ records, list });
      const callback = vi.fn();
      // Act
      target.each(callback);
      // Assert
      expect(callback).toHaveBeenCalledTimes(0);
    });

  });
});
