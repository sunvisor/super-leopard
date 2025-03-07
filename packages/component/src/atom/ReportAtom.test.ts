/**
 * Test for ReportAtom
 *
 * Created by sunvisor on 2024/02/06.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  ActiveLayerAtom,
  AddLayerAtom,
  ApplyShapesToReportAtom,
  ReadActiveLayerIndexAtom,
  ReadPageAtom,
  ReadReportAtom,
  ReadShapesAtom,
  RemoveLayerAtom,
  RestoreReportAtom,
  SetActiveLayerIndexAtom,
  SetReportAtom,
  SetShapesAtom,
  UpdateLayerNameAtom,
  UpdateLayersAtom,
} from "./ReportAtom";
import { createStore } from 'jotai';
import { ReadHistoryAtom } from './HistoryAtom';
import { createShapes, ReportData } from '@sunvisor/super-leopard-core';
import { layerTestData } from '../__test_assets__';
import { billTestData, shapeTestData } from '@sunvisor/super-leopard-test-assets';


describe('Tests for ReportAtom', () => {

  describe('Tests for SetReportAtom', () => {

    const store = createStore();

    test('Clears history and records only one entry', () => {
      // Act
      store.set(SetReportAtom, billTestData);
      // Assert
      const history = store.get(ReadHistoryAtom);
      expect(history.length).toBe(1);
      expect(history[0].report).toEqual(billTestData);
    });

  });

  describe('Tests for RestoreReportAtom', () => {

    // Act
    const store = createStore();
    store.set(RestoreReportAtom, billTestData, 0);

    test('Saves the report', () => {
      // Assert
      const result = store.get(ReadReportAtom);
      expect(result).toBe(billTestData);
    });

    test('Saves the activeLayerIndex', () => {
      // Assert
      const result = store.get(ReadActiveLayerIndexAtom);
      expect(result).toBe(0);
    });

    test('Saves the shapes', () => {
      // Assert
      const result = store.get(ReadShapesAtom);
      expect(result.count).toBe(billTestData.layers[0].shapes?.length);
    });

    test('Saves the page', () => {
      // Assert
      const result = store.get(ReadPageAtom);
      expect(result.margin).toEqual(billTestData.page.margin);
    });

  });

  describe('Tests for ActiveLayerAtom', () => {

    test('Verifies the value of ActiveLayerAtom', () => {
      // Arrange
      const store = createStore();
      store.set(SetReportAtom, billTestData);
      store.set(SetActiveLayerIndexAtom, 0);
      // Act
      const result = store.get(ActiveLayerAtom);
      // Assert
      expect(result).toBe(billTestData.layers[0]);
    });

    test('Changes the activeLayerIndex', () => {
      // Arrange
      const store = createStore();
      const report = { ...billTestData };
      report.layers.push({ name: 'layer2', shapes: [] });
      store.set(SetReportAtom, report);
      store.set(SetActiveLayerIndexAtom, 0);
      // Act
      store.set(SetActiveLayerIndexAtom, 1);
      const result = store.get(ActiveLayerAtom);
      // Assert
      expect(result).toBe(report.layers[1]);
    });

  });

  describe('Tests for ApplyShapesToReportAtom', () => {

    test('Updates shapes', () => {
      // Arrange
      const store = createStore();
      store.set(SetReportAtom, billTestData);
      store.set(SetActiveLayerIndexAtom, 0);
      store.set(SetShapesAtom, createShapes(shapeTestData));
      // Act
      store.set(ApplyShapesToReportAtom);
      const result = store.get(ActiveLayerAtom);
      // Assert
      expect(result.shapes).toEqual(shapeTestData);
    });
  });

  describe('Tests for AddLayerAtom', () => {

    test('Adds a new layer', () => {
      // Arrange
      const store = createStore();
      const l = billTestData.layers.length;
      store.set(SetReportAtom, billTestData);
      // Act
      store.set(AddLayerAtom);
      const result = store.get(ReadReportAtom);
      // Assert
      expect(billTestData.layers.length).toBe(l);
      expect(result.layers.length).toBe(l + 1);
    });

  });

  describe('Tests for RemoveLayerAtom', () => {

    test('Removes a layer', () => {
      // Arrange
      const store = createStore();
      const testData: ReportData = {
        page: {
          unit: 'mm',
          size: 'A4',
        },
        layers: layerTestData,
      };
      store.set(SetReportAtom, testData);
      const l = layerTestData.length;
      // Act
      store.set(RemoveLayerAtom, 1);
      const result = store.get(ReadReportAtom);
      // Assert
      expect(layerTestData.length).toBe(l);
      expect(result.layers.length).toBe(l - 1);
    });

  });

  describe('Tests for UpdateLayersAtom', () => {

    test('Updates layers', () => {
      // Arrange
      const store = createStore();
      const testData: ReportData = {
        page: {
          unit: 'mm',
          size: 'A4',
        },
        layers: layerTestData,
      };
      store.set(SetReportAtom, testData);
      const l = testData.layers.length;
      // Act
      store.set(UpdateLayersAtom, layerTestData, 1);
      // Assert
      const report = store.get(ReadReportAtom);
      expect(report.layers.length).toBe(l);
      expect(report.layers).toEqual(layerTestData);
      const index = store.get(ReadActiveLayerIndexAtom);
      expect(index).toBe(1);
    });

  });

  describe('Tests for UpdateLayerNameAtom', () => {

    test('Updates a layer name', () => {
      // Arrange
      const store = createStore();
      const testData: ReportData = {
        page: {
          unit: 'mm',
          size: 'A4',
        },
        layers: layerTestData,
      };
      store.set(SetReportAtom, testData);
      // Act
      store.set(UpdateLayerNameAtom, 1, 'new name');
      const result = store.get(ReadReportAtom);
      // Assert
      expect(testData.layers[1].name).toBe('layer2');
      expect(result.layers[1].name).toBe('new name');
    });
  });

});
