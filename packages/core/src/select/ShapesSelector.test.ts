/**
 * Test for ShapesSelector
 *
 * Created by sunvisor on 2024/01/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createShapesSelector } from "./ShapesSelector";
import { DPPX, Scale, Shapes, UnitType } from '../object';
import { LineSelectOptions } from './LineSelector';
import { createShapes } from '../creator';
import { createTestShapes } from '../__test_assets__';


const lineSelectOptions: LineSelectOptions = {
  minTolerance: 3,
}

describe('Tests for ShapesSelector', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const selector = createShapesSelector(scale, lineSelectOptions);

  describe('Tests for selectByPosition', () => {

    it('should retrieve the Shape located at the specified position', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      // Act
      const result = selector.selectByPosition({ x: 10 * DPPX, y: 10 * DPPX }, collection);
      // Assert
      expect(result!.count).toBe(1);
      expect(result!.get(0)).toBe(shapes[0]);
    });

    it('should retrieve the topmost Shape when overlapping Shapes are present', () => {
      // Arrange
      const collection = createShapes([
        { type: 'rect', x: 10, y: 10, width: 20, height: 20, border: { color: '#000000' } },
        { type: 'rect', x: 10, y: 10, width: 20, height: 20, border: { color: '#000000' } },
        { type: 'rect', x: 40, y: 40, width: 20, height: 20, border: { color: '#000000' } },
      ]);
      // Act
      const result = selector.selectByPosition({ x: 12 * DPPX, y: 12 * DPPX }, collection);
      // Assert
      expect(result!.count).toBe(1);
      expect(result!.get(0)).toBe(collection.get(1));
    });

  });

  describe('Tests for selectByBox', () => {

    it('should retrieve the Shapes located in the specified box', () => {
      // Arrange
      const shapes = createTestShapes();
      const collection = new Shapes(shapes);
      const pos = scale.toPixel({ x: 40, y: 2, width: 100, height: 30 });
      // Act
      const result = selector.selectByBox(pos, collection);
      // Assert
      expect(result!.count).toBe(2);
      expect(result!.get(0)).toBe(shapes[2]);
      expect(result!.get(1)).toBe(shapes[3]);
    });

  });

});
