/**
 * Test for useShapes
 *
 * Created by sunvisor on 2024/02/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import useShapes from "./useShapes";
import { createRect, PaperSize, ReportData, Shape, Shapes, UnitType } from '@sunvisor/super-leopard-core';
import { act, renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai/index';
import { SetActiveLayerIndexAtom, SetReportAtom } from '../../../atom/ReportAtom';
import { layerTestData } from '../../../__test_assets__';


describe('Tests for useShapes', () => {

  const reportData: ReportData = {
    page: {
      size: PaperSize.A4,
      orientation: 'portrait',
      margin: { top: 20, left: 20 },
      unit: UnitType.MILLIMETER,
    },
    layers: layerTestData,
  }

  const setReport = () => {
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    result.current(reportData);
  }

  const setActiveLayer = (layer: number) => {
    const { result } = renderHook(() => useSetAtom(SetActiveLayerIndexAtom));
    result.current(layer);
  }

  it('should add a new shape when addShape is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const newShape = createRect({
      type: 'rect', x: 0, y: 0, width: 30, height: 30
    });
    const { result } = renderHook(() => useShapes());
    const count = result.current.shapes.count;
    // Act
    act(() => {
      result.current.addShape(newShape);
    });
    // Assert
    const shapes = result.current.shapes;
    expect(shapes.count).toBe(count + 1);
    expect(shapes.get(shapes.count - 1).type).toEqual(newShape.type);
  });

  it('should remove the shape when removeShapes is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useShapes());
    const original = result.current.shapes;
    const count = original.count;
    // Act
    act(() => {
      result.current.removeShapes(new Shapes([original.get(0)]));
    });
    // Assert
    const shapes = result.current.shapes;
    expect(shapes.count).toBe(count - 1);
  });

  it('should update the shape when updateShapes is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useShapes());
    const original = result.current.shapes;
    const count = original.count;
    // Act
    const shape = original.get(0);
    const newShape = shape.moveTo({ x: 0, y: 0 }) as Shape;
    act(() => {
      result.current.updateShapes(
        new Shapes([shape]),
        new Shapes([newShape]),
      );
    });
    // Assert
    const shapes = result.current.shapes;
    expect(shapes.count).toBe(count);
    expect(shapes.get(0).bbox.x).toEqual(0);
    expect(shapes.get(0).bbox.y).toEqual(0);
  });

});
