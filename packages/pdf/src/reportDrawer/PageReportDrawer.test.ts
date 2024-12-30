/**
 * Test for PageReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { PageReportDrawer } from "./PageReportDrawer";
import { createAndRegisterTestFonts, getImagePath, mockMeasurement, testAssets } from '../__test_assets__';
import { createPage, createScale, ReportData } from '@sunvisor/super-leopard-core';
import PdfDocument from 'pdfkit';
import { PdfDrawer } from './PdfDrawer';
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
    const result = mockText.mock.calls;
    expect(result[0][0]).toBe('First Name');
    expect(result[1][0]).toBe('Last Name');
    expect(result[2][0]).toBe('Hisashi');
    expect(result[3][0]).toBe('Nakamura');
  });

});
