/**
 * Test for Report
 *
 * Created by sunvisor on 2024/03/04.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { getListFromReport, getReportSchema, layersHasMultipleList, reportHasList, updateLayers } from "./Report";
import { LayerData, ReportData } from '../data';
import { billTestData, billTestShapesData, fieldTestData, shapeTestData } from '../__test_assets__';
import { describe, expect } from 'vitest';
import { List } from '../object';


describe('Tests for Report', () => {

  describe('Tests for updateLayers', () => {

    test('Should return new updated instance', () => {
      // Arrange
      const report: ReportData = {
        page: {
          size: 'A4',
          orientation: 'portrait',
          unit: 'mm',
        },
        layers: [{
          name: 'test',
          shapes: [],
        }],
      };
      const layers: LayerData[] = [
        {
          name: 'test1',
          shapes: [],
        },
        {
          name: 'test2',
          shapes: [],
        },
      ];
      // Act
      const result = updateLayers(report, layers);
      // Assert
      expect(report.layers).toEqual([{
        name: 'test',
        shapes: [],
      }]);
      expect(result.layers).toEqual(layers);
    });

    test('Should throw error when layers has multiple List', () => {
      // Arrange
      const report: ReportData = {
        page: {
          size: 'A4',
          orientation: 'portrait',
          unit: 'mm',
        },
        layers: [{
          name: 'test',
          shapes: []
        }],
      };
      const layers: LayerData[] = [
        {
          name: 'test',
          shapes: [...billTestShapesData, ...billTestShapesData],
        },
      ];
      // Act
      // Assert
      expect(() => updateLayers(report, layers)).toThrow('Report cannot have multiple List.');
    });

  });

  describe('Tests for reportHasList', () => {

    test('Should return true when report has List', () => {
      // Arrange
      const report: ReportData = {
        page: {
          size: 'A4',
          orientation: 'portrait',
          unit: 'mm',
        },
        layers: [{
          name: 'test',
          shapes: billTestShapesData,
        }],
      };
      // Act
      const result = reportHasList(report);
      // Assert
      expect(result).toBe(true);
    });

    test('Should return false when report does not have List', () => {
      // Arrange
      const report: ReportData = {
        page: {
          size: 'A4',
          orientation: 'portrait',
          unit: 'mm',
        },
        layers: [{
          name: 'test',
          shapes: shapeTestData,
        }],
      };
      // Act
      const result = reportHasList(report);
      // Assert
      expect(result).toBe(false);
    });

  });

  describe('Tests for layersHasMultipleList', () => {

    test('Should return true when layers has multiple List', () => {
      // Arrange
      const layers: LayerData[] = [{
        name: 'test',
        shapes: [...billTestShapesData, ...billTestShapesData],
      }];
      // Act
      const result = layersHasMultipleList(layers);
      // Assert
      expect(result).toBe(true);
    });

    test('Should return false when layers does not have multiple List', () => {
      // Arrange
      const layers: LayerData[] = [{
        name: 'test',
        shapes: [...billTestShapesData, ...shapeTestData],
      }];
      // Act
      const result = layersHasMultipleList(layers);
      // Assert
      expect(result).toBe(false);
    });

  });

  describe('Tests for getListFromReport', () => {

    test('Should return the List for Report', () => {
      // Act
      const result = getListFromReport(billTestData);
      // Assert
      expect(result).toBeInstanceOf(List);
      expect(result.listCount).toEqual(10);
    });

  });

  describe('Tests for getReportSchema', () => {

    test('Should return the required data structure when ReportData is provided', () => {
      // Arrange
      // Act
      const result = getReportSchema(billTestData);
      // Assert
      expect(result).toEqual({
        "dateOfIssue": "string",
        "customer": "string",
        "subTotal": "string",
        "tax": "string",
        "total": "string",
        "details": {
          "itemName": "string",
          "dateOfDelivery": "string",
          "amount": "string",
          "unitPrice": "string",
          "price": "string",
        }
      });
    });

    test('Field types other than Text should be of boolean type', () => {
      // Arrange
      const report = {
        page: {
          size: 'A4',
          orientation: 'portrait',
          unit: 'mm',
        },
        layers: [{
          name: 'test',
          shapes: fieldTestData,
        }],
      }
      // Act
      const result = getReportSchema(report);
      // Assert
      expect(result).toEqual({
        "myTextField": "string",
        "myLineField": "boolean",
      });
    });

  });

});
