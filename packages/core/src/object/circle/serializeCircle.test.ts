/**
 * Test for SerializeCircle
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeCircle } from './serializeCircle';
import { Circle } from "./Circle";
import { CircleShape } from '../shape';
import { Border, Color } from "../style";


describe('Test for serializeCircle', () => {

  it('should return serialized CircleData', () => {
    // Arrange
    const circle = new Circle({
      x: 1,
      y: 2,
      diameter: 3,
      border: new Border({ width: 1, color: new Color('#000000') }),
      fillColor: new Color('#ffffff'),
    });
    // Act
    const result = serializeCircle(circle);
    // Assert
    expect(result).toEqual({
      type: CircleShape,
      x: 1,
      y: 2,
      diameter: 3,
      border: {
        width: 1,
        color: '#000000',
      },
      fillColor: '#ffffff',
    });
  });

  test('Serialized data should not include border or fillColor if not specified', () => {
    // Arrange
    const circle = new Circle({
      x: 1,
      y: 2,
      diameter: 3,
    });
    // Act
    const result = serializeCircle(circle);
    // Assert
    expect(result).toEqual({
      type: CircleShape,
      x: 1,
      y: 2,
      diameter: 3,
    });
  });

});
