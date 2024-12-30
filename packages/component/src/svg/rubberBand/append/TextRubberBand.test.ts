/**
 * Test for TextRubberBand
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { TextRubberBand } from "./TextRubberBand";
import { Rect as SvgRect, Shape, SVG } from '@svgdotjs/svg.js';
import { defaultSettings } from '../../setting';

describe('Tests for TextRubberBand', () => {
  const svg = SVG();
  const settings = defaultSettings;

  describe('Test for createElement', () => {

    test('Should return Svg rect element', () => {
      // Arrange
      const textRubberBand = new TextRubberBand({ svg, settings });
      // Act
      const result = textRubberBand.createElement();
      // Assert
      expect(result).toBeInstanceOf(SvgRect)
      expect(svg.find('rect')).toHaveLength(1);
      const element = svg.find('rect')[0];
      expect(element.attr('fill')).toBe('none');
    });

  });

  describe('Test for adjustPosition', () => {

    test('Should return end position adjusted to match the width and height', () => {
      // Arrange
      const textRubberBand = new TextRubberBand({ svg, settings });
      // Act
      const result = textRubberBand.adjustPosition({ x: 10, y: 10 }, { x: 100, y: 200 });
      // Assert
      expect(result).toEqual({ x: 100, y: 100 });
    });

  });

  describe('Test for moveElement', () => {

    test('Should move and resize svg element', () => {
      // Arrange
      const textRubberBand = new TextRubberBand({ svg, settings });
      const element: Shape = {
        move: vi.fn(() => element),
        size: vi.fn()
      } as unknown as Shape;
      // Act
      textRubberBand.moveElement({ x: 10, y: 10 }, { x: 110, y: 210 }, element);
      // Assert
      expect(element.move).toHaveBeenCalledWith(10, 10);
      expect(element.size).toHaveBeenCalledWith(100, 200);
    });

  });

});
