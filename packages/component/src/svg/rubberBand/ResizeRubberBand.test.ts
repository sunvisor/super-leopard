/**
 * Test for ResizeRubberBand
 *
 * Created by sunvisor on 2024/01/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { resizeBox } from "./ResizeRubberBand";
import { HandleType } from '../boundingBox';

describe('Tests for ResizeRubberBand', () => {

  describe('Tests for resizeBox', () => {

    it('should resize using the top-left handle when type is left-top', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'left-top';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 50, y: 50, width: 50, height: 50
      });
    });

    it('should resize using the right-bottom handle when type is right-bottom', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'right-bottom';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 0, y: 0, width: 50, height: 50
      });
    });

    it('should resize using the right-top handle when type is right-top', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'right-top';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 0, y: 50, width: 50, height: 50
      });
    });

    it('should resize using the left-bottom handle when type is left-bottom', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'left-bottom';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 50, y: 0, width: 50, height: 50
      });
    });

    it('should resize using the top handle when type is top', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'top';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 0, y: 50, width: 100, height: 50
      });
    });

    it('should resize using the bottom handle when type is bottom', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'bottom';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 0, y: 0, width: 100, height: 50
      });
    });

    it('should resize using the left handle when type is left', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'left';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 50, y: 0, width: 50, height: 100
      });
    });

    it('should resize using the right handle when type is right', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'right';
      const pos = {x: 50, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toEqual({
        x: 0, y: 0, width: 50, height: 100
      });
    });

    it('should return undefined for horizontal position beyond the opposite side of the box', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'left';
      const pos = {x: 150, y: 50};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toBeUndefined();
    });

    it('should return undefined for vertical position beyond the opposite side of the box', () => {
      // Arrange
      const originalBox = {
        x: 0, y: 0, width: 100, height: 100
      }
      const type: HandleType = 'top';
      const pos = {x: 50, y: 150};
      // Act
      const resultBox = resizeBox(type, originalBox, pos);
      // Assert
      expect(resultBox).toBeUndefined();
    });

  });

});
