/**
 * Test for RectRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { RectRubberBand } from "./RectRubberBand";
import { Scale, UnitType } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '../../style';
import { createTestSvgDrawer } from '../../../__test_assets__';
import { SvgRectInterface } from '../../../svgDriver';


describe('Tests for RectRubberBand', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;
  const svg = createTestSvgDrawer();

  describe('Test for createElement', () => {

    it('should return Svg rect element', () => {
      // Arrange
      const rectRubberBand = new RectRubberBand({ svg, scale, styles });
      // Act
      const result = rectRubberBand.createElement();
      // Assert
      expect(result.type).toBe('rect');
      expect(svg.find('rect')).toHaveLength(1);
    });

  });

  describe('Test for adjustPosition', () => {

    it('should return end position adjusted to match the width and height', () => {
      // Arrange
      const rectRubberBand = new RectRubberBand({ svg, scale, styles });
      // Act
      const result = rectRubberBand.adjustPosition({ x: 10, y: 10 }, { x: 100, y: 200 });
      // Assert
      expect(result).toEqual({ x: 100, y: 100 });
    });

  });

  describe('Test for moveElement', () => {

    it('should move and resize svg element', () => {
      // Arrange
      const rectRubberBand = new RectRubberBand({ svg, scale, styles });
      const e: unknown = {
        move: vi.fn(() => element),
        size: vi.fn()
      }
      const element = e as unknown as SvgRectInterface;
      // Act
      rectRubberBand.moveElement({ x: 10, y: 10 }, { x: 110, y: 210 }, element);
      // Assert
      expect(element.move).toHaveBeenCalledWith(10, 10);
      expect(element.size).toHaveBeenCalledWith(100, 200);
    });

  });

});
