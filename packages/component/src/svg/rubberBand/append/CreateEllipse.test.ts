/**
 * Test for CreateEllipse
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CreateEllipse } from "./CreateEllipse";
import {
  Scale,
  UnitType,
  EllipseShape,
  Ellipse,
  createBorder,
} from '@sunvisor/super-leopard-core';
import { defaultStyle } from '../../style';

describe('Tests for CreateEllipse#create', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;

  test('Should return Ellipse object', () => {
    // Arrange
    const createEllipse = new CreateEllipse({ scale, styles });
    // Act
    const result = createEllipse.create({ x: 10, y: 10 }, { x: 210, y: 110 });
    // Assert
    expect(result.type).toBe(EllipseShape);
    const circle = result as Ellipse;
    expect(circle.width).toBe(scale.fromPixel(200));
    expect(circle.height).toBe(scale.fromPixel(100));
    expect(circle.x).toBe(scale.fromPixel(10));
    expect(circle.y).toBe(scale.fromPixel(10));
  });

  test('Result should have style', () => {
    // Arrange
    const createEllipse = new CreateEllipse({ scale, styles });
    // Act
    const result = createEllipse.create({ x: 10, y: 10 }, { x: 210, y: 110 });
    // Assert
    const ellipse = result as Ellipse;
    expect(ellipse.border?.width).toEqual(createBorder(styles.border!).width);
    expect(ellipse.fillColor).toBe(styles.fillColor);
  });

});
