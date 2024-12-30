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
import { DrawModeType, GetSvgImagePath } from '../../../svg';
import { useSetAtom } from 'jotai';
import { SetReportAtom, SetZoomAtom } from '../../../atom/ReportAtom';
import contractShapes from '../../report/layer/contractShapes';

type Props = {
  report: ReportData;
  values: FieldValues;
  listRecords: FieldValues[];
  pageNumber?: number;
  zoom: number;
  getImageUrl: GetSvgImagePath;
}

export default function Report(props: Props) {
  const { report, zoom, getImageUrl,...rest } = props;
  const layers = useMemo(
    () => contractShapes(report.layers),
    [report.layers]
  );
  const setZoom = useSetAtom(SetZoomAtom);
  const setReport = useSetAtom(SetReportAtom);

  setReport(report);
  useEffect(() => {
    setZoom(zoom);
  }, [zoom, setZoom]);

  return (
    <ReportPaper>
      {
        layers.map(layer => (
          <Layer
           getImageUrl={getImageUrl}
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
