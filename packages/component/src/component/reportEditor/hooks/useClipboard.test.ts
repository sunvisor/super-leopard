/**
 * Test for useClipboard
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import useClipboard from "./useClipboard";
import { createShapes } from '@sunvisor/super-leopard-core';
import { act, renderHook } from '@testing-library/react';
import { testAssets } from '../../../__test_assets__';

const { shapeTestData } = testAssets;

describe('Test for useClipboard', () => {

  test('Data set with setToClipboard can be retrieved with getFromClipboard', () => {
    // Arrange
    const shapes = createShapes(shapeTestData);
    const { result } = renderHook(() => useClipboard());
    // Act
    act(() => {
      result.current.setToClipboard(shapes);
    });
    // Assert
    const resultShapes = result.current.getFromClipboard();
    expect(resultShapes).not.toBe(shapes);
    expect(resultShapes.count).toBe(shapes.count);
  });

});
