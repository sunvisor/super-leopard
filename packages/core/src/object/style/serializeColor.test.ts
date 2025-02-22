/**
 * Test for SerializeColor
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeColor } from "./serializeColor";
import { Color } from './Color';


describe('Tests for serializeColor', () => {

  it('should return serialized ColorData', () => {
    // Arrange
    const color = new Color('#000000');
    // Act
    const result = serializeColor(color);
    // Assert
    expect(result).toEqual('#000000');
  });

  test('Color property should be converted to hex when Color is RGB', () => {
    // Arrange
    const color = new Color({ r: 0, g: 0, b: 0 });
    // Act
    const result = serializeColor(color);
    // Assert
    expect(result).toBe('#000000');
  });

});
