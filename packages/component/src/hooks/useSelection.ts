/**
 * UseSelection
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtom } from 'jotai/index';
import { ClearSelectionAtom, SelectionAtom } from '../atom/SelectionAtom';
import { useSetAtom } from 'jotai';


export default function useSelection() {
  const clearSelection = useSetAtom(ClearSelectionAtom);
  const [selection, setSelection] = useAtom(SelectionAtom);

  return { selection, setSelection, clearSelection };
}
