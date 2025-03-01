/**
 * Test for ListReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ListReportDrawer } from "./ListReportDrawer";
import { createPage, createScale, ReportData } from '@sunvisor/super-leopard-core';
import {
  createAndRegisterTestFonts,
  getImagePath,
  mockDoc,
  mockMeasurement,
} from '../__test_assets__';
import { PdfDrawer } from './PdfDrawer';
import { describe, Mock } from 'vitest';
import { combinationTestData } from '@sunvisor/super-leopard-test-assets';


function createDrawer(report: ReportData) {
  const scale = createScale({
    unit: 'mm',
  });

  const drawer = new PdfDrawer({
    doc: mockDoc,
    scale,
    getImagePath,
    fonts: createAndRegisterTestFonts(mockDoc),
    measurement: mockMeasurement,
  });
  const page = createPage(report.page);
  return new ListReportDrawer({ report, drawer, page });
}

describe('Tests for ListReportDrawer', () => {

  it('should draw report', () => {
    // Arrange
    const report: ReportData = {
      page: {
        size: 'A4',
        orientation: 'portrait',
        unit: 'mm',
      },
      layers: [{
        name: 'test',
        shapes: [{
          type: 'list',
          rows: 10,
          columns: 1,
          shapes: combinationTestData
        }],
      }],
    };
    const drawer = createDrawer(report);
    const values = {};
    const listRecords = Array.from({ length: 25 }, (_, i) => ({
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
    }));
    // Act
    drawer.draw({ values, listRecords });
    // Assert
    expect(mockDoc.text).toHaveBeenCalledTimes(25 * 4);
    const result = (mockDoc.text as Mock).mock.calls;
    expect(result[0][0].text).toBe('First Name');
    expect(result[1][0].text).toBe('Last Name');
    expect(result[2][0].text).toBe('First1');
    expect(result[3][0].text).toBe('Last1');

  });

});
