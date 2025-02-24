/**
 * PageReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { getImagePath, getWritePdf, loadErrorImage } from '../drawerTestHelper';
import { ReportData } from '@sunvisor/super-leopard-core';
import { createTestFonts } from '../textTestHelper';
import { createReportDrawer } from '../../reportDrawer/createReportDrawer';
import { testAssets } from '@sunvisor/super-leopard-core';

const { combinationTestData } = testAssets;
const category = 'report';
const writePdf = getWritePdf(category);
const report: ReportData = {
  page: {
    size: 'A4',
    orientation: 'portrait',
    unit: 'mm',
    margin: {
      left: 20,
      top: 20,
    }
  },
  layers: [{
    name: 'test',
    shapes: combinationTestData,
  }],
};

const data = Array.from({ length: 3 },
  (_, i) => ({
    firstName: `First${i + 1}`, lastName: `Last${i + 1}`
  })
);

export default async function pageReportDrawer() {
  const drawer = createReportDrawer({
    report,
    getImagePath,
    loadErrorImage,
    fonts: createTestFonts()
  });

  data.forEach(values => {
    drawer.draw({ values });
  });
  await writePdf('page_report.pdf', drawer.document);
}
