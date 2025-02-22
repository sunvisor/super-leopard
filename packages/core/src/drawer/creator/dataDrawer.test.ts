/**
 * Test for DataDrawer
 *
 * Created by sunvisor on 2025/01/31.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { afterEach, Mock } from 'vitest';
import { createDataDrawer } from './createDataDrawer';
import { mockShapeDrawers } from '../../__test_assets__/drawerTest';
import { ShapeData } from '../../data';
import { createShapes } from '../../creator';
import { createScale, TextShape } from '../../object';
import { MeasurementInterface } from '../types';


describe('Tests for dataDrawer', () => {

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

  const drawer = createDataDrawer({
    staticShapeDrawers: mockShapeDrawers,
    measurement,
    scale,
  });

  it('should draw text when shape type is text', () => {
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
    const textDrawer = mockShapeDrawers[TextShape];
    expect(textDrawer.draw).toHaveBeenCalledTimes(1);
  });

  it('should draw field with given values when shape type is field', () => {
    // Arrange
    const shapesData: ShapeData[] = [{
      type: 'field',
      name: 'myField',
      shape: {
        type: 'text',
        x: 0,
        y: 0,
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
    drawer.draw(shapes, { values: { myField: 'Hello, World!' } });
    // Assert
    const textDrawer = mockShapeDrawers[TextShape];
    expect(textDrawer.draw).toHaveBeenCalledTimes(1);
    const text = (textDrawer.draw as Mock).mock.calls[0][0];
    expect(text.text).toBe('Hello, World!');
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
    drawer.draw(shapes, { values: { myField: 'Hello, World!' } });
    // Assert
    const textDrawer = mockShapeDrawers[TextShape];
    expect(textDrawer.draw).toHaveBeenCalledTimes(3);
  });

  it('should draw list number of listRecords', () => {
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
    const listRecords = Array.from(
      { length: 6 }, (_, i) => ({ myField: `value${i + 1}` })
    );
    // Act
    drawer.draw(shapes, { listRecords });
    // Assert
    const textDrawer = mockShapeDrawers[TextShape];
    expect(textDrawer.draw).toHaveBeenCalledTimes(6);
    const first = (textDrawer.draw as Mock).mock.calls[0][0];
    expect(first.text).toBe('value1');
    const last = (textDrawer.draw as Mock).mock.calls[5][0];
    expect(last.text).toBe('value6');
  });

});
