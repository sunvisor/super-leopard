/**
 * Test for Expander
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandBorder, expandFillColor } from "./expander";
import { createBorder, createColor } from '../creator';

describe('Tests for expander', () => {

  describe('Tests for expandBorder', () => {

    test('Should expand border to BorderPropertyValue', () => {
      // Arrange
      const border = createBorder({
        color: '#00FF00',
        style: 'solid',
        width: 2,
        cap: 'round',
        join: 'bevel',
      });
      // Act
      const expandedBorder = expandBorder(border);
      // Assert
      expect(expandedBorder).toEqual({
        useStroke: true,
        borderColor: '#00FF00',
        borderStyle: 'solid',
        borderWidth: 2,
        borderCap: 'round',
        borderJoin: 'bevel',
      });
    });

    test('borderColor, borderStyle, borderWidth, borderCap and borderJoin should be undefined when border is undefined', () => {
      // Act
      const expandedBorder = expandBorder(undefined);
      // Assert
      expect(expandedBorder).toEqual({
        useStroke: false,
        borderColor: undefined,
        borderStyle: undefined,
        borderWidth: undefined,
        borderCap: undefined,
        borderJoin: undefined,
      });
    });

  });

  describe('Tests for expandFillColor', () => {

    test('Should expand fillColor to FillPropertyValue', () => {
      // Arrange
      const color = createColor('#00FF00');
      // Act
      const expandedColor = expandFillColor(color);
      // Assert
      expect(expandedColor).toEqual({
        useFillColor: true,
        fillColor: '#00FF00',
      });
    });

    test('fillColor should be undefined when fillColor is undefined', () => {
      // Act
      const expandedColor = expandFillColor(undefined);
      // Assert
      expect(expandedColor).toEqual({
        useFillColor: false,
        fillColor: undefined,
      });
    });

  });

});
