import PDFDocument = PDFKit.PDFDocument;
import { DataParams } from '@sunvisor/super-leopard-core';

/**
 * Type
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export interface ReportDrawerInterface {
  document: PDFDocument;
  draw(params: DataParams): void;
}
