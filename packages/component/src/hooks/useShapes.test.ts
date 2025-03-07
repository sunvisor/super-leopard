/**
 * Test for UseShapes
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import useShapes from "./useShapes";
import { act, renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { SetShapesAtom } from '../atom/ReportAtom';
import { createShapes } from '@sunvisor/super-leopard-core';
import { shapeTestData, shapeTestData2 } from '@sunvisor/super-leopard-test-assets';


describe('Tests for useShapes', () => {

  it('should return the shapes', () => {
    // Arrange
    const { result } = renderHook(() => useSetAtom(SetShapesAtom));
    const shapes = createShapes(shapeTestData);
    act(() => {
      result.current(shapes);
    })
    // Act
    const { result: shapesResult } = renderHook(() => useShapes());
    // Assert
    expect(shapesResult.current.shapes.equals(shapes)).toBe(true);
  });

  it('should update the shapes when SetShapesAtom is updated', () => {
    // Arrange
    const initialShapes = createShapes(shapeTestData);
    const updatedShapes = createShapes(shapeTestData2);
    const { result } = renderHook(() => useSetAtom(SetShapesAtom));
    act(() => {
      result.current(initialShapes);
    })
    // Act
    const { result: shapesResult } = renderHook(() => useShapes());
    act(() => {
      result.current(updatedShapes);
    })
    // Assert
    expect(shapesResult.current.shapes.equals(updatedShapes)).toBe(true);
  });

});
