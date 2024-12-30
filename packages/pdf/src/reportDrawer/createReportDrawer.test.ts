/**
 * Test for CreateReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createReportDrawer } from "./createReportDrawer";
import { ReportData } from '@sunvisor/super-leopard-core';
import { PageReportDrawer } from './PageReportDrawer';
import { createTestFonts, getImagePath, testAssets } from '../__test_assets__';
import { ListReportDrawer } from './ListReportDrawer';


const { combinationTestData } = testAssets;

describe('Tests for createReportDrawer', () => {

  it('should create PageReportDrawer when report does not have list', () => {
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
    // Act
    const drawer = createReportDrawer({
      report,
      getImagePath,
      fonts: createTestFonts(),
    })
    // Assert
    expect(drawer).toBeInstanceOf(PageReportDrawer);
  });

  it('should create ListReportDrawer when report has list', () => {
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
    // Act
    const drawer = createReportDrawer({ report, getImagePath, fonts: createTestFonts() });
    // Assert
    expect(drawer).toBeInstanceOf(ListReportDrawer);
  });

});
