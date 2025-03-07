/**
 * Test for useReport
 *
 * Created by sunvisor on 2025/03/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { renderHook, act } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { SetReportAtom, SetShapesAtom } from '../atom/ReportAtom';
import useReport from './useReport';
import { billTestData, shapeTestData } from '@sunvisor/super-leopard-test-assets';
import { emptyReport } from '../component/emptyReport';
import { createShapes } from '@sunvisor/super-leopard-core';

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

  it('should return true when report has list', () => {
    // Arrange
    const reportData = billTestData;
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
    // Act
    const { result: reportResult } = renderHook(() => useReport());
    // Assert
    expect(reportResult.current.hasList()).toBe(true);
  });

  it('should return false when report does not have list', () => {
    // Arrange
    const reportData = emptyReport;
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
    // Act
    const { result: reportResult } = renderHook(() => useReport());
    // Assert
    expect(reportResult.current.hasList()).toBe(false);
  });

  it('should apply shapes to report', () => {
    // Arrange
    const reportData = billTestData;
    // Set report
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
    // Set shapes
    const shapes = createShapes(shapeTestData);
    const { result: shapesResult } = renderHook(() => useSetAtom(SetShapesAtom));
    act(() => {
      shapesResult.current(shapes);
    })
    // Act
    const { result: reportResult } = renderHook(() => useReport());
    act(() => {
      reportResult.current.applyShapes();
    });
    // Assert
    expect(reportResult.current.report.layers[0].shapes).toEqual(shapeTestData);
  })

});
