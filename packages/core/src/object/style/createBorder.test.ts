/**
 * Test for CreateBorder
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { createBorder } from "./createBorder";
import { BorderData } from '../../data';

describe('Tests for createBorder', () => {

  it('should create Border', () => {
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

  it('should return undefined when data is undefined', () => {
    // Act
    const border = createBorder(undefined);
    // Assert
    expect(border).toBeUndefined();
  });

});
