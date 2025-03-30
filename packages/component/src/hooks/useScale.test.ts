/**
 * Test for UseScale
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { renderHook } from '@testing-library/react';
import { SetReportAtom } from '@/atom/ReportAtom';
import useScale from './useScale';
import { createStore } from 'jotai';
import { emptyReport } from '@/component/emptyReport';

describe('Tests for useScale', () => {

  it('should return the scale value', () => {
    // Arrange
    const store = createStore();
    store.set(SetReportAtom, emptyReport)
    // Act
    const { result } = renderHook(() => useScale());
    // Assert
    expect(result.current.scale).toBeDefined();
    expect(result.current.scale.unit).toBe('mm');
  });

});
