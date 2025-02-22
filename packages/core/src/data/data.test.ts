/**
 * Test for Data
 *
 * Created by sunvisor on 2024/04/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { getValue } from "./data";
import { FieldShape, TextShape } from '../object';
import { createField } from '../creator';

describe('Tests for getValue', () => {

  const field = createField({
    type: FieldShape,
    name: 'field2',
    shape: {
      type: TextShape,
      x: 10,
      y: 10,
      width: 180,
      height: 6,
      font: {
        family: 'Courier',
        size: 12
      },
    },
  });

  it('should return value of specified key', () => {
    // Arrange
    const values = {
      field1: 'data1',
      field2: 1000
    };
    // Act
    const result = getValue(values, field);
    // Assert
    expect(result).toEqual(1000);
  });

  it('should return empty string if values is undefined', () => {
    // Arrange
    const values = undefined;
    // Act
    const result = getValue(values, field);
    // Assert
    expect(result).toEqual('');
  });

  it('should return empty string if values does not have specified key', () => {
    // Arrange
    const values = {
      field1: 'data1',
    };
    // Act
    const result = getValue(values, field);
    // Assert
    expect(result).toEqual('');
  });

});
