/**
 * Test for ContractCircle
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractCircle } from "./contractCircle";
import { CirclePropertyValue } from '../expander';
import { Circle } from '../object';

describe('Tests for contractCircle', () => {

  test('Should return Circle', () => {
    // Arrange
    const propertyValue: CirclePropertyValue = {
      x: 1,
      y: 2,
      diameter: 3,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const circle = contractCircle(propertyValue);
    // Assert
    expect(circle).toBeInstanceOf(Circle);
    expect(circle.x).toBe(1);
    expect(circle.y).toBe(2);
    expect(circle.diameter).toBe(3);
    expect(circle.fillColor?.color).toBe('#FF0000');
    expect(circle.border?.style).toBe('solid');
    expect(circle.border?.color?.color).toBe('#000000');
    expect(circle.border?.cap).toBe('butt');
    expect(circle.border?.join).toBe('miter');
  });

  test('border should be undefined when useStroke is false', () => {
    // Arrange
    const propertyValue: CirclePropertyValue = {
      x: 1,
      y: 2,
      diameter: 3,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: false,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const circle = contractCircle(propertyValue);
    // Assert
    expect(circle).toBeInstanceOf(Circle);
    expect(circle.border).toBeUndefined();
  });

  test('fillColor should be undefined when useFillColor is false', () => {
    // Arrange
    const propertyValue: CirclePropertyValue = {
      x: 1,
      y: 2,
      diameter: 3,
      useFillColor: false,
      fillColor: '#FF0000',
      useStroke: true,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      borderCap: 'butt',
      borderJoin: 'miter',
    }
    // Act
    const circle = contractCircle(propertyValue);
    // Assert
    expect(circle).toBeInstanceOf(Circle);
    expect(circle.fillColor).toBeUndefined();
  });

});
