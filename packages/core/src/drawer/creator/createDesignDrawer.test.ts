/**
 * Test for CreateShapesDrawer
 *
 * Created by sunvisor on 2025/01/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { mockShapeDrawers } from '../../__test_assets__/drawerTest';
import { createDesignDrawer } from './createDesignDrawer';
import { createScale } from '../../creator';
import { MeasurementInterface } from '../types';

describe('Tests for createDesignDrawer', () => {

  const measurement: MeasurementInterface = {
    measureHeight: vi.fn(),
    measureWidth: vi.fn(),
  }

  const scale = createScale({
    unit: 'mm',
  });

  test('Should create shapes design drawer', () => {
    // Arrange
    // Act
    const drawer = createDesignDrawer({
      staticShapeDrawers: mockShapeDrawers,
      measurement,
      scale,
      fieldBorderColor: '#3be5e5',
      textBorderColor: '#d3d3d3',
    });
    // Assert
    expect(drawer).toBeDefined();
  });

});
