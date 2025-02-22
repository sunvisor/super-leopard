/**
 * Test for Value
 *
 * Created by sunvisor on 2024/01/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { MAX_SCALE_VALUE, normalizeBox, positionsToBox } from "./value";

describe('Tests for value', () => {

  describe('Tests for normalizeBox', () => {

    it('should return same box when width and height are positive', () => {
      // Arrange
      const box = { x: 10, y: 10, width: 100, height: 100 };
      // Act
      const result = normalizeBox(box);
      // Assert
      expect(result).toEqual({ x: 10, y: 10, width: 100, height: 100 });
    });

    it('should return reversed box when width and height are negative', () => {
      // Arrange
      const box = { x: 110, y: 110, width: -100, height: -100 };
      // Act
      const result = normalizeBox(box);
      // Assert
      expect(result).toEqual({ x: 10, y: 10, width: 100, height: 100 });
    });

  });

  describe('Tests for positionsToBox', () => {

    it('should return the correct box when pos1 is smaller than pos2', () => {
      // Arrange
      const pos1 = { x: 10, y: 10 };
      const pos2 = { x: 20, y: 20 };
      // Act
      const result = positionsToBox(pos1, pos2);
      // Assert
      expect(result).toEqual({ x: 10, y: 10, width: 10, height: 10 });
    });

    it('should return the correct box when pos1 is larger than pos2', () => {
      // Arrange
      const pos1 = { x: 20, y: 20 };
      const pos2 = { x: 10, y: 10 };
      // Act
      const result = positionsToBox(pos1, pos2);
      // Assert
      expect(result).toEqual({ x: 10, y: 10, width: 10, height: 10 });
    });

  });

  describe('Tests for MAX_SCALE_VALUE', () => {

    it('should MAX_SCALE_VALUE be 9999', () => {
      expect(MAX_SCALE_VALUE).toBe(9999);
    });

  });
});
