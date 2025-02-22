/**
 * Test for CreateRect
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {CreateRect} from "./CreateRect";
import { createBorder, Rect, RectShape, Scale, UnitType } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '../../style';

describe('Tests for CreateRect#create', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;

  it('should return Rect object', () => {
    // Arrange
    const createRect = new CreateRect({ scale, styles });
    // Act
    const result = createRect.create({ x: 10, y: 10 }, { x: 210, y: 110 });
    // Assert
    expect(result.type).toBe(RectShape);
    const rect = result as Rect;
    expect(rect.x).toBe(scale.fromPixel(10));
    expect(rect.y).toBe(scale.fromPixel(10));
    expect(rect.width).toBe(scale.fromPixel(200));
    expect(rect.height).toBe(scale.fromPixel(100));
  });

  test('Result should have style', () => {
    // Arrange
    const createRect = new CreateRect({ scale, styles });
    // Act
    const result = createRect.create({ x: 10, y: 10 }, { x: 210, y: 110 });
    // Assert
    const rect = result as Rect;
    expect(rect.border?.width).toEqual(createBorder(styles.border!).width);
    expect(rect.fillColor).toBe(styles.fillColor);
  });

});
