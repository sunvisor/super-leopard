/**
 * MakePDF
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import circleDrawer from './pdf_makers/circleDrawer';
import ellipseDrawer from './pdf_makers/ellipseDrawer';
import imageDrawer from './pdf_makers/imageDrawer';
import lineDrawer from './pdf_makers/lineDrawer';
import rectDrawer from './pdf_makers/rectDrawer';
import singleLineTextDrawer from './pdf_makers/singleLineTextDrawer';
import multiLineTextDrawer from './pdf_makers/multiLineTextDrawer';
import pageReportDrawer from './pdf_makers/pageReportDrawer';
import listReportDrawer from './pdf_makers/listReportDrawer';

console.log('Make PDF');

async function main() {
  await circleDrawer();
  await ellipseDrawer();
  await imageDrawer();
  await lineDrawer();
  await rectDrawer();
  await singleLineTextDrawer();
  await multiLineTextDrawer();
  await pageReportDrawer();
  await listReportDrawer();
}

main().then(() => console.log('Done'));
