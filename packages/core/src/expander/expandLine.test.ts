/**
 * Test for ExpandLine
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandLine } from "./expandLine";
import { createLine } from '../creator';
import { LineShape } from '../object';

describe('Test for expandLine', () => {

  test('Should expand line to LinePropertyValue', () => {
    // Arrange
    const line = createLine({
      type: LineShape,
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      border: {
        style: 'solid',
        width: 1,
        color: '#000000',
        cap: 'butt',
        join: 'miter',
      }
    });
    // Act
    const expandedLine = expandLine(line);
    // Assert
    expect(expandedLine).toEqual({
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    });
  });
});
