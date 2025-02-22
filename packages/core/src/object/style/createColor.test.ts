/**
 * Test for CreateColor
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createColor } from "./createColor";


describe('Tests for createColor', () => {

  it('should return undefined when data is undefined', () => {
    // Act
    const color = createColor(undefined);
    // Assert
    expect(color).toBeUndefined();
  });

  test('Create Color with Hex', () => {
    // Arrange
    const data = '#000000';
    // Act
    const color = createColor(data);
    // Assert
    expect(color.color).toEqual(data);
  });

});
