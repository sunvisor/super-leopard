/**
 * Test for useReport
 *
 * Created by sunvisor on 2025/03/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { renderHook, act } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { SetReportAtom } from '../atom/ReportAtom';
import useReport from './useReport';
import { billTestData } from '@sunvisor/super-leopard-test-assets';
import { emptyReport } from '../component/emptyReport';

describe('Tests for useReport', () => {

  it('should return report', () => {
    // Arrange
    const reportData = billTestData;
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
    // Act
    const { result: reportResult } = renderHook(() => useReport());
    // Assert
    expect(reportResult.current.report).toEqual(reportData);
  });

  it('should update report when SetReportAtom is updated', () => {
    // Arrange
    const initialReportData = billTestData;
    const updatedReportData = emptyReport;
    // Set initial
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(initialReportData);
    });
    // Act
    const { result: reportResult } = renderHook(() => useReport());
    act(() => {
      result.current(updatedReportData);
    });
    // Assert update
    expect(reportResult.current.report).toEqual(updatedReportData);
  });
});
