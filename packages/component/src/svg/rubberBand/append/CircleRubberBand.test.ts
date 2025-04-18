/**
 * Test for CircleRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CircleRubberBand } from "./CircleRubberBand";
import { Scale, UnitType } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '@/svg/style';
import { createTestSvgDrawer } from '@/__test_assets__';
import { SvgCircleInterface } from '@/svgDriver';

describe('Tests for CircleRubberBand', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;
  const svg = createTestSvgDrawer();

  describe('Test for createElement', () => {

    it('should return Svg circle element', () => {
      // Arrange
      const circleRubberBand = new CircleRubberBand({ svg, scale, styles });
      // Act
      const result = circleRubberBand.createElement();
      // Assert
      expect(result.type).toBe('circle');
      expect(svg.find('circle')).toHaveLength(1);
    });

  });

  describe('Test for adjustPosition', () => {

    it('should return original position when CircleRubberBand', () => {
      // Arrange
      const circleRubberBand = new CircleRubberBand({ svg, scale, styles });
      // Act
      const result = circleRubberBand.adjustPosition({ x: 0, y: 0 }, { x: 10, y: 10 });
      // Assert
      expect(result).toEqual({ x: 10, y: 10 });
    });

  });

  describe('Test for moveElement', () => {

    it('should move and resize svg element', () => {
      // Arrange
      const circleRubberBand = new CircleRubberBand({ svg, scale, styles });
      const element = {
        move: vi.fn(() => element),
        size: vi.fn()
      }
      // Act
      circleRubberBand.moveElement({ x: 10, y: 10 }, { x: 110, y: 110 }, element as unknown as SvgCircleInterface);
      // Assert
      expect(element.move).toHaveBeenCalledWith(10, 10);
      expect(element.size).toHaveBeenCalledWith(100);
    });
  });
});
