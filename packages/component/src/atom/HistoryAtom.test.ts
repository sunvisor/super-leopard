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
import { createStore } from 'jotai';
import { ReportData } from '@sunvisor/super-leopard-core';
import { ReadShapesAtom } from './ReportAtom';
import { shapeTestData, shapeTestData2 } from '@sunvisor/super-leopard-test-assets';
import { MAX_HISTORY } from './HistoryAtom';

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
    // initial load
    store.set(PushHistoryAtom, item);
    // Act
    store.set(PushHistoryAtom, testHistories[1]);
    // Assert
    expect(store.get(CanUndoAtom)).toBe(true);
    expect(store.get(ReadHistoryAtom).length).toBe(2);
    expect(store.get(ReadPointerAtom)).toBe(1);
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

  test('History does not exceed MAX_HISTORY', () => {
    // Arrange
    const store = createStore();

    // Fill up history with MAX_HISTORY + 10 entries
    for (let i = 0; i < MAX_HISTORY + 10; i++) {
      const dummy: ReportData = {
        page: report.page,
        layers: [{
          name: `layer-${i}`,
          shapes: [],
        }]
      };
      store.set(PushHistoryAtom, { report: dummy });
    }

    const history = store.get(ReadHistoryAtom);
    const pointer = store.get(ReadPointerAtom);

    // Assert
    expect(history.length).toBe(MAX_HISTORY);
    expect(pointer).toBe(MAX_HISTORY - 1);
    expect(history[0].report.layers[0].name).toBe(`layer-10`); // first ten elements have been removed
    expect(history[MAX_HISTORY - 1].report.layers[0].name).toBe(`layer-${MAX_HISTORY + 9}`); // last element
  });
});
