/**
 * Test for SingleLineAdjuster
 *
 * Created by sunvisor on 2025/01/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Scale, Text } from '../object';
import singleLineAdjuster from "./singleLineAdjuster";
import { createText } from '../creator';
import { TextData } from '../data';


describe('Tests for singleLineAdjuster', () => {

  const measureWidth = (text: Text): number => {
    return text.text.length * text.font.size;
  }

  const measureHeight = (text: Text): number => {
    return text.font.size;
  }

  const scale: Scale = new Scale({
    unit: 'mm',
  });

  const textConfig: TextData = {
    type: 'text',
    x: 0,
    y: 0,
    width: 141.2,
    height: 10,
    font: {
      family: 'Helvetica',
      size: 10
    }
  }

  describe('When fitCell is false', () => {

    test('Should return same text when text is not too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'A'.repeat(40),
      });
      // Act
      const result = singleLineAdjuster({ text, measureWidth, measureHeight, scale });
      // Assert
      expect(result.text).toBe('A'.repeat(40));
    });

    test('Should return truncated text when text is too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'A'.repeat(41),
      });
      // Act
      const result = singleLineAdjuster({ text, measureWidth, measureHeight, scale });
      // Assert
      expect(result.text).toBe('A'.repeat(40));
    });
  });

  describe('When fitCell is true', () => {

    test('Should return same text when text is not too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'A'.repeat(40),
      });
      // Act
      const result = singleLineAdjuster({ text, measureWidth, measureHeight, scale });
      // Assert
      expect(result.text).toBe('A'.repeat(40));
    });

    test('Should return text with adjusted font size when text is too long', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        fitCell: true,
        text: 'A'.repeat(80),
      });
      // Act
      const result = singleLineAdjuster({ text, measureWidth, measureHeight, scale });
      // Assert
      expect(result.font.size).toBe(5);
    });

  });

  describe('When valign is specified', () => {

    test('Should return text with adjusted y position when valign is bottom', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        fitCell: true,
        text: 'A'.repeat(80),
        valign: 'bottom',
      });
      // Act
      const result = singleLineAdjuster({ text, measureWidth, measureHeight, scale });
      // Assert
      expect(result.y).toBe(6.472);
    });

    test('Should return text with adjusted y position when valign is middle', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        fitCell: true,
        text: 'A'.repeat(80),
        valign: 'middle',
      });
      // Act
      const result = singleLineAdjuster({ text, measureWidth, measureHeight, scale });
      // Assert
      expect(result.y).toBe(6.472 / 2);
    });

  });

});

