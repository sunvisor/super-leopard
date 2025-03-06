/**
 * HistoryAtom
 *
 * Created by sunvisor on 2024/02/10.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { atom } from 'jotai';
import { ReportData } from '@sunvisor/super-leopard-core';
import { RestoreReportAtom } from './ReportAtom';
import { Atom } from 'jotai';
import { ClearSelectionAtom } from './SelectionAtom';

type HistoryItem = {
  report: ReportData;
}

type HistoryInternalItem = {
  report: string; // JSON string
}

const HistoryAtom = atom<HistoryInternalItem[]>([]);
const PointerAtom = atom<number>(-1);

const CurrentHistoryAtom = atom((get) => {
  return get(HistoryAtom)[get(PointerAtom)];
});

const DirtyAtom = atom<boolean>(false);

/**
 * Read history for debug and testing
 */
export const ReadHistoryAtom: Atom<HistoryItem[]> = atom((get) => {
  const history = get(HistoryAtom);
  return history.map(item => {
    return {
      ...item,
      report: JSON.parse(item.report) as ReportData,
    }
  });
});

/**
 * Read pointer for debug and testing
 */
export const ReadPointerAtom = atom((get) => get(PointerAtom));

export const CanUndoAtom = atom((get) => {
  return get(PointerAtom) >= 0;
});

export const CanRedoAtom = atom((get) => {
  return get(PointerAtom) < get(HistoryAtom).length - 1;
});

export const ClearHistoryAtom = atom(null, (_, set) => {
  set(HistoryAtom, []);
  set(PointerAtom, -1);
});

export const PushHistoryAtom = atom(null, (get, set, item: HistoryItem) => {
  const history = get(HistoryAtom);
  // remove all items above pointer
  if (history.length > get(PointerAtom) + 1) {
    history.splice(get(PointerAtom) + 1);
  }
  // add item at the end
  const newItem: HistoryInternalItem = {
    ...item,
    report: JSON.stringify(item.report),
  }
  history.push(newItem);
  set(HistoryAtom, history);
  set(PointerAtom, history.length - 1);
  set(DirtyAtom, true);
});

const RestoreHistoryAtom = atom(null, (get, set) => {
  const item = get(CurrentHistoryAtom);
  if (item.report) {
    const report = JSON.parse(item.report);
    set(RestoreReportAtom, report);
    set(DirtyAtom, true);
  }
});

export const UndoHistoryAtom = atom(null, (get, set) => {
  const pointer = get(PointerAtom);
  if (pointer <= 0) {
    return;
  }
  set(ClearSelectionAtom)
  set(PointerAtom, pointer - 1);
  set(RestoreHistoryAtom);
});

export const RedoHistoryAtom = atom(null, (get, set) => {
  const pointer = get(PointerAtom);
  const history = get(HistoryAtom);
  if (pointer > history.length - 1) {
    return;
  }
  set(ClearSelectionAtom)
  set(PointerAtom, pointer + 1);
  set(RestoreHistoryAtom);
});

export const ClearDirtyAtom = atom(null, (_, set) => {
  set(DirtyAtom, false);
});

export const ReadDirtyAtom = atom((get) => get(DirtyAtom));
