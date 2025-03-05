/**
 * UseReportStates
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue, useSetAtom } from 'jotai';
import { ReadReportAtom } from '../../../atom/ReportAtom';
import { CanRedoAtom, CanUndoAtom, ReadDirtyAtom, RedoHistoryAtom, UndoHistoryAtom } from '../../../atom/HistoryAtom';
import { useCallback } from 'react';

export default function useReportStates() {
  const report = useAtomValue(ReadReportAtom);
  const dirty = useAtomValue(ReadDirtyAtom);
  const doUndo = useSetAtom(UndoHistoryAtom);
  const doRedo = useSetAtom(RedoHistoryAtom);
  const canUndo = useAtomValue(CanUndoAtom);
  const canRedo = useAtomValue(CanRedoAtom);

  const undo = useCallback(() => {
    if (canUndo) {
      doUndo();
    }
  }, [doUndo, canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      doRedo();
    }
  }, [doRedo, canRedo])

  return { report, dirty, undo, redo, canRedo, canUndo };
}
