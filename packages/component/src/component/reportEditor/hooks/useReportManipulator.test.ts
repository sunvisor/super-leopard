/**
 * Test for useReportManipulator
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import useReportManipulator from "./useReportManipulator";
import { act, renderHook } from '@testing-library/react';
import { ReadShapesAtom, SetActiveLayerIndexAtom, SetReportAtom } from '../../../atom/ReportAtom';
import { createRect, DPPX, PaperSize, ReportData, UnitType } from '@sunvisor/super-leopard-core';
import { useAtomValue, useSetAtom } from 'jotai';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import { layerTestData } from '../../../__test_assets__';


describe('Tests for useReportManipulator', () => {

  const X = DPPX / 25.4;
  const reportData: ReportData = {
    page: {
      size: PaperSize.A4,
      orientation: 'portrait',
      unit: UnitType.MILLIMETER,
    },
    layers: layerTestData,
  }

  const setReport = () => {
    const { result } = renderHook(() => useSetAtom(SetReportAtom));
    act(() => {
      result.current(reportData);
    });
  }

  const getShapes = () => {
    const { result } = renderHook(() => useAtomValue(ReadShapesAtom));
    return result.current;
  }

  const getSelection = () => {
    const { result } = renderHook(() => useAtomValue(SelectionAtom));
    return result.current;
  }

  const setActiveLayer = (layer: number) => {
    const { result } = renderHook(() => useSetAtom(SetActiveLayerIndexAtom));
    result.current(layer);
  }

  it('should select with a rectangle using "select"', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0, width: 45 * X, height: 30 * X });
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(2);
  });

  it('should select with a point using "select"', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.select({ x: 7 * X, y: 7 * X });
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(1);
  });

  it('should be empty when selecting an empty area with "select"', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0 });
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(0);
  });

  it('should move the selection when "move" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.move({ x: 0, y: 0 });
    });
    // Assert
    const selection = getSelection();
    expect(selection.get(0).bbox.x).toBe(0);
    expect(selection.get(0).bbox.y).toBe(0);
    const shapes = getShapes();
    expect(shapes.get(0).bbox.x).toBe(0);
    expect(shapes.get(0).bbox.y).toBe(0);
  });

  it('should not move the selection when there is no selection in "move"', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.move({ x: 0, y: 0 });
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.get(0).bbox.x).toBe(5);
    expect(shapes.get(0).bbox.y).toBe(5);
  });

  it('should resize the selection when "resize" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.resize({ x: 0, y: 0, width: 10 * X, height: 10 * X });
    });
    // Assert
    const selection = getSelection();
    expect(selection.get(0).bbox.width).toBe(10);
    expect(selection.get(0).bbox.height).toBe(10);
    const shapes = getShapes();
    expect(shapes.get(0).bbox.width).toBe(10);
    expect(shapes.get(0).bbox.height).toBe(10);
  });

  it('should move the selection when "movePosition" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(1);
    const { result } = renderHook(() => useReportManipulator());
    // Act
    act(() => {
      result.current.select({ x: 0, y: 30 * X, width: 120 * X, height: 6 * X });
    });
    act(() => {
      result.current.movePosition({ x1: 0, y1: 0, x2: 10 * X, y2: 10 * X });
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.get(0).bbox.width).toBe(10);
    expect(shapes.get(0).bbox.height).toBe(10);
  });

  it('should add a new shape when "append" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    const newShape = createRect({
      type: 'rect', x: 0, y: 0, width: 30, height: 30
    });
    const count = getShapes().count;
    // Act
    act(() => {
      result.current.append(newShape);
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.count).toBe(count + 1);
    expect(shapes.get(shapes.count - 1).type).toBe('rect');
    expect(shapes.get(shapes.count - 1).bbox.width).toBe(30);
    expect(shapes.get(shapes.count - 1).bbox.height).toBe(30);
  });

  it('should remove the selected shape when "remove" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    const count = getShapes().count;
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.remove();
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.count).toBe(count - 1);
    const selection = getSelection();
    expect(selection.count).toBe(0);
  });

  it('should append the copied shape when onCopy and "paste" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    const count = getShapes().count;
    const x = getShapes().get(0).bbox.x;
    const y = getShapes().get(0).bbox.y;
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.copy();
    });
    act(() => {
      result.current.paste();
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(1);
    const shapes = getShapes();
    expect(shapes.count).toBe(count + 1);
    const added = shapes.get(shapes.count - 1);
    expect(added.type).toBe('circle');
    // paste position is (x + 20, y + 20)
    expect(added.bbox.x).toBe(x + Math.round(20 / X * 10) / 10);
    expect(added.bbox.y).toBe(y + Math.round(20 / X * 10) / 10);
  });

  it('should move the copied shape when onCut and "paste" is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useReportManipulator());
    const count = getShapes().count;
    // Act
    act(() => {
      result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.cut();
    });
    act(() => {
      result.current.paste();
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.count).toBe(count); // same count as before
    const selection = getSelection();
    expect(selection.count).toBe(1);
    const added = shapes.get(shapes.count - 1);
    expect(added.type).toBe('circle');
  });

  describe('Tests for undo/redo', () => {

    it('should undo when "undo" is called', () => {
      // Arrange
      setReport();
      setActiveLayer(0);
      const { result } = renderHook(() => useReportManipulator());
      const count = getShapes().count;
      // Act
      act(() => {
        result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
      });
      act(() => {
        result.current.remove();
      });
      act(() => {
        result.current.undo();
      });
      // Assert
      const shapes = getShapes();
      expect(shapes.count).toBe(count);
    });

    it('should redo when "redo" is called', () => {
      // Arrange
      setReport();
      setActiveLayer(0);
      const { result } = renderHook(() => useReportManipulator());
      const count = getShapes().count;
      // Act
      act(() => {
        result.current.select({ x: 0, y: 0, width: 30 * X, height: 30 * X });
      });
      act(() => {
        result.current.remove();
      });
      act(() => {
        result.current.undo();
      });
      act(() => {
        result.current.redo();
      });
      // Assert
      const shapes = getShapes();
      expect(shapes.count).toBe(count - 1);
    });

    it('should select all shapes when "selectAll" is called', () => {
      // Arrange
      setReport();
      setActiveLayer(0);
      const { result } = renderHook(() => useReportManipulator());
      const count = getShapes().count;
      // Act
      act(() => {
        result.current.selectAll();
      });
      // Assert
      const selection = getSelection();
      expect(selection.count).toBe(count);
    })

  });
});
