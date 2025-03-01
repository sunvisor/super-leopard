/**
 * Test for Object
 *
 * Created by sunvisor on 2024/03/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */

import { changeLayersUnit, changeShapesUnit, changeUnit } from './object';
import { PaperSize, Rect, UnitType, UnitValue } from '../object';
import { ReportData } from '../data';
import { createShapes } from '../creator';
import { GroupData, ListData, RectData, ShapeData } from '../data';
import { fieldTestData } from '@sunvisor/super-leopard-test-assets';


function getReportData(unit: UnitValue, shape: ShapeData): ReportData {
  return {
    page: {
      size: PaperSize.A4,
      unit,
    },
    layers: [{
      name: 'layer 1',
      shapes: [
        shape
      ]
    }]
  }
}

describe('Tests for changeUnit', () => {

  describe('Tests for change unit of Rect', () => {

    test('Change unit from millimeter to inch', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'rect',
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      }
      const report: ReportData = getReportData(UnitType.MILLIMETER, shape);
      const oldUnit = UnitType.MILLIMETER;
      const newUnit = UnitType.INCH;
      // Act
      const result = changeUnit(report, oldUnit, newUnit);
      // Assert
      const rect = result.layers[0].shapes[0] as RectData;
      expect(rect.x).toEqual(3.937);
      expect(rect.y).toEqual(3.937);
      expect(rect.width).toEqual(3.937);
      expect(rect.height).toEqual(3.937);
    });

    test('Change unit from inch to millimeter', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'rect',
        x: 3.937,
        y: 3.937,
        width: 3.937,
        height: 3.937,
      }
      const report: ReportData = getReportData(UnitType.MILLIMETER, shape);
      const oldUnit = UnitType.INCH;
      const newUnit = UnitType.MILLIMETER;
      // Act
      const result = changeUnit(report, oldUnit, newUnit);
      // Assert
      const rect = result.layers[0].shapes[0] as RectData;
      expect(rect.x).toEqual(100);
      expect(rect.y).toEqual(100);
      expect(rect.width).toEqual(100);
      expect(rect.height).toEqual(100);
    });

  });

  describe('Tests for change unit of List', () => {

    test('Change unit from millimeter to inch', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'list',
        width: 100,
        height: 100,
        rows: 3,
        columns: 3,
        shapes: fieldTestData
      }
      const report: ReportData = getReportData(UnitType.MILLIMETER, shape);
      const oldUnit = UnitType.MILLIMETER;
      const newUnit = UnitType.INCH;
      // Act
      const result = changeUnit(report, oldUnit, newUnit);
      // Assert
      const list = result.layers[0].shapes[0] as ListData;
      expect(list.width).toEqual(3.937);
      expect(list.height).toEqual(3.937);
    });

    test('Change unit from inch to millimeter', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'list',
        width: 3.937,
        height: 3.937,
        rows: 3,
        columns: 3,
        shapes: fieldTestData
      }
      const report: ReportData = getReportData(UnitType.MILLIMETER, shape);
      const oldUnit = UnitType.INCH;
      const newUnit = UnitType.MILLIMETER;
      // Act
      const result = changeUnit(report, oldUnit, newUnit);
      // Assert
      const list = result.layers[0].shapes[0] as ListData;
      expect(list.width).toEqual(100);
      expect(list.height).toEqual(100);
    })

  });

  describe('Tests for change unit of Report', () => {

    test('Change unit from millimeter to inch', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'group',
        width: 100,
        height: 100,
        shapes: [{
          type: 'rect',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
        }],
      }
      const report: ReportData = getReportData(UnitType.MILLIMETER, shape);
      const oldUnit = UnitType.MILLIMETER;
      const newUnit = UnitType.INCH;
      // Act
      const result = changeUnit(report, oldUnit, newUnit);
      // Assert
      const group = result.layers[0].shapes[0] as GroupData;
      expect(group.width).toEqual(3.937);
      expect(group.height).toEqual(3.937);
    });

    test('Change unit from inch to millimeter', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'group',
        width: 3.937,
        height: 3.937,
        shapes: [{
          type: 'rect',
          x: 3.937,
          y: 3.937,
          width: 3.937,
          height: 3.937,
        }],
      }
      const report: ReportData = getReportData(UnitType.MILLIMETER, shape);
      const oldUnit = UnitType.INCH;
      const newUnit = UnitType.MILLIMETER;
      // Act
      const result = changeUnit(report, oldUnit, newUnit);
      // Assert
      const group = result.layers[0].shapes[0] as GroupData;
      expect(group.width).toEqual(100);
      expect(group.height).toEqual(100);
    })

  });

});

describe('Test for changeShapesUnit', () => {

  describe('Change unit of Rect', () => {

    test('Change unit from millimeter to inch', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'rect',
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      }
      const shapes = createShapes([shape]);
      const oldUnit = UnitType.MILLIMETER;
      const newUnit = UnitType.INCH;
      // Act
      const result = changeShapesUnit(shapes, oldUnit, newUnit);
      // Assert
      const rect = result.get(0) as Rect;
      expect(rect.x).toEqual(3.937);
      expect(rect.y).toEqual(3.937);
      expect(rect.width).toEqual(3.937);
      expect(rect.height).toEqual(3.937);
    });

  });

});

describe('Test for changeLayersUnit', () => {

  describe('Change unit of Layers', () => {

    test('Change unit from millimeter to inch', () => {
      // Arrange
      const shape: ShapeData = {
        type: 'rect',
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      }
      const shape2: ShapeData = {
        type: 'rect',
        x: 1000,
        y: 1000,
        width: 1000,
        height: 1000,
      }
      const layers = [{
        name: 'layer1',
        shapes: [shape]
      }, {
        name: 'layer2',
        shapes: [shape2],
      }];
      const oldUnit = UnitType.MILLIMETER;
      const newUnit = UnitType.INCH;
      // Act
      const result = changeLayersUnit(layers, oldUnit, newUnit);
      // Assert
      const rect = result[0].shapes[0] as RectData;
      expect(rect.x).toEqual(3.937);
      const rect2 = result[1].shapes[0] as RectData;
      expect(rect2.x).toEqual(39.37);
    });

  });

});
