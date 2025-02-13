/**
 * Test for EllipseDrawer
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {EllipseDrawer} from "./EllipseDrawer";
import { createEllipse, EllipseData, Scale, UnitType } from '@sunvisor/super-leopard-core';
import { createTestSvgDrawer } from '../../__test_assets__';

describe('Tests for EllipseDrawer#draw', () => {
  const svg = createTestSvgDrawer();
  const scale = new Scale({ unit: UnitType.INCH});
  const drawer = new EllipseDrawer({ svg, scale });
  const rx = 15;
  const ry = 10;
  const data: EllipseData = {
    type: 'ellipse',
    x: 10,
    y: 20,
    width: rx * 2,
    height: ry * 2,
  }

  test('Should append a ellipse element with correct attributes to the SVG', () => {
    // Arrange
    svg.clear();
    const ellipse = createEllipse(data);
    // Act
    drawer.draw(ellipse, {});
    // Assert
    expect(svg.find('ellipse')).toHaveLength(1);
    const element = svg.find('ellipse')[0];
    expect(element.attr('cx')).toEqual(scale.toPixel(10 + rx));
    expect(element.attr('cy')).toEqual(scale.toPixel(20 + ry));
    expect(element.attr('rx')).toEqual(scale.toPixel(rx));
    expect(element.attr('ry')).toEqual(scale.toPixel(ry));
  });

  test('Draw with fillColor', () => {
    // Arrange
    svg.clear();
    const ellipse = createEllipse({
      ...data,
      fillColor: '#ff0000',
    });
    // Act
    drawer.draw(ellipse, {  });
    // Assert
    expect(svg.find('ellipse')).toHaveLength(1);
    const element = svg.find('ellipse')[0];
    expect(element.attr('fill')).toEqual('#ff0000');
  });

  test('Draw with border', () => {
    // Arrange
    svg.clear();
    const ellipse = createEllipse({
      ...data,
      border: {
        width: 2,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(ellipse, {  });
    // Assert
    expect(svg.find('ellipse')).toHaveLength(1);
    const element = svg.find('ellipse')[0];
    expect(element.attr('stroke')).toEqual('#000000');
    expect(element.attr('stroke-width')).toEqual(scale.pointToPixel(2));
  });

  test('Draw with opacity', () => {
    // Arrange
    svg.clear();
    const ellipse = createEllipse({
      ...data,
      border: {
        width: 2,
        color: '#000000',
      }
    });
    // Act
    drawer.draw(ellipse, { opacity: 0.5 });
    // Assert
    expect(svg.find('ellipse')).toHaveLength(1);
    const element = svg.find('ellipse')[0];
    expect(element.attr('stroke-opacity')).toEqual(0.5);
  });

});
