/**
 * Test for SerializeRect
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeRect } from "./serializeRect";
import { Border, Color, Rect, RectShape } from "../object";

describe('Tests for serializeRect', () => {

  test('Should return serialized RectData', () => {
    // Arrange
    const color = new Color('#000000');
    const border = new Border({ width: 1, color });
    const fillColor = new Color('#ffffff');
    const rect = new Rect({ x: 1, y: 2, width: 3, height: 4, border, fillColor });
    // Act
    const result = serializeRect(rect);
    // Assert
    expect(result).toEqual({
      type: RectShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      border: {
        width: 1,
        color: '#000000',
      },
      fillColor: '#ffffff',
    });
  });

  test('Serialized data should not include border and fillColor if not specified', () => {
    // Arrange
    const rect = new Rect({ x: 1, y: 2, width: 3, height: 4 });
    // Act
    const result = serializeRect(rect);
    // Assert
    expect(result).toEqual({
      type: RectShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    });
  });

});
