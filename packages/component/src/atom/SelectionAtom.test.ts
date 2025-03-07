/**
 * Test for SelectionAtom
 *
 * Created by sunvisor on 2024/02/10.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ClearSelectionAtom, SelectionAtom } from "./SelectionAtom";
import { createStore } from 'jotai';
import { createShapes } from '@sunvisor/super-leopard-core';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


describe('Tests for SelectionAtom', () => {

  test('ClearSelectionAtom to empty the SelectionAtom', () => {
    // Arrange
    const store = createStore();
    const shapes = createShapes(shapeTestData);
    store.set(SelectionAtom, shapes);
    // Act
    store.set(ClearSelectionAtom);
    // Assert
    const result = store.get(SelectionAtom);
    expect(result.count).toBe(0);
  });

});
