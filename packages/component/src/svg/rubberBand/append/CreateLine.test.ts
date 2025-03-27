/**
 * Test for CreateLine
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CreateLine } from "./CreateLine";
import { Scale, UnitType, Line, createBorder } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '@/svg/style';

describe('Tests for CreateLine#create', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;

  it('should return Line object', () => {
    // Arrange
    const createLine = new CreateLine({ scale, styles });
    // Act
    const result = createLine.create({ x: 10, y: 10 }, { x: 210, y: 110 });
    // Assert
    expect(result.type).toBe('line');
    const line = result as Line;
    expect(line.x1).toBe(scale.fromPixel(10));
    expect(line.y1).toBe(scale.fromPixel(10));
    expect(line.x2).toBe(scale.fromPixel(210));
    expect(line.y2).toBe(scale.fromPixel(110));
  });

  test('Result should have style', () => {
    // Arrange
    const createLine = new CreateLine({ scale, styles });
    // Act
    const result = createLine.create({ x: 10, y: 10 }, { x: 210, y: 110 });
    // Assert
    expect(result.type).toBe('line');
    const line = result as Line;
    expect(line.border.width).toEqual(createBorder(styles.border!).width);
  });

});
