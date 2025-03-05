/**
 * Test for UseReportStates
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { renderHook, act } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { SetReportAtom, SetShapesAtom } from '../../../atom/ReportAtom';
import { ClearDirtyAtom } from '../../../atom/HistoryAtom';
import useReportStates from './useReportStates';
import { billTestData, shapeTestData } from '@sunvisor/super-leopard-test-assets';
import { createShapes } from '@sunvisor/super-leopard-core';

describe('Tests for useReportStates', () => {
  const reportData = billTestData;

  beforeEach(() => {
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
    renderHook(() => useSetAtom(ClearDirtyAtom));
  });

  it('Should returns report and dirty state', () => {
    const { result } = renderHook(() => useReportStates());
    expect(result.current.report).toEqual(reportData);
    expect(result.current.dirty).toBe(false);
  });

  test('Should dirty when shapes changes', () => {
    const { result } = renderHook(() => useSetAtom(SetShapesAtom));
    const newShapes = createShapes(shapeTestData);
    act(() => {
      result.current(newShapes);
    });

    const { result: reportStatesResult } = renderHook(() => useReportStates());
    const newReport = reportStatesResult.current.report;
    expect(newReport.layers[0].shapes).toEqual(shapeTestData); // should update shapes
    expect(reportStatesResult.current.dirty).toEqual(true);    // should be dirty
  });

});
