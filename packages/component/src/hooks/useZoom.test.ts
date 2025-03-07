/**
 * Test for UseZoom
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import useZoom from "./useZoom";
import { act, renderHook } from '@testing-library/react';
import useScale from './useScale';
import { createStore } from 'jotai/index';
import { SetReportAtom } from '../atom/ReportAtom';
import { emptyReport } from '../component/emptyReport';

describe('Tests for useZoom', () => {

  it('should update the scale value when setZoom is called', () => {
    // Arrange
    const store = createStore();
    store.set(SetReportAtom, emptyReport)
    const updatedZoom = 2;
    // Act
    const { result } = renderHook(() => useZoom());
    act(() => {
      result.current.setZoom(updatedZoom);
    });
    // Assert
    const { result: scaleResult } = renderHook(() => useScale());
    expect(scaleResult.current.scale.zoom).toEqual(updatedZoom);
  });

});
