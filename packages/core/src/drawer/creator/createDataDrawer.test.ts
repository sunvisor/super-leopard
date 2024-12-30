/**
 * Test for CreateShapesDrawer
 *
 * Created by sunvisor on 2025/01/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createDataDrawer, } from "./createDataDrawer";
import { mockShapeDrawers } from '../../__test_assets__/drawerTest';
import { createScale } from '../../creator';
import { MeasurementInterface } from '../types';


describe('Tests for createDataDrawer', () => {

  const measurement: MeasurementInterface = {
    measureHeight: vi.fn(),
    measureWidth: vi.fn(),
  }

  const scale = createScale({
    unit: 'mm',
  });

  test('Should create shapes data drawer', () => {
    // Arrange
    // Act
    const drawer = createDataDrawer({
      staticShapeDrawers: mockShapeDrawers,
      measurement ,
      scale
    });
    // Assert
    expect(drawer).toBeDefined();
  });

});
