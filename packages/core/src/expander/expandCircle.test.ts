/**
 * Test for ExpandCircle
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createCircle } from '../creator';
import { CircleShape } from '../object';
import {expandCircle} from './expandCircle';

describe('Tests for expandCircle', () => {

  test('Should expand Circle to CirclePropertyValue', () => {
    //
    const circle = createCircle({
      type: CircleShape,
      x: 10,
      y: 20,
      diameter: 30,
      fillColor: '#FF0000',
      border: {
        color: '#00FF00',
        width: 2,
        cap: 'round',
        join: 'bevel',
      },
    });
    // Act
    const expandedCircle = expandCircle(circle);
    // Assert
    expect(expandedCircle).toEqual({
      x: 10,
      y: 20,
      diameter: 30,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderColor: '#00FF00',
      borderWidth: 2,
      borderStyle: 'solid',
      borderCap: 'round',
      borderJoin: 'bevel',
    });
  });

  test('fillColor should not exist when fillColor is not specified', () => {
    //
    const circle = createCircle({
      type: CircleShape,
      x: 10,
      y: 20,
      diameter: 30,
      border: {
        color: '#00FF00',
        width: 2,
        cap: 'round',
        join: 'bevel',
      },
    });
    // Act
    const expandedCircle = expandCircle(circle);
    // Assert
    expect(expandedCircle).toEqual({
      x: 10,
      y: 20,
      diameter: 30,
      useFillColor: false,
      useStroke: true,
      borderColor: '#00FF00',
      borderWidth: 2,
      borderStyle: 'solid',
      borderCap: 'round',
      borderJoin: 'bevel',
    });
  });

  test('borderColor, borderWidth, borderStyle, borderCap, borderJoin should be undefined when border is not specified', () => {
    //
    const circle = createCircle({
      type: CircleShape,
      x: 10,
      y: 20,
      diameter: 30,
      fillColor: '#FF0000',
    });
    // Act
    const expandedCircle = expandCircle(circle);
    // Assert
    expect(expandedCircle).toEqual({
      x: 10,
      y: 20,
      diameter: 30,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: false,
      borderColor: undefined,
      borderWidth: undefined,
      borderStyle: undefined,
      borderCap: undefined,
      borderJoin: undefined,
    });

  });

});
