/**
 * Test for ApplyStyle
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Scale, UnitType, createBorder, createColor } from '@sunvisor/super-leopard-core';
import { SVG } from '@svgdotjs/svg.js';
import { applyBorder, applyFillColor } from "./applyStyle";

describe('Tests for applyStyle', () => {
  const scale = new Scale({ unit: UnitType.INCH });
  const svg = SVG().size(500, 500);

  describe('Tests for applyBorder', () => {

    test('Should return same element when border is not specified', () => {
      // Arrange
      const element = svg.rect(100, 100);
      const old = element.attr();
      // Act
      const result = applyBorder(scale, element);
      // Assert
      expect(result).toBe(element);
      expect(element.attr()).toEqual(old);
    });

    test('Should apply specified border to element', () => {
      // Arrange
      const element = svg.rect(100, 100);
      // Arrange
      const borderData = {
        color: '#000000', width: 2, cap: 'round', join: 'miter', style: 'solid'
      }
      const border = createBorder(borderData);
      // Act
      const result = applyBorder(scale, element, border);
      // Assert
      expect(result).toBe(element);
      expect(element.attr('stroke')).toEqual(borderData.color);
      expect(element.attr('stroke-linecap')).toEqual(borderData.cap);
      expect(element.attr('stroke-linejoin')).toEqual(borderData.join);
      expect(element.attr('stroke-width')).toEqual(scale.pointToPixel(borderData.width));
    });

    test('Should apply stroke-dasharray of "4" when border style is dashed', () => {
      // Arrange
      const element = svg.rect(100, 100);
      const borderData = {
        color: '#000000', width: 2, cap: 'round', join: 'miter', style: 'dashed'
      }
      const border = createBorder(borderData);
      // Act
      const result = applyBorder(scale, element, border);
      // Assert
      expect(result.attr('stroke-dasharray')).toBe(4);
    });

    test('Should apply stroke-dasharray of "1 2" when border style is dotted', () => {
      // Arrange
      const element = svg.rect(100, 100);
      const borderData = {
        color: '#000000', width: 2, cap: 'round', join: 'miter', style: 'dotted'
      }
      const border = createBorder(borderData);
      // Act
      const result = applyBorder(scale, element, border);
      // Assert
      expect(result.attr('stroke-dasharray')).toBe('1 2');
    });

    test('Should apply stroke-opacity when opacity is specified', () => {
      // Arrange
      const element = svg.rect(100, 100);
      const borderData = {
        color: '#000000', width: 2, cap: 'round', join: 'miter', style: 'dashed'
      }
      const border = createBorder(borderData);
      // Act
      const result = applyBorder(scale, element, border, 0.5);
      // Assert
      expect(result).toBe(element);
      expect(element.attr('stroke-opacity')).toEqual(0.5);
    });

  });

  describe('Tests for applyFillColor', () => {

    test('Should apply fillColor to element', () => {
      // Arrange
      const element = svg.rect(100, 100);
      const color = '#000000';
      const fillColor = createColor(color);
      // Act
      const result = applyFillColor(element, fillColor);
      // Assert
      expect(result).toBe(element);
      expect(result.attr('fill')).toEqual(color);
    });

    test('Should apply "none" to fill when fillColor is not specified', () => {
      // Arrange
      const element = svg.rect(100, 100);
      // Act
      const result = applyFillColor(element);
      // Assert
      expect(result.attr('fill')).toEqual('none');
    });

  });
});
