/**
 * Test for RectDrawer
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {RectDrawer} from "./RectDrawer";
import { createRect, RectData, Scale, UnitType } from '@sunvisor/super-leopard-core';
import { createTestSvgDrawer } from '@/__test_assets__';

describe('Tests for RectDrawer#draw', () => {
  const svg = createTestSvgDrawer();
  const scale = new Scale({ unit: UnitType.INCH});
  const drawer = new RectDrawer({ svg, scale });
  const data: RectData = {
    type: 'rect',
    x: 10,
    y: 20,
    width: 30,
    height: 40,
  }

  it('should append a rect element with correct attributes to the SVG', () => {
    // Arrange
    svg.clear();
    const rect = createRect(data);
    // Act
    drawer.draw(rect, {});
    // Assert
    expect(svg.find('rect').length).toBe(1);
    const element = svg.find('rect')[0];
    expect(element.attr('x')).toBe(scale.toPixel(10));
    expect(element.attr('y')).toBe(scale.toPixel(20));
    expect(element.attr('width')).toBe(scale.toPixel(30));
    expect(element.attr('height')).toBe(scale.toPixel(40));
  });

  test('Draw with border', () => {
    // Arrange
    svg.clear();
    const rect = createRect({
      ...data,
      border: {
        width: 2,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(rect, {  });
    // Assert
    expect(svg.find('rect').length).toBe(1);
    const element = svg.find('rect')[0];
    expect(element.attr('stroke')).toEqual('#000000');
    expect(element.attr('stroke-width')).toEqual(scale.pointToPixel(2));
  });

  test('Draw with fillColor', () => {
    // Arrange
    svg.clear();
    const rect = createRect({
      ...data,
      fillColor: '#000000',
    });
    // Act
    drawer.draw(rect, {  });
    // Assert
    expect(svg.find('rect').length).toBe(1);
    const element = svg.find('rect')[0];
    expect(element.attr('fill')).toEqual('#000000');
  });

  test('Draw with opacity', () => {
    // Arrange
    svg.clear();
    const rect = createRect({
      ...data,
      border: {
        width: 2,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(rect, { opacity: 0.5 });
    // Assert
    const element = svg.find('rect')[0];
    expect(element.attr('stroke-opacity')).toEqual(0.5);
  });

});
