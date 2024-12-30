/**
 * Test for ContractField
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractField } from "./contractField";
import { EllipsePropertyValue } from '../expander';
import { Ellipse, Field } from '../object';

describe('Test for contractField', () => {

  test('Should return Field', () => {
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
    const field = contractField('test', 'ellipse', propertyValue);
    // Assert
    expect(field).toBeInstanceOf(Field);
    expect(field.name).toBe('test');
    expect(field.shape).toBeInstanceOf(Ellipse);
  });

});
