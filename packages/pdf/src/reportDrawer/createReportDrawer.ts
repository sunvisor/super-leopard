/**
 * ReportDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createPage, ReportData, reportHasList } from '@sunvisor/super-leopard-core';
import { PdfFont } from '../font/pdfFont';
import { PageReportDrawer } from './PageReportDrawer';
import { createPdfDrawer } from './createPdfDrawer';
import { ListReportDrawer } from './ListReportDrawer';
import { ReportDrawerInterface } from './type';
import { ImageHandlerProps } from '../shapeDrawer/ShapeDrawer';


type CreateReportDrawerParams = {
  report: ReportData;
  fonts: PdfFont;
} & ImageHandlerProps;

export function createReportDrawer(params: CreateReportDrawerParams): ReportDrawerInterface {
  const { report } = params;
  return reportHasList(report) ? createListReportDrawer(params) : createPageReportDrawer(params);
}

function createListReportDrawer(params: CreateReportDrawerParams): ListReportDrawer {
  const { report, fonts, ...rest } = params;
  const page = createPage(report.page);
  const drawer = createPdfDrawer({ fonts, page, ...rest });
  return new ListReportDrawer({ report, drawer, page });
}

function createPageReportDrawer(params: CreateReportDrawerParams): PageReportDrawer {
  const { report, fonts, ...rest } = params;
  const page = createPage(report.page);
  const drawer = createPdfDrawer({ fonts, page, ...rest });
  return new PageReportDrawer({ report, page, drawer });
}
