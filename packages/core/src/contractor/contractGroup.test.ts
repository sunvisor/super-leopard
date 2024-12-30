/**
 * Test for ContractGroup
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractGroup } from "./contractGroup";
import { createShapes } from '../creator';
import { shapeTestData } from '../__test_assets__';


describe('Test for contractGroup', () => {

  test('Should return Group', () => {
    // Arrange
    const shapes = createShapes(shapeTestData);
    const propertyValue = {
      width: 100,
      height: 100,
      repeatCount: 1,
      direction: 'horizontal',
    }
    // Act
    const group = contractGroup(propertyValue, shapes);
    // Assert
    expect(group.width).toBe(propertyValue.width);
    expect(group.height).toBe(propertyValue.height);
    expect(group.repeatCount).toBe(propertyValue.repeatCount);
    expect(group.direction).toBe(propertyValue.direction);
    expect(group.shapes).toBe(shapes);
  });
});
