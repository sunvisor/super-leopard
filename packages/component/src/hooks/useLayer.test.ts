/**
 * Test for UseLayer
 *
 * Created by sunvisor on 2025/03/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { act, renderHook } from '@testing-library/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { ReadReportAtom, SetReportAtom, } from '../atom/ReportAtom';
import useLayer from './useLayer';
import { billTestData } from '@sunvisor/super-leopard-test-assets';
import { layerTestData } from '../__test_assets__';


describe('Tests for useLayer', () => {

  beforeEach(() => {
    const reportData = {
      page: {
        unit: 'mm',
        size: 'A4',
      },
      layers: layerTestData,
    }
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
  })

  it('should return the initial active layer index', () => {
    // Act
    const { result } = renderHook(() => useLayer());
    // Assert
    expect(result.current.activeLayerIndex).toBeDefined();
  });

  it('should update the active layer index when SetActiveLayerIndexAtom is updated', () => {
    // Act
    const { result } = renderHook(() => useLayer());
    act(() => {
      result.current.setActiveLayerIndex(1);
    });
    // Assert
    const { result: layerResult } = renderHook(() => useLayer());
    expect(layerResult.current.activeLayerIndex).toBe(1);
  });

  it('should update the layers when UpdateLayersAtom is updated', () => {
    // Act
    const { result } = renderHook(() => useLayer());
    result.current.updateLayers(billTestData.layers, 0);
    // Assert
    const { result: layerResult } = renderHook(() => useLayer());
    expect(layerResult.current.activeLayerIndex).toBe(0);
  });

  it('should add a new layer when addLayer is called', () => {
    // Arrange
    const { result } = renderHook(() => useLayer());
    const count = layerTestData.length;
    // Act
    act(() => {
      result.current.addLayer();
    });
    // Assert
    const { result: reportResult } = renderHook(() => useAtomValue(ReadReportAtom));
    const layers = reportResult.current.layers;
    expect(layers.length).toBe(count + 1);
  });

  it('should remove a layer when removeLayer is called', () => {
    // Arrange
    const { result } = renderHook(() => useLayer());
    const count = layerTestData.length;
    // Act
    act(() => {
      result.current.removeLayer(0);
    });
    // Assert
    const { result: reportResult } = renderHook(() => useAtomValue(ReadReportAtom));
    const layers = reportResult.current.layers;
    expect(layers.length).toBe(count - 1);
  });

  it('should update a layer name when updateLayerName is called', () => {
    // Arrange
    const { result } = renderHook(() => useLayer());
    // Act
    act(() => {
      result.current.updateLayerName(0, 'new');
    });
    // Assert
    const { result: reportResult } = renderHook(() => useAtomValue(ReadReportAtom));
    const layers = reportResult.current.layers;
    expect(layers[0].name).toBe('new');
  });

});
