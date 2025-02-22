/**
 * Test for MultilineAdjuster
 *
 * Created by sunvisor on 2025/01/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import multilineAdjuster from "./multilineAdjuster";
import { createText, Scale, Text, ValignType } from '../object';
import { TextData } from '../data';
import { expect } from 'vitest';


describe('Tests for multilineAdjuster when fitCell is false', () => {

  const scale: Scale = new Scale({
    unit: 'mm',
  });

  const measureWidth = (text: Text): number => {
    return text.text.length * text.font.size;
  }

  const measureHeight = (text: Text): number => {
    return text.font.size;
  }

  const textConfig: TextData = {
    type: 'text',
    x: 0,
    y: 0,
    width: 141.2, // nearly 400 pt
    height: 17.7, // nearly 50 pt
    multiLine: true,
    fitCell: false,
    font: {
      family: 'Helvetica',
      size: 10
    }
  }

  describe('When without linePitch', () => {

    it('should return same text when text is very short', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'A'.repeat(10),
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(1);
      expect((result.get(0) as Text).text).toBe('A'.repeat(10));
    });

    it('should return same text when text is not too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'A'.repeat(140),
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(4);

    });

    it('should return truncated texts when text is too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'A'.repeat(1000),
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(5);
      const firstText = result.get(0) as Text;
      expect(firstText.text).toBe('A'.repeat(40));
      expect(firstText.font.size).toBe(10);
    });

    describe('When valign is specified', () => {

      it('should return texts with adjusted y position when valign is bottom', () => {
        // Arrange
        const text = createText({
          ...textConfig,
          height: 20,
          text: 'C'.repeat(70),
          valign: ValignType.BOTTOM,
        });

        // Act
        const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
        // Assert
        expect(result.count).toBe(2);
        expect((result.get(0) as Text).y).toBeCloseTo(13, 0);
      });

      it('should return texts with adjusted y position when valign is middle', () => {
        // Arrange
        const text = createText({
          ...textConfig,
          text: 'C'.repeat(70),
          height: 20,
          valign: ValignType.MIDDLE,
        });
        // Act
        const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
        // Assert
        expect(result.count).toBe(2);
        expect((result.get(0) as Text).y).toBeCloseTo(6.5, 1);
      });

    });

  });

  describe('When with linePitch', () => {

    it('should return same text when text is very short', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        linePitch: 15,
        text: 'A'.repeat(10),
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(1);
      expect((result.get(0) as Text).text).toBe('A'.repeat(10));
    });

    it('should return same text when text is not too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        height: 60,
        linePitch: 20,
        text: 'A'.repeat(100),
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(3);

    });

    it('should return truncated texts when text is too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        height: 60,
        linePitch: 20,
        text: 'A'.repeat(400),
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(3);
      const secondText = result.get(1) as Text;
      expect(Math.round(secondText.y)).toBe(20);
    });

    describe('When valign is specified', () => {

      it('should return texts with adjusted y position when valign is bottom', () => {
        const text = createText({
          ...textConfig,
          height: 80,
          linePitch: 20,
          valign: ValignType.BOTTOM,
          text: 'A'.repeat(100),
        });
        // Act
        const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
        // Assert
        expect(result.count).toBe(3);
        expect((result.get(0) as Text).y).toBeCloseTo(20, 0);
      });

      it('should return texts with adjusted y position when valign is middle', () => {
        // Arrange
        const text = createText({
          ...textConfig,
          height: 80,
          linePitch: 20,
          valign: ValignType.MIDDLE,
          text: 'A'.repeat(100),
        });
        // Act
        const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
        // Assert
        expect(result.count).toBe(3);
        expect((result.get(0) as Text).y).toBeCloseTo(10, 0);
      });

    });

  });

});

