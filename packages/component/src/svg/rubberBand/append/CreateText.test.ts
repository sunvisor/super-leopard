/**
 * Test for CreateText
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */

import { Scale, TextShape, UnitType, Text } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '../../style';
import { CreateText } from './CreateText';

describe('Tests for CreateText#create', () => {
  const scale = new Scale({unit: UnitType.INCH});
  const styles = defaultStyle;

  it('should return Text object', () => {
    // Arrange
    const createText = new CreateText({ scale, styles });
    // Act
    const result = createText.create({ x: 10, y: 10 }, { x: 100, y: 15 });
    // Assert
    expect(result).toBeInstanceOf(Text);
    expect(result.type).toBe(TextShape);
    const text = result as Text;
    expect(text.x).toBe(scale.fromPixel(10));
    expect(text.y).toBe(scale.fromPixel(10));
    expect(text.width).toBe(scale.fromPixel(90));
    expect(text.height).toBe(scale.fromPixel(5));
    expect(text.text).toBe('Text');
  });

  test('Result should have font', () => {
    // Arrange
    const createText = new CreateText({ scale, styles });
    // Act
    const result = createText.create({ x: 10, y: 10 }, { x: 100, y: 15 });
    // Assert
    const text = result as Text;
    expect(text.font.family).toEqual(styles.font.family);
  });

});
