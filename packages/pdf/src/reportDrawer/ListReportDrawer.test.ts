/**
 * Test for ListReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ListReportDrawer } from "./ListReportDrawer";
import { createPage, createScale, ReportData } from '@sunvisor/super-leopard-core';
import { createAndRegisterTestFonts, getImagePath, mockMeasurement, testAssets } from '../__test_assets__';
import { PdfDrawer } from './PdfDrawer';
import PdfDocument from 'pdfkit';
import { describe } from 'vitest';


const { combinationTestData } = testAssets;

const mockText = vi.fn();

function createDrawer(report: ReportData) {
  const doc = new PdfDocument({
    autoFirstPage: false,
  });
  const scale = createScale({
    unit: 'mm',
  });
  doc.text = mockText;
  const drawer = new PdfDrawer({
    doc,
    scale,
    getImagePath,
    fonts: createAndRegisterTestFonts(doc),
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
    expect(mockText).toHaveBeenCalledTimes(25 * 4);
    const result = mockText.mock.calls;
    expect(result[0][0]).toBe('First Name');
    expect(result[1][0]).toBe('Last Name');
    expect(result[2][0]).toBe('First1');
    expect(result[3][0]).toBe('Last1');

  });

});
