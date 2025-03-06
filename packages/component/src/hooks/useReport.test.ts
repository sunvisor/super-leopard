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

  it('Should return report', () => {
    const reportData = billTestData;
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });

    const { result: reportResult } = renderHook(() => useReport());
    expect(reportResult.current.report).toEqual(reportData);
  });

  it('Should update report when SetReportAtom is updated', () => {
    const initialReportData = billTestData;
    const updatedReportData = emptyReport;

    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(initialReportData);
    });

    const { result: reportResult } = renderHook(() => useReport());
    expect(reportResult.current.report).toEqual(initialReportData);

    act(() => {
      result.current(updatedReportData);
    });

    expect(reportResult.current.report).toEqual(updatedReportData);
  });
});
