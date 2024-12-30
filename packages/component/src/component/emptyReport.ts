import { ReportData, UnitType } from '@sunvisor/super-leopard-core';

/**
 * EmptyReport
 *
 * Created by sunvisor on 2024/04/04.
 * Copyright (C) Sunvisor Lab. 2024.
 */
export const emptyReport: ReportData = {
  page: {
    size: 'A4',
    orientation: 'portrait',
    unit: UnitType.MILLIMETER,
  },
  layers: [
    {name: 'layer1', shapes: []}
  ],
}

