/**
 * Test for TextRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { TextRubberBand } from "./TextRubberBand";
import { defaultSettings } from '../../../settings';
import { createTestSvgDrawer } from '../../../__test_assets__';
import { SvgShapeInterface } from '../../../svgDriver';

describe('Tests for TextRubberBand', () => {
  const svg = createTestSvgDrawer();
  const settings = defaultSettings;

  describe('Test for createElement', () => {

    it('should return Svg rect element', () => {
      // Arrange
      const textRubberBand = new TextRubberBand({ svg, settings });
      // Act
      const result = textRubberBand.createElement();
      // Assert
      expect(result.type).toBe('rect');
      expect(svg.find('rect')).toHaveLength(1);
      const element = svg.find('rect')[0];
      expect(element.attr('fill')).toBe('none');
    });

  });

  describe('Test for adjustPosition', () => {

    it('should return end position adjusted to match the width and height', () => {
      // Arrange
      const textRubberBand = new TextRubberBand({ svg, settings });
      // Act
      const result = textRubberBand.adjustPosition({ x: 10, y: 10 }, { x: 100, y: 200 });
      // Assert
      expect(result).toEqual({ x: 100, y: 100 });
    });

  });

  describe('Test for moveElement', () => {

    it('should move and resize svg element', () => {
      // Arrange
      const textRubberBand = new TextRubberBand({ svg, settings });
      const element: SvgShapeInterface = {
        move: vi.fn(() => element),
        size: vi.fn()
      } as unknown as SvgShapeInterface;
      // Act
      textRubberBand.moveElement({ x: 10, y: 10 }, { x: 110, y: 210 }, element);
      // Assert
      expect(element.move).toHaveBeenCalledWith(10, 10);
      expect(element.size).toHaveBeenCalledWith(100, 200);
    });

  });

});
