/**
 * Test for CreateText
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createText } from "./createText";
import { Text } from "./Text";
import { TextData } from '../../data';
import { TextShape } from '../shape';
import { Color } from '../style';


describe('Tests for createText', () => {

  it('should create Text with minimal parameters', () => {
    // Arrange
    const data: TextData = {
      type: TextShape,
      x: 1,
      y: 2,
      width: 100,
      height: 7,
      font: {
        family: 'serif',
        size: 12
      }
    };
    // Act
    const text = createText(data);
    // Assert
    expect(text.x).toEqual(data.x);
    expect(text.y).toEqual(data.y);
    expect(text.text).toEqual('');
    expect(text.font.family).toEqual(data.font.family);
    expect(text.font.size).toEqual(data.font.size);
    expect(text.color).toEqual(new Color('#000000'));
    expect(text.width).toBe(data.width);
    expect(text.height).toBe(data.height);
    expect(text.align).toBeUndefined();
    expect(text.valign).toBeUndefined();
    expect(text.multiLine).toBeFalsy();
    expect(text.linePitch).toBeUndefined();
    expect(text.fitCell).toBeFalsy();
  });

  it('type is optional', () => {
    // Arrange
    const data: TextData = {
      x: 1,
      y: 2,
      width: 100,
      height: 7,
      font: {
        family: 'serif',
        size: 12
      }
    };
    // Act
    const text = createText(data);
    // Assert
    expect(text.type).toEqual(TextShape);
    expect(text).toBeInstanceOf(Text);
  })

  it('should create Text with all parameters', () => {
    // Arrange
    const data: TextData = {
      type: TextShape,
      x: 1,
      y: 2,
      text: 'text',
      font: {
        family: 'serif',
        size: 12
      },
      color: '#000000',
      width: 100,
      height: 20,
      fillColor: '#ffffff',
      align: 'center',
      valign: 'middle',
      multiLine: true,
      fitCell: true
    };
    // Act
    const text = createText(data);
    // Assert
    expect(text.text).toEqual(data.text);
    expect(text.color).toEqual(new Color('#000000'));
    expect(text.width).toEqual(data.width);
    expect(text.height).toEqual(data.height);
    expect(text.fillColor).toEqual(new Color('#ffffff'));
    expect(text.align).toEqual(data.align);
    expect(text.valign).toEqual(data.valign);
    expect(text.multiLine).toEqual(data.multiLine);
    expect(text.fitCell).toEqual(data.fitCell);
  });

  it('should throw error when invalid type', () => {
    // Arrange
    const data: TextData = {
      // @ts-expect-error Invalid type
      type: 'line',
      x: 1,
      y: 2,
      text: 'text',
      font: {
        family: 'serif',
        size: 12
      }
    };
    // Act
    // Assert
    expect(() => createText(data)).toThrow('Invalid shape type: line');
  });

});
