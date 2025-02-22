/**
 * Test for CreateFont
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createFont } from "./createFont";
import { FontStyleType } from "./Font";


describe('Tests for createFont', () => {

  test('Create Font with one style', () => {
    // Arrange
    const config = {
      family: 'serif', style: 'italic', size: 12
    };
    // Act
    const font = createFont(config);
    // Assert
    expect(font.style).toEqual([
      FontStyleType.ITALIC
    ]);
  });

  test('Create Font with multiple styles', () => {
    // Arrange
    const config = {
      family: 'serif', style: 'italic, bold, underline, strike', size: 12
    };
    // Act
    const font = createFont(config);
    // Assert
    expect(font.style).toEqual([
      FontStyleType.ITALIC, FontStyleType.BOLD, FontStyleType.UNDERLINE, FontStyleType.STRIKE
    ]);
  });

  test('Create Font with short syntax', () => {
    // Arrange
    const config = {
      family: 'serif', style: 'IBUS', size: 12
    };
    // Act
    const font = createFont(config);
    // Assert
    expect(font.style).toEqual([
      FontStyleType.ITALIC, FontStyleType.BOLD, FontStyleType.UNDERLINE, FontStyleType.STRIKE
    ]);
  });

  test('Create Font with empty style', () => {
    // Arrange
    const config = { family: 'serif', style: '', size: 12 };
    // Act
    const font = createFont(config);
    // Assert
    expect(font.style).toEqual([]);
  });

  test('Create Font without style', () => {
    // Arrange
    const config = { family: 'serif', size: 12 };
    // Act
    const font = createFont(config);
    // Assert
    expect(font.style).toEqual([]);
    expect(font.config.style).toBeUndefined();
  });

});
