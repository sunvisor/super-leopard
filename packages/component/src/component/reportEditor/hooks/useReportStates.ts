/**
 * UseReportStates
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue } from 'jotai';
import { ReadReportAtom } from '../../../atom/ReportAtom';
import { ReadDirtyAtom } from '../../../atom/HistoryAtom';

export default function useReportStates() {
  const report = useAtomValue(ReadReportAtom);
  const dirty = useAtomValue(ReadDirtyAtom);

  return { report, dirty };
}
