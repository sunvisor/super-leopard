/**
 * UseReport
 *
 * Created by sunvisor on 2025/03/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ApplyShapesToReportAtom, ReadReportAtom, SetReportAtom } from '../atom/ReportAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { reportHasList } from '@sunvisor/super-leopard-core';


export default function useReport() {
  const report = useAtomValue(ReadReportAtom);
  const setReport = useSetAtom(SetReportAtom);
  const hasList = () => reportHasList(report);
  const applyShapes = useSetAtom(ApplyShapesToReportAtom);

  return { report, setReport, hasList, applyShapes };
}
