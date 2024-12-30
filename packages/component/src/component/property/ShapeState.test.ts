/**
 * Test for ShapeState
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ShapeState from "./ShapeState";
import { CirclePropertyValue, ShapePropertyValue } from '@sunvisor/super-leopard-core';

describe('Tests for ShapeState', () => {

  const line: ShapePropertyValue = {
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
    useStroke: true,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    borderCap: 'butt',
    borderJoin: 'miter',
  };

  const defaultFont = {
    family: 'sans-serif',
    size: 12,
    weight: 'normal',
    style: '',
  };

  const rect: ShapePropertyValue = {
    x: 1,
    y: 2,
    width: 3,
    height: 4,
    useFillColor: false,
    fillColor: undefined,
    useStroke: true,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    borderCap: 'butt',
    borderJoin: 'miter',
  };

  const circle: CirclePropertyValue = {
    x: 1,
    y: 2,
    diameter: 3,
    useFillColor: false,
    fillColor: undefined,
    useStroke: true,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    borderCap: 'butt',
    borderJoin: 'miter',
  };

  describe('Coordinates and Sizes', () => {

    test('x and y return their original values', () => {
      // Arrange
      const state = new ShapeState(rect, defaultFont);
      // Act & Assert
      expect(state.x).toBe(rect.x);
      expect(state.y).toBe(rect.y);
    });

    test('When changing from Line to Rect, x1 is set to x, and y1 to y', () => {
      // Arrange
      const state = new ShapeState(line, defaultFont);
      // Act & Assert
      expect(state.x).toBe(line.x1);
      expect(state.y).toBe(line.y1);
    });

    test('When changing from Rect to Line, x is set to x1, and y to y1', () => {
      // Arrange
      const state = new ShapeState(rect, defaultFont);
      // Act & Assert
      expect(state.x1).toBe(rect.x);
      expect(state.y1).toBe(rect.y);
    });

    test('When changing from Line to Rect, width and height are set', () => {
      // Arrange
      const state = new ShapeState(line, defaultFont);
      // Act & Assert
      expect(state.width).toBe(2);
      expect(state.height).toBe(2);
    });

    test('When changing from Rect to Line, x2 and y2 are set', () => {
      // Arrange
      const state = new ShapeState(rect, defaultFont);
      // Act & Assert
      expect(state.x2).toBe(4);
      expect(state.y2).toBe(6);
    });

    test('When changing from Circle to Rect, width and height are set', () => {
      // Arrange
      const state = new ShapeState(circle, defaultFont);
      // Act & Assert
      expect(state.width).toBe(3);
      expect(state.height).toBe(3);
    });

    test('When changing from Rect to Circle, diameter is set', () => {
      // Arrange
      const state = new ShapeState(rect, defaultFont);
      // Act & Assert
      expect(state.diameter).toBe(3);
    });

    test('When changing from Circle to Line, x2 and y2 are set', () => {
      // Arrange
      const state = new ShapeState(circle, defaultFont);
      // Act & Assert
      expect(state.x1).toBe(1);
      expect(state.y1).toBe(2);
      expect(state.x2).toBe(4);
      expect(state.y2).toBe(5);
    });

    test('When changing from Rect to Text, defaultFont is set', () => {
      // Arrange
      const state = new ShapeState(rect, defaultFont);
      // Act & Assert
      expect(state.fontFamily).toBe(defaultFont.family);
      expect(state.fontSize).toBe(defaultFont.size);
      expect(state.fontStyle).toEqual([]);
    });
  });
});
