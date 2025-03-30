/**
 * Report
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { useEffect, useMemo } from "react";
import ReportPaper from '../paper/ReportPaper';
import { FieldValues, ReportData } from '@sunvisor/super-leopard-core';
import Layer from '../layer/Layer';
import { DrawModeType } from '@/svg';
import contractShapes from '@/component/report/layer/contractShapes';
import { setSettings, SettingData } from '@/settings';
import useReport from '@/hooks/useReport';
import useZoom from '@/hooks/useZoom';

type Props = {
  report: ReportData;
  values: FieldValues;
  listRecords?: FieldValues[];
  pageNumber?: number;
  zoom: number;
  settings?: SettingData;
}

export default function Report(props: Props) {
  const { report, zoom, settings, ...rest } = props;
  const layers = useMemo(
    () => contractShapes(report.layers),
    [report.layers]
  );
  const { setZoom } = useZoom();
  const { setReport } = useReport();

  setReport(report);
  useEffect(() => {
    setZoom(zoom);
    if (settings) setSettings(settings);
  }, [zoom, setZoom]);

  return (
    <ReportPaper>
      {
        layers.map(layer => (
          <Layer
            key={layer.name}
            name={layer.name}
            shapes={layer.shapes ?? []}
            mode={DrawModeType.PRINT}
            {...rest}
          />
        ))
      }
    </ReportPaper>
  );
}
