/**
 * UseReport
 *
 * Created by sunvisor on 2025/03/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ReadReportAtom, SetReportAtom } from '../atom/ReportAtom';
import { useAtomValue, useSetAtom } from 'jotai';


export default function useReport() {
  const report = useAtomValue(ReadReportAtom);
  const setReport = useSetAtom(SetReportAtom);

  return { report, setReport };
}
