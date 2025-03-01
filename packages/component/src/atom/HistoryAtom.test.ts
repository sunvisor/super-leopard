/**
 * Test for HistoryAtom
 *
 * Created by sunvisor on 2024/02/10.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  CanRedoAtom,
  CanUndoAtom,
  ClearHistoryAtom,
  PushHistoryAtom,
  ReadHistoryAtom,
  ReadPointerAtom,
  RedoHistoryAtom,
  UndoHistoryAtom
} from "./HistoryAtom";
import { createStore } from 'jotai/index';
import { ReportData } from '@sunvisor/super-leopard-core';
import { ReadShapesAtom } from './ReportAtom';
import { shapeTestData, shapeTestData2 } from '@sunvisor/super-leopard-test-assets';


describe('Tests for HistoryAtom', () => {

  const report: ReportData = {
    page: {
      size: 'A4',
      orientation: 'portrait',
      unit: 'mm',
    },
    layers: [
      {
        name: 'layer1',
        shapes: shapeTestData,
      }
    ]
  }
  const testHistories = [
    {
      // Initial load
      report,
    },
    {
      report: {
        ...report,
        layers: [
          {
            name: 'layer1',
            shapes: shapeTestData2,
          }
        ]
      }
    },
  ];

  test('Pushing to history enables undo', () => {
    // Arrange
    const store = createStore();
    const item = testHistories[0];
    expect(store.get(CanUndoAtom)).toBe(false);
    // Act
    store.set(PushHistoryAtom, item);
    // Assert
    expect(store.get(CanUndoAtom)).toBe(true);
    expect(store.get(ReadHistoryAtom).length).toBe(1);
    expect(store.get(ReadPointerAtom)).toBe(0);
  });

  test('Undoing history reverts to the previous state', () => {
    // Arrange
    const store = createStore();
    store.set(PushHistoryAtom, testHistories[0]); // Initial load
    store.set(PushHistoryAtom, testHistories[1]); // Change in shapes
    // Act
    store.set(UndoHistoryAtom);
    // Assert
    expect(store.get(CanRedoAtom)).toBe(true);
    expect(store.get(ReadShapesAtom).count).toBe(shapeTestData.length);
    expect(store.get(ReadHistoryAtom).length).toBe(2);
    expect(store.get(ReadPointerAtom)).toBe(0);
  });

  test('Redoing history restores the state', () => {
    // Arrange
    const store = createStore();
    store.set(PushHistoryAtom, testHistories[0]); // Initial load
    store.set(PushHistoryAtom, testHistories[1]); // Change in shapes
    store.set(UndoHistoryAtom);
    // Act
    store.set(RedoHistoryAtom);
    // Assert
    expect(store.get(CanRedoAtom)).toBe(false);
    expect(store.get(ReadShapesAtom).count).toBe(shapeTestData2.length);
    expect(store.get(ReadHistoryAtom).length).toBe(2);
    expect(store.get(ReadPointerAtom)).toBe(1);
  });

  test('Clearing history resets it', () => {
    // Arrange
    const store = createStore();
    store.set(PushHistoryAtom, testHistories[0]); // Initial load
    store.set(PushHistoryAtom, testHistories[1]); // Change in shapes
    store.set(UndoHistoryAtom);
    // Act
    store.set(ClearHistoryAtom);
    // Assert
    expect(store.get(CanUndoAtom)).toBe(false);
    expect(store.get(ReadHistoryAtom).length).toBe(0);
    expect(store.get(ReadPointerAtom)).toBe(-1);
  });

});
