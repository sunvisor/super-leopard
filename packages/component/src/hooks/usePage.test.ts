/**
 * Test for UsePage
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import usePage from "./usePage";
import { act, renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { SetReportAtom } from '../atom/ReportAtom';
import { billTestData } from '@sunvisor/super-leopard-test-assets';


describe('Tests for usePage', () => {

  it('should return page', () => {
    // Arrange
    const reportData = billTestData;
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
    // Act
    const { result: pageResult } = renderHook(() => usePage());
    // Assert
    expect(pageResult.current.page.config).toEqual(reportData.page);
  });

});
