/**
 * Test for UseScale
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { act, renderHook } from '@testing-library/react';
import { SetReportAtom } from '../atom/ReportAtom';
import useScale from './useScale';
import { beforeEach } from 'vitest';
import { createStore } from 'jotai/index';
import { emptyReport } from '../component/emptyReport';

describe('Tests for useScale', () => {

  beforeEach(() => {
    const store = createStore();
    store.set(SetReportAtom, emptyReport)
  })

  it('should return the scale value', () => {
    // Act
    const { result } = renderHook(() => useScale());
    // Assert
    expect(result.current.scale).toBeDefined();
    expect(result.current.scale.unit).toBe('mm');
  });

  it('should update the scale value when SetZoomAtom is updated', () => {
    // Arrange
    const updatedZoom = 2;
    // Act
    const { result } = renderHook(() => useScale());
    act(() => {
      result.current.setZoom(updatedZoom);
    });
    // Assert
    const { result: scaleResult } = renderHook(() => useScale());
    expect(scaleResult.current.scale.zoom).toEqual(updatedZoom);
  });

});
