/**
 * Test for ExpandRect
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandRect } from "./expandRect";
import { createRect } from '../creator';
import { RectShape } from '../object';

describe('Test for expandRect', () => {
  test('Should expand rect to RectPropertyValue', () => {
    // Arrange
    const rect = createRect({
      type: RectShape,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fillColor: '#FF0000',
      border: {
        style: 'solid',
        width: 1,
        color: '#000000',
        cap: 'butt',
        join: 'miter',
      }
    });
    // Act
    const expandedRect = expandRect(rect);
    // Assert
    expect(expandedRect).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    });
  });
});
