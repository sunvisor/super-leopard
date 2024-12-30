/**
 * PageReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createShapes, FieldValues, LayerData, Page, ReportData, } from '@sunvisor/super-leopard-core';
import { PdfDrawer } from './PdfDrawer';
import { ReportDrawerInterface } from './type';


type PageReportDrawerProps = {
  report: ReportData;
  page: Page;
  drawer: PdfDrawer;
}

export class PageReportDrawer implements ReportDrawerInterface {

  private readonly report: ReportData;
  private readonly drawer: PdfDrawer;
  private readonly page: Page;

  constructor(
    { report, page, drawer }: PageReportDrawerProps
  ) {
    this.report = report;
    this.page = page;
    this.drawer = drawer;
  }

  get document() {
    return this.drawer.document;
  }

  draw(params: { values: FieldValues }) {
    this.drawer.addPage(this.page);
    this.report.layers.forEach(layer => {
      this.drawLayer(layer, params);
    });
  }

  private drawLayer(layer: LayerData, params: { values: FieldValues }) {
    const shapes = createShapes(layer.shapes);
    this.drawer.draw(shapes, params)
  }

}
