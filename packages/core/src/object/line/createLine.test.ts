/**
 * Test for CreateLine
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createLine } from "./createLine";
import { Line } from "./Line";
import { BorderData, LineData } from '../../data';
import { LineShape } from '../shape';
import { DEFAULT_COLOR } from '../style';


describe('Tests for createLine', () => {

  it('should create Line', () => {
    // Arrange
    const border: BorderData = { width: 1, color: '#000000', style: 'solid', cap: 'round', join: 'bevel' };
    const data: LineData = {
      type: LineShape,
      x1: 0, y1: 0, x2: 0, y2: 0, border
    };
    // Act
    const line = createLine(data);
    // Assert
    expect(line.x1).toEqual(data.x1);
    expect(line.y1).toEqual(data.y1);
    expect(line.x2).toEqual(data.x2);
    expect(line.y2).toEqual(data.y2);
    expect(line.border.width).toEqual(border.width);
    expect(line.border.color.color).toEqual(border.color);
    expect(line.border.style).toEqual(border.style);
    expect(line.border.cap).toEqual(border.cap);
    expect(line.border.join).toEqual(border.join);
  });

  it('type is optional', () => {
    // Arrange
    const data: LineData = { x1: 0, y1: 0, x2: 0, y2: 0 };
    // Act
    const line = createLine(data);
    // Assert
    expect(line.type).toEqual(LineShape);
    expect(line).toBeInstanceOf(Line);
  });

  it('should create Line without border', () => {
    // Arrange
    const data: LineData = { type: LineShape, x1: 0, y1: 0, x2: 0, y2: 0 };
    // Act
    const line = createLine(data);
    // Assert
    expect(line.border.color.color).toEqual(DEFAULT_COLOR);
  });

  it('should throw error when type is invalid', () => {
    // Arrange
    // @ts-expect-error Invalid type
    const data: LineData = { type: 'rect', x1: 0, y1: 0, x2: 0, y2: 0 };
    // Act
    // Assert
    expect(() => createLine(data)).toThrow('Invalid shape type: rect');
  });

});
