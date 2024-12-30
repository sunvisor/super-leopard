/**
 * Test for CreateBorder
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createBorder } from "./createBorder";
import { BorderData } from '../data';

describe('Tests for createBorder', () => {

  test('Should create Border', () => {
    // Arrange
    const data : BorderData = { width: 1, color: '#000000', style: 'solid', cap: 'round', join: 'bevel' };
    // Act
    const border = createBorder(data);
    // Assert
    expect(border.width).toEqual(data.width);
    expect(border.color?.color).toEqual(data.color);
    expect(border.style).toEqual(data.style);
    expect(border.cap).toEqual(data.cap);
    expect(border.join).toEqual(data.join);
  });

  test('Should return undefined when data is undefined', () => {
    // Act
    const border = createBorder(undefined);
    // Assert
    expect(border).toBeUndefined();
  });

  test('color property should be converted to hex when color is RGB', () => {
    // Arrange
    const color = { r: 255, g: 0, b: 0 };
    // Act
    const data : BorderData = { width: 1, color };
    // Assert
    const border = createBorder(data);
    expect(border.width).toEqual(data.width);
    expect(border.color?.color).toBe('#ff0000');
    expect(border.style).toEqual('solid');
    expect(border.cap).toEqual('butt');
    expect(border.join).toEqual('miter');
  });

});
