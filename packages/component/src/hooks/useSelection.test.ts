/**
 * Test for UseSelection
 *
 * Created by sunvisor on 2025/03/28.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { renderHook, act } from '@testing-library/react';
import useSelection from './useSelection';
import { createShapes, Shapes } from '@sunvisor/super-leopard-core';
import { shapeTestData, shapeTestData2 } from '@sunvisor/super-leopard-test-assets';

describe('useSelection hook', () => {

  let shapes: Shapes;

  beforeAll(() => {
    shapes = createShapes(shapeTestData);
  });

  it('should return an empty selection by default', () => {
    const { result } = renderHook(() => useSelection());
    // Assert
    expect(result.current.selection).toEqual(new Shapes());
  });

  it('should update the selection when changeSelection is called with append=false', () => {
    // Arrange
    const { result } = renderHook(() => useSelection());
    act(() => {
      result.current.setSelection(shapes);
    });
    const newShapes = createShapes(shapeTestData2);
    // Act
    act(() => {
      result.current.changeSelection(newShapes, false);
    });
    // Assert
    expect(result.current.selection).toEqual(newShapes);
  });

  it('should append to the selection when changeSelection is called with append=true', () => {
    // Arrange
    const { result } = renderHook(() => useSelection());
    const initialShapes = shapes;
    const newShapes = createShapes([{
      ...shapeTestData2[0],
    }]);
    act(() => {
      result.current.setSelection(initialShapes);
    });
    // Act
    act(() => {
      result.current.changeSelection(newShapes, true);
    });
    expect(result.current.selection.equals(initialShapes.add(newShapes))).toBe(true);
  });

  it('should remove from the selection when changeSelection is called with append=true and shape is already in selection', () => {
    // Arrange
    const { result } = renderHook(() => useSelection());
    const initialShapes = shapes
    act(() => {
      result.current.setSelection(initialShapes);
    });
    // Act
    act(() => {
      result.current.changeSelection(new Shapes([initialShapes.get(0)]), true);
    });
    // Assert
    expect(result.current.selection.equals(shapes.remove(shapes.get(0)))).toBe(true);
  });

  it('should clear the selection when clearSelection is called', () => {
    // Arrange
    const { result } = renderHook(() => useSelection());
    act(() => {
      result.current.setSelection(shapes);
    });
    // Act
    act(() => {
      result.current.clearSelection();
    });
    // Assert
    expect(result.current.selection).toEqual(new Shapes());
  });
});
