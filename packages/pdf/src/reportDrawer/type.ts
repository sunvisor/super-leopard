import { DataParams } from '@sunvisor/super-leopard-core';
import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';

/**
 * Type
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export interface ReportDrawerInterface {
  document: PdfDocumentInterface;
  draw(params: DataParams): void;
}
