/**
 * ListReportDrawer
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createReportDrawer } from '../../reportDrawer/createReportDrawer';
import { testAssets } from '@sunvisor/super-leopard-core';
import { createTestFonts } from '../textTestHelper';
import { getImagePath, getWritePdf, loadErrorImage } from '../drawerTestHelper';


const { billTestData, billValues, dummyBillRecords } = testAssets;
const category = 'report';
const writePdf = getWritePdf(category);
const report = billTestData;

export default async function listReportDrawer() {
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
    loadErrorImage,
    fonts: createTestFonts()
  });
  data.forEach((values, index) => {
    drawer.draw({ values, listRecords: details[index] });
  })

  await writePdf('list_report.pdf', drawer.document);
}
