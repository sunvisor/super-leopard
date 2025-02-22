/**
 * Test for Text
 *
 * Created by sunvisor on 2023/11/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Text, AlignType, TextConfig, ValignType } from "./Text";
import { Color, Font, FontStyleType } from "../style";
import { Box, Position } from "../../value";
import { TextShape } from '../shape';

function prepare(): [Color, Font] {
  return [
    new Color('#000000'),
    new Font({
      family: 'serif', style: [FontStyleType.ITALIC], size: 12
    }),
  ];
}

describe('Tests for Text', () => {

  describe('Tests for creation', () => {

    test('Create Text with minimal config', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, width: 100, height: 7, font, color
      }
      // Act
      const text = new Text(config);
      // Assert
      expect(text.type).toBe(TextShape);
      expect(text.x).toBe(config.x);
      expect(text.y).toBe(config.y);
      expect(text.width).toBe(config.width);
      expect(text.height).toBe(config.height);
      expect(text.color).toEqual(color);
      expect(text.font).toEqual(font);
      expect(text.fillColor).toBeUndefined();
      expect(text.align).toBeUndefined();
      expect(text.valign).toBeUndefined();
      expect(text.linePitch).toBeUndefined();
    });

    test('text property should be converted to empty string when text is not specified', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, width: 100, height: 7, font, color
      }
      // Act
      const text = new Text(config);
      // Assert
      expect(text.text).toBe('');
    });

    test('multiLine property should be converted to false when multiLine is not specified', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, width: 100, height: 7, text: 'text', font, color
      }
      // Act
      const text = new Text(config);
      // Assert
      expect(text.multiLine).toBeFalsy();
    });

    test('fitCell property should be converted to false when fitCell is not specified', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, width: 100, height: 7, text: 'text', font, color
      }
      // Act
      const text = new Text(config);
      // Assert
      expect(text.fitCell).toBeFalsy();
    });

    it('should not be possible to specify linePitch when multiLine is false', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, width: 100, height: 7, text: 'text', font, color, linePitch: 10,
      }
      // Assert
      expect(() => new Text(config)).toThrow('To specify linePitch, multiLine must be specified');
    });

    test('width must be positive', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: -10, height: 7,
      }
      // Assert
      expect(() => new Text(config)).toThrow('width must be positive');
    });

    test('height must be positive', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: -10
      }
      // Assert
      expect(() => new Text(config)).toThrow('height must be positive');
    });

    it('should not be possible to specify underline when multiLine is true', () => {
      // Arrange
      const [color] = prepare();
      const font = new Font({
        family: 'serif', style: [FontStyleType.UNDERLINE], size: 12
      });
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, multiLine: true
      }
      // Assert
      expect(() => new Text(config)).toThrow('underline is not supported in multiLine mode');
    });

    it('should not be possible to specify strike to style when multiLine is true', () => {
      // Arrange
      const [color] = prepare();
      const font = new Font({
        family: 'serif', style: [FontStyleType.STRIKE], size: 12
      });
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, multiLine: true
      }
      // Assert
      expect(() => new Text(config)).toThrow('strike is not supported in multiLine mode');
    });

    it('should not be possible to specify linePitch when fitCell is true', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 10, fitCell: true, multiLine: true, linePitch: 10
      }
      // Assert
      expect(() => new Text(config)).toThrow('linePitch is not supported in fitCell mode');
    });

  });

  describe('Test for bbox', () => {

    it('should return bounding box', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      // Assert
      expect(text.bbox).toEqual({
        x: 1, y: 2, width: 10, height: 20
      });
    });

  });

  describe('Test for config', () => {

    it('should return config values', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      // Assert
      expect(text.config).toEqual(config);
    });

  });

  describe('Tests for moveTo', () => {

    it('should return a new moved instance', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const pos: Position = { x: 11, y: 12 };
      // Act
      const newText = text.moveTo(pos);
      // Assert
      expect(text.x).toBe(1);
      expect(text.y).toBe(2);
      expect(newText.x).toBe(11);
      expect(newText.y).toBe(12);
      assertOtherProperties(newText, text, ['x', 'y']);
    });

  });

  describe('Tests for resize', () => {

    it('should return a new resized instance', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const box: Box = { x: 11, y: 12, width: 13, height: 14 };
      // Act
      const newText = text.resize(box);
      // Assert
      expect(text.x).toBe(1);
      expect(text.y).toBe(2);
      expect(text.width).toBe(10);
      expect(text.height).toBe(20);
      expect(newText.x).toBe(box.x);
      expect(newText.y).toBe(box.y);
      expect(newText.width).toBe(box.width);
      expect(newText.height).toBe(box.height);
      assertOtherProperties(newText, text, ['x', 'y', 'width', 'height']);
    });
  });

  describe('Tests for set', () => {

    it('should return a new instance with changed x', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newX = 11;
      // Act
      const newText = text.set('x', newX);
      // Assert
      expect(text.x).toBe(1);
      expect(newText.x).toBe(newX);
      assertOtherProperties(newText, text, ['x']);
    });

    it('should return a new instance with changed y', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newY = 11;
      // Act
      const newText = text.set('y', newY);
      // Assert
      expect(text.y).toBe(2);
      expect(newText.y).toBe(newY);
      assertOtherProperties(newText, text, ['y']);
    });

    it('should return a new instance with changed text', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newValue = 'newText';
      // Act
      const newText = text.set('text', newValue);
      // Assert
      expect(text.text).toBe('text');
      expect(newText.text).toBe(newValue);
      assertOtherProperties(newText, text, ['text']);
    });

    it('should return a new instance with changed width', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newWidth = 11;
      // Act
      const newText = text.set('width', newWidth);
      // Assert
      expect(text.width).toBe(10);
      expect(newText.width).toBe(newWidth);
      assertOtherProperties(newText, text, ['width']);
    });

    it('should return a new instance with changed height', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newHeight = 11;
      // Act
      const newText = text.set('height', newHeight);
      // Assert
      expect(text.height).toBe(20);
      expect(newText.height).toBe(newHeight);
      assertOtherProperties(newText, text, ['height']);
    });

    it('should return a new instance with changed font', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newFont = new Font({ family: 'serif', size: 11, style: [] });
      // Act
      const newText = text.set('font', newFont);
      // Assert
      expect(text.font).toBe(font);
      expect(newText.font).toBe(newFont);
      assertOtherProperties(newText, text, ['font']);
    });

    it('should return a new instance with changed color', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newColor = new Color('#ff0000');
      // Act
      const newText = text.set('color', newColor);
      // Assert
      expect(text.color).toBe(color);
      expect(newText.color).toBe(newColor);
      assertOtherProperties(newText, text, ['color']);
    });

    it('should return a new instance with changed fillColor', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20
      }
      const text = new Text(config);
      const newFillColor = new Color('#ff0000');
      // Act
      const newText = text.set('fillColor', newFillColor);
      // Assert
      expect(text.fillColor).toBeUndefined();
      expect(newText.fillColor).toBe(newFillColor);
      assertOtherProperties(newText, text, ['fillColor']);
    });

    it('should return a new instance with changed align', () => {
      // Arrange
      const [color, font] = prepare();
      const align = AlignType.LEFT;
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, align,
      }
      const text = new Text(config);
      const newAlign = AlignType.RIGHT;
      // Act
      const newText = text.set('align', newAlign);
      // Assert
      expect(text.align).toBe('left');
      expect(newText.align).toBe(newAlign);
      assertOtherProperties(newText, text, ['align']);
    });

    it('should return a new instance with changed valign', () => {
      // Arrange
      const [color, font] = prepare();
      const valign = ValignType.TOP;
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, valign,
      }
      const text = new Text(config);
      const newValign = ValignType.BOTTOM;
      // Act
      const newText = text.set('valign', newValign);
      // Assert
      expect(text.valign).toBe('top');
      expect(newText.valign).toBe(newValign);
      assertOtherProperties(newText, text, ['valign']);
    });

    it('should return a new instance with changed linePitch', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, multiLine: true,
      }
      const text = new Text(config);
      const newLinePitch = 2;
      // Act
      const newText = text.set('linePitch', newLinePitch);
      // Assert
      expect(text.linePitch).toBeUndefined();
      expect(newText.linePitch).toBe(newLinePitch);
      assertOtherProperties(newText, text, ['linePitch']);
    });

    it('should return a new instance with changed multiLine', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, multiLine: true,
      }
      const text = new Text(config);
      const newMultiLine = false;
      // Act
      const newText = text.set('multiLine', newMultiLine);
      // Assert
      expect(text.multiLine).toBe(true);
      expect(newText.multiLine).toBe(newMultiLine);
      assertOtherProperties(newText, text, ['multiLine']);
    });

    it('should return a new instance with changed fitCell', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20, fitCell: true,
      }
      const text = new Text(config);
      const newFitCell = false;
      // Act
      const newText = text.set('fitCell', newFitCell);
      // Assert
      expect(text.fitCell).toBe(true);
      expect(newText.fitCell).toBe(newFitCell);
      assertOtherProperties(newText, text, ['fitCell']);
    });

  });

  describe('Tests for equals', () => {

    it('should return true when Text is equal', () => {
      // Arrange
      const [color, font] = prepare();
      const config: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20,
      }
      const text1 = new Text(config);
      const text2 = new Text(config);
      // Act
      const result = text1.equals(text2);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when Text is not equal', () => {
      // Arrange
      const [color, font] = prepare();
      const config1: TextConfig = {
        x: 1, y: 2, text: 'text', font, color, width: 10, height: 20,
      }
      const config2: TextConfig = {
        x: 1, y: 2, text: 'text2', font, color, width: 10, height: 20,
      }
      const text1 = new Text(config1);
      const text2 = new Text(config2);
      // Act
      const result = text1.equals(text2);
      // Assert
      expect(result).toBe(false);
    });

  });

  function assertOtherProperties(text1: Text, text2: Text, omitKeys: (keyof Text)[] = [],) {
    const allKeys: (keyof Text)[] = [
      'x', 'y', 'width', 'height',
      'text', 'font', 'color', 'fillColor',
      'align', 'valign', 'linePitch', 'multiLine', 'fitCell',
    ];
    allKeys.forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      expect(text1[key]).toBe(text2[key]);
    });
  }

});
