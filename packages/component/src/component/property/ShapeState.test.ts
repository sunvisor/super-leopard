/**
 * Test for ShapeState
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ShapeState, { StylesData } from "./ShapeState";
import { CircleData, LineData, RectData, TextData } from '@sunvisor/super-leopard-core';

describe('Tests for ShapeState', () => {

  const line: LineData = {
    type: 'line',
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
    border: {
      style: 'solid',
      width: 1,
      color: '#000000',
      cap: 'butt',
      join: 'miter',
    }
  };

  const defaultStyle: StylesData = {
    font: {
      family: 'sans-serif',
      size: 12,
      style: ''
    },
    fillColor: undefined,
    border: {}
  };

  const rect: RectData = {
    type: 'rect',
    x: 1,
    y: 2,
    width: 3,
    height: 4,
    fillColor: undefined,
    border: {
      style: 'solid',
      width: 1,
      color: '#000000',
      cap: 'butt',
      join: 'miter',
    }
  };

  const circle: CircleData = {
    type: 'circle',
    x: 1,
    y: 2,
    diameter: 3,
    fillColor: undefined,
    border: {
      style: 'solid',
      width: 1,
      color: '#000000',
      cap: 'butt',
      join: 'miter',
    }
  };

  describe('Coordinates and Sizes', () => {

    test('When changing from Line to Rect, x1 is set to x, and y1 to y', () => {
      // Arrange
      const state = new ShapeState(line, defaultStyle);
      // Act
      const result = state.states('rect') as RectData;
      // Assert
      expect(result.x).toBe(line.x1);
      expect(result.y).toBe(line.y1);
    });

    test('When changing from Rect to Line, x is set to x1, and y to y1', () => {
      // Arrange
      const state = new ShapeState(rect, defaultStyle);
      // Act
      const result = state.states('line') as LineData;
      // Assert
      expect(result.x1).toBe(rect.x);
      expect(result.y1).toBe(rect.y);
    });

    test('When changing from Line to Rect, width and height are set', () => {
      // Arrange
      const state = new ShapeState(line, defaultStyle);
      // Act
      const result = state.states('rect') as RectData;
      // Assert
      expect(result.width).toBe(2);
      expect(result.height).toBe(2);
    });

    test('When changing from Rect to Line, x2 and y2 are set', () => {
      // Arrange
      const state = new ShapeState(rect, defaultStyle);
      // Act
      const result = state.states('line') as LineData;
      // Assert
      expect(result.x2).toBe(4);
      expect(result.y2).toBe(6);
    });

    test('When changing from Circle to Rect, width and height are set', () => {
      // Arrange
      const state = new ShapeState(circle, defaultStyle);
      // Act
      const result = state.states('rect') as RectData;
      // Assert
      expect(result.width).toBe(3);
      expect(result.height).toBe(3);
    });

    test('When changing from Rect to Circle, diameter is set', () => {
      // Arrange
      const state = new ShapeState(rect, defaultStyle);
      // Act
      const result = state.states('circle') as CircleData;
      // Assert
      expect(result.diameter).toBe(rect.width);
    });

    test('When changing from Circle to Line, x2 and y2 are set', () => {
      // Arrange
      const state = new ShapeState(circle, defaultStyle);
      // Act
      const result = state.states('line') as LineData;
      // Assert
      expect(result.x1).toBe(1);
      expect(result.y1).toBe(2);
      expect(result.x2).toBe(4);
      expect(result.y2).toBe(5);
    });

    test('When changing from Rect to Text, defaultStyle is set', () => {
      // Arrange
      const state = new ShapeState(rect, defaultStyle);
      // Act
      const result = state.states('text') as TextData;
      // Assert
      expect(result.font).toEqual(defaultStyle.font);
    });
  });
});
