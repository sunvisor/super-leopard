/**
 * Test for TextAdjuster
 *
 * Created by sunvisor on 2025/01/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { textAdjuster, TextAdjusterParams } from ".";
import multilineAdjuster from './multilineAdjuster';
import singleLineAdjuster from './singleLineAdjuster';
import { Rect, Scale, Shapes } from '../object';
import { TextData } from '../data';
import { createText } from '../creator';


vi.mock('./multilineAdjuster');
vi.mock('./singleLineAdjuster');

describe('Tests for textAdjuster', () => {

  const scale = new Scale({ unit: 'mm' });

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

  test('Should call multilineAdjuster when multiLine is true', () => {
    // Arrange
    const text = createText({ ...textConfig, multiLine: true, text: 'Test' });
    const mockMultilineAdjuster = vi.fn(() => new Shapes([]));
    vi.mocked(multilineAdjuster).mockImplementation(mockMultilineAdjuster);
    const params: TextAdjusterParams = {
      text,
      measureWidth: vi.fn(() => 10),
      measureHeight: vi.fn(() => 20),
      scale,
    };
    // Act
    const result = textAdjuster(params);
    // Assert
    expect(mockMultilineAdjuster).toHaveBeenCalledWith(params);
    expect(result).toBeInstanceOf(Shapes);
  });

  describe('Tests for single line', () => {

    const baseParams: TextAdjusterParams = {
      text: undefined,
      measureWidth: vi.fn(() => 10),
      measureHeight: vi.fn(() => 20),
      scale,
    };

    test('Should call singleLineAdjuster when multiLine is false', () => {
      // Arrange
      const text = createText({ ...textConfig, multiLine: false, text: 'Test' });
      const mockSingleLineAdjuster = vi.fn(() => text);
      vi.mocked(singleLineAdjuster).mockImplementation(mockSingleLineAdjuster);
      const params = { ...baseParams, text };
      // Act
      const result = textAdjuster(params);
      // Assert
      expect(mockSingleLineAdjuster).toHaveBeenCalledWith(params);
      expect(result).toBeInstanceOf(Shapes);
      expect(result.get(0)).toEqual(text);
    });

    test('Should add rect object when fillColor is specified', () => {
      // Arrange
      const text = createText({ ...textConfig, multiLine: false, text: 'Test', fillColor: '#FF0000' });
      const mockSingleLineAdjuster = vi.fn(() => text);
      vi.mocked(singleLineAdjuster).mockImplementation(mockSingleLineAdjuster);
      const params = { ...baseParams, text };
      // Act
      const result = textAdjuster(params);
      // Assert
      expect(mockSingleLineAdjuster).toHaveBeenCalledWith(params);
      expect(result).toBeInstanceOf(Shapes);
      expect(result.get(0)).toBeInstanceOf(Rect);
    });
  });

});
