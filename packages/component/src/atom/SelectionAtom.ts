/**
 * Selection Atom
 *
 * Created by sunvisor on 2024/02/10.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { atom } from 'jotai/index';
import { Shapes } from '@sunvisor/super-leopard-core';

export const SelectionAtom = atom<Shapes>(new Shapes([]));

/**
 * Clear selection atom
 */
export const ClearSelectionAtom = atom(null, (_, set) => {
  set(SelectionAtom, new Shapes([]));
});
