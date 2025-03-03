/**
 * PageReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { getImagePath, openStream } from '../drawerTestHelper';
import { ReportData } from '@sunvisor/super-leopard-core';
import { createTestFonts } from '../textTestHelper';
import { createReportDrawer } from '../../reportDrawer/createReportDrawer';
import { combinationTestData } from '@sunvisor/super-leopard-test-assets';


const category = 'report';
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

export default function pageReportDrawer() {
  const drawer = createReportDrawer({
    report,
    getImagePath,
    fonts: createTestFonts()
  });
  const stream = openStream(category, 'page_report.pdf');
  drawer.open(stream);

  data.forEach(values => {
    drawer.draw({ values });
  });
  drawer.close();
}
