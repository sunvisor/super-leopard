/**
 * Test for SerializeFont
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { serializeFont } from "./serializeFont";
import { Font, FontStyleType } from "./Font";


describe('Tests for serializeFont', () => {

  it('should return serialized FontData', () => {
    // Arrange
    const font = new Font({
      family: 'serif',
      style: [FontStyleType.ITALIC, FontStyleType.BOLD],
      size: 10
    });
    // Act
    const result = serializeFont(font);
    // Assert
    expect(result).toEqual({ family: 'serif', style: 'italic,bold', size: 10 });
  });

  test('Serialized style property should be empty when style is empty array', () => {
    // Arrange
    const font = new Font({
      family: 'serif',
      style: [],
      size: 12
    });
    // Act
    const result = serializeFont(font);
    // Assert
    expect(result).toEqual({ family: 'serif', size: 12, style: '' });
  });

  test('Serialized style property should not include style when style is not specified', () => {
    // Arrange
    const font = new Font({
      family: 'serif',
      size: 12
    });
    // Act
    const result = serializeFont(font);
    // Assert
    expect(result).toEqual({ family: 'serif', size: 12 });
  });

  test('Serialized style property should be short syntax when useShortSyntax is true', () => {
    // Arrange
    const font = new Font({
      family: 'serif',
      style: [FontStyleType.ITALIC, FontStyleType.BOLD],
      size: 12
    });
    // Act
    const result = serializeFont(font, true);
    // Assert
    expect(result).toEqual({ family: 'serif', style: 'IB', size: 12 });
  });

});
