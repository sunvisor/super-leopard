/**
 * Test for WrappedText
 *
 * Created by sunvisor on 2023/12/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { WrappedText } from "./WrappedText";
import { describe, expect } from 'vitest';

describe('Tests for WrappedText', () => {

  function toMatchWrappedText(wrappedText: WrappedText, expectedText: string[], expectedEndOfLine: boolean[]) {
    wrappedText.each((text, endOfLine, index) => {
      expect(text).toBe(expectedText[index]);
      expect(endOfLine).toBe(expectedEndOfLine[index]);
    })
  }

  describe('Tests for push', () => {

    it('should append text as a line with endOfLine is true', () => {
      // Arrange
      const wrappedText = new WrappedText();
      // Act
      wrappedText.push('first', true);
      wrappedText.push('second', true);
      // Assert
      toMatchWrappedText(wrappedText, ['first', 'second'], [true, true]);
    });

    it('should append text as a line with endOfLine is false', () => {
      // Arrange
      const wrappedText = new WrappedText();
      // Act
      wrappedText.push('first', false);
      wrappedText.push('second', false);
      // Assert
      toMatchWrappedText(wrappedText, ['first', 'second'], [false, false]);
    });

  });

  describe('Tests for join', () => {

    it('should return joined text', () => {
      // Arrange
      const wrappedText = new WrappedText();
      // Act
      wrappedText.push('first', true);
      wrappedText.push('second', true);
      // Assert
      expect(wrappedText.join()).toBe('first\nsecond');
    });

  });

  describe('Test for each', () => {

    it('should call callback for each line', () => {
      // Arrange
      const wrappedText = new WrappedText();
      const callback = vi.fn();
      // Act
      wrappedText.push('test1', true);
      wrappedText.push('test2', true);
      wrappedText.each(callback);
      // Assert
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(1, 'test1', true, 0);
      expect(callback).toHaveBeenNthCalledWith(2, 'test2', true, 1);
    });

  });

  describe('Test for length', () => {

    it('should return the number of lines', () => {
      // Arrange
      const wrappedText = new WrappedText();
      // Act
      wrappedText.push('test1', true);
      wrappedText.push('test2', true);
      // Assert
      expect(wrappedText.length()).toBe(2);
    });

  });

  describe('Test for cutOff', () => {

    it('should return a new instance with the first n lines', () => {
      // Arrange
      const wrappedText = new WrappedText();
      wrappedText.push('test1', true);
      wrappedText.push('test2', true);
      wrappedText.push('test3', true);
      wrappedText.push('test4', true);
      wrappedText.push('test5', true);
      // Act
      const result = wrappedText.truncate(3);
      // Assert
      expect(wrappedText.length()).toBe(5);
      expect(result.length()).toBe(3);
    });

  });

  describe('Test for getText', () => {

    it('should return the text of the line', () => {
      // Arrange
      const wrappedText = new WrappedText();
      wrappedText.push('test1', true);
      wrappedText.push('test2', true);
      wrappedText.push('test3', true);
      wrappedText.push('test4', true);
      wrappedText.push('test5', true);
      // Assert
      expect(wrappedText.getText(0)).toBe('test1');
      expect(wrappedText.getText(1)).toBe('test2');
      expect(wrappedText.getText(2)).toBe('test3');
    });

  });

  describe('Test for getEndOfLine', () => {

    it('should return the endOfLine of the line', () => {
      // Arrange
      const wrappedText = new WrappedText();
      wrappedText.push('test1', false);
      wrappedText.push('test2', true);
      wrappedText.push('test3', false);
      wrappedText.push('test4', true);
      wrappedText.push('test5', true);
      // Assert
      expect(wrappedText.getEndOfLine(0)).toBe(false);
      expect(wrappedText.getEndOfLine(1)).toBe(true);
      expect(wrappedText.getEndOfLine(2)).toBe(false);
    });

  });

});
