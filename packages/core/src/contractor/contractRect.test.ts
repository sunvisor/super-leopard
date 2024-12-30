/**
 * Test for ContractRect
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractRect } from "./contractRect";
import { EllipsePropertyValue } from '../expander';
import { Rect } from '../object';

describe('Test for contractRect', () => {

  test('Should return Rect', () => {
    // Arrange
    const propertyValue: EllipsePropertyValue = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#00FF00',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const ellipsis = contractRect(propertyValue);
    // Assert
    expect(ellipsis).toBeInstanceOf(Rect);
    expect(ellipsis.x).toBe(0);
    expect(ellipsis.y).toBe(0);
    expect(ellipsis.width).toBe(100);
    expect(ellipsis.height).toBe(100);
  });

});
