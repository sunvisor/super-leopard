/**
 * Test for CreateCircle
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CreateCircle } from "./CreateCircle";
import { Scale, UnitType, CircleShape, Circle, createBorder } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '@/svg/style';

describe('Tests for CreateCircle#create', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;

    it('should return Circle object', () => {
      // Arrange
      const createCircle = new CreateCircle({ scale, styles });
      // Act
      const result = createCircle.create({ x: 10, y: 10 }, { x: 110, y: 110 });
      // Assert
      expect(result.type).toBe(CircleShape);
      const circle = result as Circle;
      expect(circle.diameter).toBe(scale.fromPixel(100));
      expect(circle.x).toBe(scale.fromPixel(10));
      expect(circle.y).toBe(scale.fromPixel(10));
    });

    test('Result should have style', () => {
      // Arrange
      const createCircle = new CreateCircle({ scale, styles });
      // Act
      const result = createCircle.create({ x: 10, y: 10 }, { x: 110, y: 110 });
      // Assert
      expect(result.type).toBe(CircleShape);
      const circle = result as Circle;
      expect(circle.border?.width).toEqual(createBorder(styles.border!).width);
      expect(circle.fillColor).toBe(styles.fillColor);
    });

});
