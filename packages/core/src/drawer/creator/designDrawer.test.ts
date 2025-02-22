/**
 * Test for DesignDrawer
 *
 * Created by sunvisor on 2025/01/30.
 * Copyright (C) Sunvisor Lab. 2025.
 */

import { mockShapeDrawers } from '../../__test_assets__/drawerTest';
import { createShapes } from '../../creator';
import { ShapeData } from '../../data';
import { createScale, Rect, RectShape } from '../../object';
import { afterEach, Mock } from 'vitest';
import { createDesignDrawer } from './createDesignDrawer';
import { MeasurementInterface } from '../types';


describe('Tests for designDrawer', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  const measurement: MeasurementInterface = {
    measureHeight: vi.fn(),
    measureWidth: vi.fn(),
  }

  const scale = createScale({
    unit: 'mm',
  });

  const drawer = createDesignDrawer({
    staticShapeDrawers: mockShapeDrawers,
    fieldBorderColor: '#3be5e5',
    textBorderColor: '#d3d3d3',
    measurement,
    scale
  });

  it('should draw text with bounding box when shape type is text', () => {
    // Arrange
    const shapesData: ShapeData[] = [{
      type: 'text',
      text: 'Hello, World!',
      x: 0,
      y: 0,
      width: 100,
      height: 6,
      font: {
        family: 'Helvetica',
        size: 12,
      }
    }];
    const shapes = createShapes(shapesData);
    // Act
    drawer.draw(shapes);
    // Assert
    const rectDrawer = mockShapeDrawers[RectShape];
    expect(rectDrawer.draw).toHaveBeenCalledTimes(1);
    const result = (rectDrawer.draw as Mock ).mock.calls;
    const rect = result[0][0] as Rect;
    expect(rect.bbox).toEqual({ x: 0, y: 0, width: 100, height: 6 });

  });

  it('should draw field with bounding box when shape type is field', () => {
    // Arrange
    const shapesData: ShapeData[] = [{
      type: 'field',
      name: 'myField',
      shape: {
        type: 'text',
        x: 1,
        y: 2,
        width: 100,
        height: 6,
        font: {
          family: 'Helvetica',
          size: 12,
        }
      }
    }];
    const shapes = createShapes(shapesData);
    // Act
    drawer.draw(shapes);
    // Assert
    const rectDrawer = mockShapeDrawers[RectShape];
    expect(rectDrawer.draw).toHaveBeenCalledTimes(2);
    const result = (rectDrawer.draw as Mock ).mock.calls;
    const rect = result[0][0] as Rect;
    expect(rect.bbox).toEqual({ x: 1, y: 2, width: 100, height: 6 });
  });

  it('should draw group groupCount times', () => {
    // Arrange
    const shapesData: ShapeData[] = [{
      type: 'group',
      repeatCount: 3,
      shapes: [{
        type: 'text',
        x: 1,
        y: 2,
        width: 100,
        height: 6,
        font: {
          family: 'Helvetica',
          size: 12,
        }
      }]
    }];
    const shapes = createShapes(shapesData);
    // Act
    drawer.draw(shapes);
    // Assert
    const rectDrawer = mockShapeDrawers[RectShape];
    expect(rectDrawer.draw).toHaveBeenCalledTimes(3);
  });

  it('should draw shapes in list list count  times', () => {
    // Arrange
    const shapesData: ShapeData[] = [{
      type: 'list',
      rows: 3,
      columns: 2,
      shapes: [{
        type: 'field',
        name: 'myField',
        shape: {
          type: 'text',
          x: 1,
          y: 2,
          width: 100,
          height: 6,
          font: {
            family: 'Helvetica',
            size: 12,
          }
        }
      }]
    }];
    const shapes = createShapes(shapesData);
    // Act
    drawer.draw(shapes);
    // Assert
    const rectDrawer = mockShapeDrawers[RectShape];
    expect(rectDrawer.draw).toHaveBeenCalledTimes(12); // text and rect
  });

});
