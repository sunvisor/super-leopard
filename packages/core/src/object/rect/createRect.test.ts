/**
 * Test for CreateRect
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createRect } from "./createRect";
import { RectData } from '../../data';
import { Rect } from './Rect';
import { RectShape, LineShape } from '../shape';

describe('Tests for createRect', () => {

  it('should create Rect', () => {
    // Arrange
    const data: RectData = {
      type: RectShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      border: { width: 1, color: '#000000', style: 'solid', cap: 'round', join: 'miter' },
      fillColor: '#ffffff',
    };
    // Act
    const rect = createRect(data);
    // Assert
    expect(rect.x).toEqual(data.x);
    expect(rect.y).toEqual(data.y);
    expect(rect.width).toEqual(data.width);
    expect(rect.height).toEqual(data.height);
    expect(rect.border?.width).toEqual(data.border?.width);
    expect(rect.border?.color?.color).toEqual(data.border?.color);
    expect(rect.border?.style).toEqual(data.border?.style);
    expect(rect.border?.cap).toEqual(data.border?.cap);
    expect(rect.border?.join).toEqual(data.border?.join);
    expect(rect.fillColor?.color).toEqual(data.fillColor);
  });

  it('type is optional', () => {
    // Arrange
    const data: RectData = { x: 1, y: 2, width: 3, height: 4 };
    // Act
    const rect = createRect(data);
    // Assert
    expect(rect.type).toEqual(RectShape);
    expect(rect).toBeInstanceOf(Rect);
  });

  it('border and fillColor should be undefined if not specified', () => {
    // Arrange
    const data: RectData = {
      type: RectShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    };
    // Act
    const rect = createRect(data);
    // Assert
    expect(rect.border).toBeUndefined();
    expect(rect.fillColor).toBeUndefined();
  });

  it('should throw error when type is not rect', () => {
    // Arrange
    const data: RectData = {
      // @ts-expect-error Invalid type
      type: LineShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    };
    // Act
    // Assert
    expect(() => createRect(data)).toThrow('Invalid shape type: line');
  });

});
