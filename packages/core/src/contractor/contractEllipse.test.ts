/**
 * Test for ContractEllipse
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractEllipse } from "./contractEllipse";
import { EllipsePropertyValue } from '../expander';
import { Ellipse } from '../object';

describe('Test for contractEllipse', () => {

  test('Should return Ellipse', () => {
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
    const ellipsis = contractEllipse(propertyValue);
    // Assert
    expect(ellipsis).toBeInstanceOf(Ellipse);
    expect(ellipsis.x).toBe(0);
    expect(ellipsis.y).toBe(0);
    expect(ellipsis.width).toBe(100);
    expect(ellipsis.height).toBe(100);
    expect(ellipsis.fillColor?.color).toBe('#FF0000');
    expect(ellipsis.border?.style).toBe('solid');
    expect(ellipsis.border?.color?.color).toBe('#00FF00');
    expect(ellipsis.border?.cap).toBe('butt');
    expect(ellipsis.border?.join).toBe('miter');
  });

});
