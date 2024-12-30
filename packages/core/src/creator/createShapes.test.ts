/**
 * Test for CreateShapes
 *
 * Created by sunvisor on 2023/12/11.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createShapes } from "./createShape";
import { shapeTestData } from '../__test_assets__';


describe('Test for createShapes', () => {

  test('Create Shapes', () => {
    // Arrange
    const data = shapeTestData;
    // Act
    const shapes = createShapes(data);
    // Assert
    expect(shapes.count).toEqual(data.length);
  });

});

