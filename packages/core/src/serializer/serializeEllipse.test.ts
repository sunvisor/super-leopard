/**
 * Test for SerializeEllipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeEllipse } from "./serializeEllipse";
import { Border, Color, Ellipse, EllipseShape } from "../object";

describe('Tests for serializeEllipse', () => {

  test('Should return serialized EllipseData', () => {
    // Arrange
    const ellipse = new Ellipse({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      border: new Border({ width: 1, color: new Color('#000000') }),
      fillColor: new Color('#ffffff'),
    });
    // Act
    const result = serializeEllipse(ellipse);
    // Assert
    expect(result).toEqual({
      type: EllipseShape,
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
    const ellipse = new Ellipse({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    });
    // Act
    const result = serializeEllipse(ellipse);
    // Assert
    expect(result).toEqual({
      type: EllipseShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    });
  });
});
