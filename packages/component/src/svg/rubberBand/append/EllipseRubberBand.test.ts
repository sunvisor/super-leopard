/**
 * Test for EllipseRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EllipseRubberBand } from "./EllipseRubberBand";
import { Scale, UnitType } from '@sunvisor/super-leopard-core';
import { Ellipse as SvgEllipse, SVG } from '@svgdotjs/svg.js';
import { defaultStyle } from '../../style';

describe('Tests for EllipseRubberBand', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;
  const svg = SVG();

  describe('Test for createElement', () => {

    test('Should return Svg ellipse element', () => {
      // Arrange
      const ellipseRubberBand = new EllipseRubberBand({ svg, scale, styles });
      // Act
      const result = ellipseRubberBand.createElement();
      // Assert
      expect(result).toBeInstanceOf(SvgEllipse);
      expect(svg.find('ellipse')).toHaveLength(1);
    });

  });

  describe('Test for adjustPosition', () => {

    test('Should return end position adjusted to match the width and height ', () => {
      // Arrange
      const ellipseRubberBand = new EllipseRubberBand({ svg, scale, styles });
      // Act
      const result = ellipseRubberBand.adjustPosition({ x: 10, y: 10 }, { x: 100, y: 200 });
      // Assert
      expect(result).toEqual({ x: 100, y: 100 });
    });

  });

  describe('Test for moveElement', () => {

    test('Should move and resize svg element', () => {
      // Arrange
      const ellipseRubberBand = new EllipseRubberBand({ svg, scale, styles });
      const element: SvgEllipse = {
        move: vi.fn(() => element),
        size: vi.fn()
      } as unknown as SvgEllipse;
      // Act
      ellipseRubberBand.moveElement({ x: 10, y: 10 }, { x: 110, y: 210 }, element as SvgEllipse);
      // Assert
      expect(element.move).toHaveBeenCalledWith(10, 10);
      expect(element.size).toHaveBeenCalledWith(100, 200);
    });

  });
});
