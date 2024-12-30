/**
 * Test for SerializeShapes
 *
 * Created by sunvisor on 2023/12/11.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeShapes } from "./serializeShape";
import { createShapes } from "../creator";
import { billTestShapesData, shapeTestData, shapeTestData2 } from '../__test_assets__';


describe('Tests for serializeShapes', () => {

  test('Serialize Shapes with group', () => {
    // Arrange
    const data = shapeTestData;
    const shapes = createShapes(data);
    // Act
    const shapesData = serializeShapes(shapes);
    // Assert
    expect(shapesData).toEqual(data);
  });

  test('Serialize simple Shapes', () => {
    // Arrange
    const data = shapeTestData2;
    const shapes = createShapes(data);
    // Act
    const shapesData = serializeShapes(shapes);
    // Assert
    expect(shapesData).toEqual(data);
  });

  test('Serialize complex Shapes', () => {
    // Arrange
    const data = billTestShapesData;
    const shapes = createShapes(data);
    // Act
    const shapesData = serializeShapes(shapes);
    // Assert
    expect(shapesData).toEqual(data);
  });

});
