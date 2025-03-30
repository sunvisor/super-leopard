/**
 * UseSelection
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtom, useSetAtom } from 'jotai';
import { ClearSelectionAtom, SelectionAtom } from '@/atom/SelectionAtom';
import { Shapes } from '@sunvisor/super-leopard-core';


export default function useSelection() {
  const clearSelection = useSetAtom(ClearSelectionAtom);
  const [selection, setSelection] = useAtom(SelectionAtom);

  const toggleSelection = (shapes: Shapes) => {
    let newShapes = new Shapes(selection.items);
    shapes.each(shape => {
      newShapes = (!selection.contains(shape))
        ? newShapes.add(shape)
        : newShapes = newShapes.remove(shape);
    });
    setSelection(newShapes);
  }

  const changeSelection = (shapes: Shapes, toggle: boolean) => {
    toggle
      ? toggleSelection(shapes)
      : setSelection(shapes);
  }

  return { selection, setSelection, clearSelection, changeSelection };
}
