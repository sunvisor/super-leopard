/**
 * Test for Index
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { adjustPosition, moveElement } from './';
import { Shape } from '@svgdotjs/svg.js';

describe('Tests for append rubberBand functions', () => {

  describe('Tests for adjustPosition', () => {

    test('Should returns the end position adjusted to match the width and height', () => {
      // Act
      const result = adjustPosition({ x: 10, y: 10 }, { x: 100, y: 200 });
      // Assert
      expect(result).toEqual({ x: 100, y: 100 });
    });

    test('When the end position is less than the start position', () => {
      // Act
      const result = adjustPosition({ x: 100, y: 120 }, { x: 10, y: 20 });
      // Assert
      expect(result).toEqual({ x: 10, y: 30 });
    })

  });

  describe('Test for moveElement', () => {

    test('Should move and resize element', () => {
      // Arrange
      const element: Shape = {
        move: vi.fn(() => element),
        size: vi.fn()
      } as unknown as Shape;
      // Act
      moveElement({ x: 10, y: 10 }, { x: 110, y: 210 }, element);
      // Assert
      expect(element.move).toHaveBeenCalledWith(10, 10);
      expect(element.size).toHaveBeenCalledWith(100, 200);
    });

  });

});
