/**
 * Test for LineRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { LineRubberBand } from "./LineRubberBand";
import { Scale, UnitType } from '@sunvisor/super-leopard-core';
import { defaultStyle } from '../../style';
import { createTestSvgDrawer } from '../../../__test_assets__';
import { SvgLineInterface } from '../../../svgDriver';

describe('Tests for LineRubberBand', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const styles = defaultStyle;
  const svg = createTestSvgDrawer();

  describe('Test for createElement', () => {

    it('should return Svg line element', () => {
      // Arrange
      const lineRubberBand = new LineRubberBand({ svg, scale, styles });
      // Act
      const result = lineRubberBand.createElement();
      // Assert
      expect(result.type).toBe('line');
      expect(svg.find('line')).toHaveLength(1);
    });

  });

  describe('Tests for adjustPosition', () => {

    it('should return end position adjusted vertically when end.x is less than end.y', () => {
      // Arrange
      const lineRubberBand = new LineRubberBand({ svg, scale, styles });
      // Act
      const result = lineRubberBand.adjustPosition({ x: 10, y: 10 }, { x: 100, y: 200 });
      // Assert
      expect(result).toEqual({ x: 10, y: 200 });
    });

    it('should return end position adjusted horizontally when end.x is greater than end.y', () => {
      // Arrange
      const lineRubberBand = new LineRubberBand({ svg, scale, styles });
      // Act
      const result = lineRubberBand.adjustPosition({ x: 10, y: 10 }, { x: 200, y: 100 });
      // Assert
      expect(result).toEqual({ x: 200, y: 10 });
    });

  });

  describe('Test for moveElement', () => {

    it('should plot svg element', () => {
      // Arrange
      const lineRubberBand = new LineRubberBand({ svg, scale, styles });
      const element: SvgLineInterface = {
        plot: vi.fn(() => element),
      } as unknown as SvgLineInterface;
      // Act
      lineRubberBand.moveElement({ x: 10, y: 20 }, { x: 110, y: 210 }, element);
      // Assert
      expect(element.plot).toHaveBeenCalledWith(10, 20, 110, 210);
    });

  });

});
