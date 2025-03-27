/**
 * Test for CircleDrawer
 *
 * Created by sunvisor on 2024/01/30.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { CircleDrawer } from "./CircleDrawer";
import { Scale, UnitType, createCircle, CircleData } from '@sunvisor/super-leopard-core';
import { afterEach } from 'vitest';
import { createTestSvgDrawer } from '@/__test_assets__';

describe('Tests for CircleDrawer#draw', () => {
  const svg = createTestSvgDrawer();
  const scale = new Scale({ unit: UnitType.INCH });
  const drawer = new CircleDrawer({ svg, scale });
  const r = 15;
  const data: CircleData = {
    type: 'circle',
    x: 10,
    y: 20,
    diameter: r * 2,
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should append a circle element with correct attributes to the SVG', () => {
    // Arrange
    svg.clear();
    const circle = createCircle(data);
    // Act
    drawer.draw(circle, {});
    // Assert
    expect(svg.find('circle')).toHaveLength(1);
    const element = svg.find('circle')[0];
    expect(element.attr('cx')).toEqual(scale.toPixel(10 + r));
    expect(element.attr('cy')).toEqual(scale.toPixel(20 + r));
    expect(element.attr('r')).toEqual(scale.toPixel(r));
  });

  test('Draw with fillColor', () => {
    // Arrange
    svg.clear();
    const circle = createCircle({
      ...data,
      fillColor: '#ff0000'
    })
    // Act
    drawer.draw(circle, {});
    // Assert
    const element = svg.find('circle')[0];
    expect(element.attr('fill')).toEqual('#ff0000');
  });

  test('Draw with border', () => {
    // Arrange
    svg.clear();
    const circle = createCircle({
      ...data,
      border: {
        color: '#ff0000',
        width: 1
      }
    })
    // Act
    drawer.draw(circle, {});
    // Assert
    const element = svg.find('circle')[0];
    expect(element.attr('stroke')).toEqual('#ff0000');
    expect(element.attr('stroke-width')).toEqual(scale.pointToPixel(1));
  });

  test('Draw with opacity', () => {
    // Arrange
    svg.clear();
    const circle = createCircle({
      ...data,
      fillColor: '#ff0000'
    })
    // Act
    drawer.draw(circle, { opacity: 0.5 });
    // Assert
    const element = svg.find('circle')[0];
    expect(element.attr('fill-opacity')).toEqual(0.5);
  });

});
