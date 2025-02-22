/**
 * Test for CreateField
 *
 * Created by sunvisor on 2024/01/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {CreateField} from "./CreateField";
import {Scale,  UnitType, Field, TextShape, Text } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '../../style';

describe('Tests for CreateField#create', () => {
  const scale = new Scale({unit: UnitType.INCH});
  const styles = defaultStyle;

  it('should return Field object', () => {
    // Arrange
    const createField = new CreateField({ scale, styles });
    // Act
    const result = createField.create({ x: 10, y: 10 }, { x: 100, y: 110 });
    // Assert
    expect(result).toBeInstanceOf(Field);
    expect(result.type).toBe('field');
    const field = result as Field;
    expect(field.shape.type).toBe(TextShape);
    const text = field.shape as Text;
    expect(text.x).toBe(scale.fromPixel(10));
    expect(text.y).toBe(scale.fromPixel(10));
    expect(text.width).toBe(scale.fromPixel(90));
    expect(text.height).toBe(scale.fromPixel(100));
    expect(text.text).toBe('Text');
  });

  test('Result should have font', () => {
    // Arrange
    const createField = new CreateField({ scale, styles });
    // Act
    const result = createField.create({ x: 10, y: 10 }, { x: 100, y: 110 });
    // Assert
    const field = result as Field;
    const text = field.shape as Text;
    expect(text.font.family).toEqual(styles.font.family);
  });

});
