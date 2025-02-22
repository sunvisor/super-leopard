/**
 * Test for CreateList
 *
 * Created by sunvisor on 2024/01/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createList } from "./createShape";
import { List, Shapes } from '../object';
import { ListData } from '../data';

describe('Tests for createList', () => {

  const baseConfig: ListData = {
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

  it('should create List', () => {
    // Arrange
    // Act
    const list = createList(baseConfig);
    // Assert
    expect(list).toBeInstanceOf(List);
    expect(list.shapes).toBeInstanceOf(Shapes);
  });

  it('type is optional', () => {
    // Arrange
    const listData: ListData = {
      shapes: baseConfig.shapes,
    }
    // Act
    const list = createList(listData);
    // Assert
    expect(list.type).toBe('list');
    expect(list).toBeInstanceOf(List);
  });

  it('should create List with minimal config', () => {
    // Arrange
    const config: ListData = {
      type: 'list',
      shapes: baseConfig.shapes,
    };
    // Act
    const list = createList(config);
    // Assert
    expect(list).toBeInstanceOf(List);
    expect(list.width).toBe(list.bbox.width);
    expect(list.height).toBe(list.bbox.height);
    expect(list.rows).toBe(1);
    expect(list.columns).toBe(1);
    expect(list.direction).toBe('vertical');
    expect(list.shapes).toBeInstanceOf(Shapes);
  });

});
