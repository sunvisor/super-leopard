/**
 * Test for SerializeLine
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeLine } from "./serializeLine";
import { Border, Color } from '../style';
import { Line } from './Line';
import { LineShape } from '../shape';


describe('Test for serializeLine', () => {

  it('should return serialized LineData', () => {
    // Arrange
    const border = new Border({ width: 1, color: new Color('#000000') });
    const line = new Line({ x1: 1, y1: 2, x2: 3, y2: 4, border });
    // Act
    const result = serializeLine(line);
    // Assert
    expect(result).toEqual({
      type: LineShape,
      x1: 1,
      y1: 2,
      x2: 3,
      y2: 4,
      border: {
        width: 1,
        color: '#000000',
      },
    });
  });

});
