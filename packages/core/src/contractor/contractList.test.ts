/**
 * Test for ContractList
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createShapes } from '../creator';
import { contractList } from "./contractList";

describe('Test for contractList', () => {

  test('Should return List', () => {
    // Arrange
    const shapes = createShapes([{
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
    const propertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      direction: 'horizontal',
      rows: 10,
      columns: 2,
    }
    // Act
    const list = contractList(propertyValue, shapes);
    // Assert
    expect(list.width).toBe(propertyValue.width);
    expect(list.height).toBe(propertyValue.height);
    expect(list.direction).toBe(propertyValue.direction);
    expect(list.rows).toBe(propertyValue.rows);
    expect(list.columns).toBe(propertyValue.columns);
  })

});
