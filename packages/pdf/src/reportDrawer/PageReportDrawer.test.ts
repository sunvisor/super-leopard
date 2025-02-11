/**
 * Test for PageReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { PageReportDrawer } from "./PageReportDrawer";
import { createAndRegisterTestFonts, getImagePath, mockDoc, mockMeasurement, testAssets } from '../__test_assets__';
import { createPage, createScale, ReportData } from '@sunvisor/super-leopard-core';
import { PdfDrawer } from './PdfDrawer';
import { describe, Mock } from 'vitest';


const { combinationTestData } = testAssets;

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
  return new PageReportDrawer({report, page, drawer});
}

describe('Tests for PageReportDrawer', () => {

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
        shapes: combinationTestData,
      }],
    };
    const drawer = createDrawer(report);
    const values = {
      firstName: 'Hisashi',
      lastName: 'Nakamura',
    }
    // Act
    drawer.draw({ values });
    // Assert
    const result = (mockDoc.text as Mock).mock.calls;
    expect(result[0][0].text).toBe('First Name');
    expect(result[1][0].text).toBe('Last Name');
    expect(result[2][0].text).toBe('Hisashi');
    expect(result[3][0].text).toBe('Nakamura');
  });

});
