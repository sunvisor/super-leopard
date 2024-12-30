/**
 * Test for LineDrawer
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { LineDrawer } from "./LineDrawer";
import { SVG } from '@svgdotjs/svg.js';
import { createLine, LineData, Scale, UnitType } from '@sunvisor/super-leopard-core';

describe('Tests for LineDrawer#draw', () => {
  const svg = SVG().size(500, 500);
  const scale = new Scale({ unit: UnitType.INCH });
  const drawer = new LineDrawer({ svg, scale });
  const data: LineData = {
    type: 'line',
    x1: 10,
    y2: 20,
    x2: 30,
    y1: 40,
  }

  test('Should append a line element with correct attributes to the SVG', () => {
    // Arrange
    svg.clear();
    const line = createLine(data);
    // Act
    drawer.draw(line, {});
    // Assert
    expect(svg.find('line')).toHaveLength(1);
    const element = svg.find('line')[0];
    expect(element.attr('x1')).toEqual(scale.toPixel(10));
    expect(element.attr('y1')).toEqual(scale.toPixel(40));
    expect(element.attr('x2')).toEqual(scale.toPixel(30));
    expect(element.attr('y2')).toEqual(scale.toPixel(20));
  });

  test('Draw with border', () => {
    // Arrange
    svg.clear();
    const line = createLine({
      ...data,
      border: {
        width: 2,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(line, {});
    // Assert
    expect(svg.find('line')).toHaveLength(1);
    const element = svg.find('line')[0];
    expect(element.attr('stroke')).toEqual('#000000');
    expect(element.attr('stroke-width')).toEqual(scale.pointToPixel(2));
  });

  test('Draw with opacity', () => {
    // Arrange
    svg.clear();
    const line = createLine({
      ...data,
      border: {
        width: 2,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(line, { opacity: 0.5 });
    // Assert
    const element = svg.find('line')[0];
    expect(element.attr('stroke-opacity')).toEqual(0.5);
  });

});
