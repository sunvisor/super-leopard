/**
 * Test for useEventHandler
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import useEventHandler from "./useEventHandler";
import { act, renderHook } from '@testing-library/react';
import { ReadShapesAtom, SetActiveLayerIndexAtom, SetReportAtom } from '../../../atom/ReportAtom';
import { createRect, DPPX, PaperSize, ReportData, UnitType } from '@sunvisor/super-leopard-core';
import { useAtomValue, useSetAtom } from 'jotai';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import { layerTestData } from '../../../__test_assets__';


describe('Tests for useEventHandler', () => {

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

  test('Select with a rectangular area using onSelect', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0, width: 45 * X, height: 30 * X });
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(2);
  });

  test('Select with a point using onSelect', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onSelect({ x: 7 * X, y: 7 * X });
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(1);
  });

  test('Selection should be empty when selecting an empty area with onSelect', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0 });
    });
    // Assert
    const selection = getSelection();
    expect(selection.count).toBe(0);
  });

  test('Selection should move when onMove is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.onMove({ x: 0, y: 0 });
    });
    // Assert
    const selection = getSelection();
    expect(selection.get(0).bbox.x).toBe(0);
    expect(selection.get(0).bbox.y).toBe(0);
    const shapes = getShapes();
    expect(shapes.get(0).bbox.x).toBe(0);
    expect(shapes.get(0).bbox.y).toBe(0);
  });

  test('Selection should not move when there is no selection in onMove', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onMove({ x: 0, y: 0 });
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.get(0).bbox.x).toBe(5);
    expect(shapes.get(0).bbox.y).toBe(5);
  });

  test('Selection should resize when onResize is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.onResize({ x: 0, y: 0, width: 10 * X, height: 10 * X });
    });
    // Assert
    const selection = getSelection();
    expect(selection.get(0).bbox.width).toBe(10);
    expect(selection.get(0).bbox.height).toBe(10);
    const shapes = getShapes();
    expect(shapes.get(0).bbox.width).toBe(10);
    expect(shapes.get(0).bbox.height).toBe(10);
  });

  test('Selection should move when onMovePosition is called', () => {
    // Arrange
    setReport();
    setActiveLayer(1);
    const { result } = renderHook(() => useEventHandler());
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 30 * X, width: 120 * X, height: 6 * X });
    });
    act(() => {
      result.current.onMovePosition({ x1: 0, y1: 0, x2: 10 * X, y2: 10 * X });
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.get(0).bbox.width).toBe(10);
    expect(shapes.get(0).bbox.height).toBe(10);
  });

  test('', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    const newShape = createRect({
      type: 'rect', x: 0, y: 0, width: 30, height: 30
    });
    const count = getShapes().count;
    // Act
    act(() => {
      result.current.onAppend(newShape);
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.count).toBe(count + 1);
    expect(shapes.get(shapes.count - 1).type).toBe('rect');
    expect(shapes.get(shapes.count - 1).bbox.width).toBe(30);
    expect(shapes.get(shapes.count - 1).bbox.height).toBe(30);
  });

  test('Should remove the selected shape when onRemove is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    const count = getShapes().count;
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.onRemove();
    });
    // Assert
    const shapes = getShapes();
    expect(shapes.count).toBe(count - 1);
    const selection = getSelection();
    expect(selection.count).toBe(0);
  });

  test('Should append the copied shape when onCopy and onPaste is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    const count = getShapes().count;
    const x = getShapes().get(0).bbox.x;
    const y = getShapes().get(0).bbox.y;
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.onCopy();
    });
    act(() => {
      result.current.onPaste();
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

  test('Should move the copied shape when onCut and onPaste is called', () => {
    // Arrange
    setReport();
    setActiveLayer(0);
    const { result } = renderHook(() => useEventHandler());
    const count = getShapes().count;
    // Act
    act(() => {
      result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
    });
    act(() => {
      result.current.onCut();
    });
    act(() => {
      result.current.onPaste();
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

    test('Should undo when onUndo is called', () => {
      // Arrange
      setReport();
      setActiveLayer(0);
      const { result } = renderHook(() => useEventHandler());
      const count = getShapes().count;
      // Act
      act(() => {
        result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
      });
      act(() => {
        result.current.onRemove();
      });
      act(() => {
        result.current.onUndo();
      });
      // Assert
      const shapes = getShapes();
      expect(shapes.count).toBe(count);
    });

    test('Should redo when onRedo is called', () => {
      // Arrange
      setReport();
      setActiveLayer(0);
      const { result } = renderHook(() => useEventHandler());
      const count = getShapes().count;
      // Act
      act(() => {
        result.current.onSelect({ x: 0, y: 0, width: 30 * X, height: 30 * X });
      });
      act(() => {
        result.current.onRemove();
      });
      act(() => {
        result.current.onUndo();
      });
      act(() => {
        result.current.onRedo();
      });
      // Assert
      const shapes = getShapes();
      expect(shapes.count).toBe(count - 1);
    });

  });
});
