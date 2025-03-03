/**
 * ListReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  createShapes,
  DataParams, FieldValues,
  getListFromReport,
  LayerData,
  List,
  Page,
  ReportData,
  ListRecords
} from '@sunvisor/super-leopard-core';
import { PdfDrawer } from './PdfDrawer';
import { ReportDrawerInterface } from './type';


type ListReportDrawerProps = {
  report: ReportData;
  drawer: PdfDrawer;
  page: Page;
}

export class ListReportDrawer implements ReportDrawerInterface {

  private readonly report: ReportData;
  private readonly drawer: PdfDrawer;
  private readonly page: Page;
  private readonly list: List;

  constructor(
    { report, drawer, page }: ListReportDrawerProps
  ) {
    this.report = report;
    this.drawer = drawer;
    this.page = page;
    const list = getListFromReport(report);
    if (!list) {
      throw new Error('Report must have List');
    }
    this.list = list;
  }

  get document() {
    return this.drawer.document;
  }

  draw(params: DataParams) {
    const records = new ListRecords(params.listRecords);
    const report = this.report;
    const count = this.list.listCount;

    if (count === 0) {
      return;
    }
    records.each(count, (records: FieldValues[]) => {
      this.drawer.addPage(this.page);
      report.layers.forEach(layer => {
        this.drawLayer(layer, { ...params, listRecords: records });
      });
    });
  }

  open(stream: NodeJS.WritableStream) {
    this.drawer.open(stream);
  }

  close() {
    this.drawer.close();
  }

  private drawLayer(layer: LayerData, params: DataParams) {
    const shapes = createShapes(layer.shapes);
    this.drawer.draw(shapes, params);
  }

}
