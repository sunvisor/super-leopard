/**
 * Test for WrapText
 *
 * Created by sunvisor on 2025/01/12.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createText, Scale, Text } from '../object';
import { wrapText } from "./wrapText";
import { TextData } from '../data';
import { expect } from 'vitest';


describe('Tests for wrapText', () => {

  const measureWidth = (text: Text): number => {
    return text.text.length * text.font.size;
  }

  const scale: Scale = new Scale({
    unit: 'mm',
  });

  const textConfig: TextData = {
    type: 'text',
    width: 141.2, // nearly 400 pt
    height: 100,
    x: 0,
    y: 0,
    font: {
      family: 'NotoSansJP',
      size: 10
    }
  }

  test.each([
    [40, 1, true],
    [80, 2, false],
    [81, 3, false],
  ])('wrapText(%d) should return %d', (length: number, lines: number, eol: boolean) => {
    // Arrange
    const content = '愛'.repeat(length);
    const text = createText({
      ...textConfig,
      text: content,
    })
    // Act
    const wrappedText = wrapText({ text, measureWidth, scale });
    // Assert
    expect(wrappedText.getText(0).length).toBe(40);
    expect(wrappedText.getEndOfLine(0)).toBe(eol);
    expect(wrappedText.length()).toBe(lines);
  });


  it('should line feed with LF', () => {
    // Arrange
    const content = '愛'.repeat(30) + '\n' + '愛'.repeat(2);
    const text = createText({
      ...textConfig,
      text: content,
    })
    // Act
    const wrappedText = wrapText({ text, measureWidth, scale });
    // Assert
    expect(wrappedText.getText(0).length).toBe(30);
    expect(wrappedText.getEndOfLine(0)).toBe(true);
    expect(wrappedText.getText(1).length).toBe(2);
    expect(wrappedText.length()).toBe(2);
  });

});
