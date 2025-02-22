/**
 * Test for MultilineAdjuster
 *
 * Created by sunvisor on 2025/01/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import multilineAdjuster from "./multilineAdjuster";
import { AlignType, createText, Scale, Text, ValignType } from '../object';
import { TextData } from '../data';
import { expect } from 'vitest';


describe('Tests for multilineAdjuster when fitCell is true', () => {

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
    fitCell: true,
    font: {
      family: 'Helvetica',
      size: 10
    }
  }

  it('should return same text when text is very short', () => {
    // Arrange
    const text = createText({
      ...textConfig,
      text: 'B'.repeat(10),
    });
    // Act
    const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
    // Assert
    expect(result.count).toBe(1);
    expect((result.get(0) as Text).text).toBe('B'.repeat(10));
  });

  it('should return wrapped texts when text is not too long', () => {
    // Arrange
    const text = createText({
      ...textConfig,
      text: 'B'.repeat(100),
    });
    // Act
    const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
    // Assert
    expect(result.count).toBe(3);
    const firstText = result.get(0) as Text;
    expect(firstText.multiLine).toBe(false);
    expect(firstText.text).toBe('B'.repeat(40));
  });

  it('should adjust text alignment based on line position', () => {
    // Arrange
    const text = createText({
      ...textConfig,
      align: AlignType.JUSTIFY,
      text: 'B'.repeat(140),
    });
    // Act
    const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
    // Assert
    const firstText = result.get(0) as Text;
    expect(firstText.align).toBe(AlignType.JUSTIFY_ALL);
    const lastText = result.get(3) as Text;
    expect(lastText.align).toBe(AlignType.LEFT);
  });

  it('should return texts with shrunk font when text is too long', () => {
    // Arrange
    const text = createText({
      ...textConfig,
      text: 'B'.repeat(800),
    });
    // Act
    const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
    // Assert
    expect(result.count).toBe(10);
    const firstText = result.get(0) as Text;
    expect(firstText.text).toBe('B'.repeat(80));
    expect(firstText.font.size).toBe(5);
    const secondText = result.get(1) as Text;
    expect(secondText.y).toBe(1.764); // 1.764mm = 5 pt
  });

  describe('When valign is specified', () => {

    const pointScale = 72 / 25.4;
    const lineHeight = 5 / pointScale;
    const textHeight = lineHeight * 10;

    it('should return texts with adjusted y position when valign is bottom', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'D'.repeat(800),
        valign: ValignType.BOTTOM,
      });

      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(10);
      expect((result.get(0) as Text).font.size).toBe(5);
      expect((result.get(0) as Text).y).toBeCloseTo(text.height - textHeight, 2);
    });

    it('should return texts with adjusted y position when valign is middle', () => {
      // Arrange
      const text = createText({
        ...textConfig,
        text: 'D'.repeat(800),
        valign: ValignType.MIDDLE,
      });
      // Act
      const result = multilineAdjuster({ text, scale, measureWidth, measureHeight });
      // Assert
      expect(result.count).toBe(10);
      expect((result.get(0) as Text).y).toBeCloseTo((text.height - textHeight) / 2, 2);
    });

  });


});
