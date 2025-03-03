/**
 * ListReportDrawer
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createReportDrawer } from '../../reportDrawer/createReportDrawer';
import { createTestFonts } from '../textTestHelper';
import { getImagePath, openStream } from '../drawerTestHelper';
import { billTestData, billValues, dummyBillRecords } from '@sunvisor/super-leopard-test-assets';


const category = 'report';
const report = billTestData;

export default function listReportDrawer() {
  const data = [
    billValues,
    { ...billValues, customer: '株式会社 BBB' },
  ]
  const details = [
    dummyBillRecords(4),
    dummyBillRecords(15),
  ];
  const drawer = createReportDrawer({
    report,
    getImagePath,
    fonts: createTestFonts()
  });
  const stream = openStream(category, 'list_report.pdf');

  drawer.open(stream);
  data.forEach((values, index) => {
    drawer.draw({ values, listRecords: details[index] });
  });
  drawer.close();
}
