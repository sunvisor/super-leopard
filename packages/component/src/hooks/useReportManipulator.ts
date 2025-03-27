/**
 * useReportManipulator
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from 'react';
import { Atom, useAtomValue, useSetAtom, WritableAtom } from 'jotai';
import { Box, createShapesSelector, Line, Position, PositionPair, Shape, Shapes } from '@sunvisor/super-leopard-core';
import useShapes from './useShapes';
import useClipboard from '@/hooks/useClipboard';
import { CanRedoAtom, CanUndoAtom, ReadDirtyAtom, RedoHistoryAtom, UndoHistoryAtom } from '@/atom/HistoryAtom';
import { getSettings } from '@/settings';
import useScale from './useScale';
import useSelection from './useSelection';

const PASTE_OFFSET = 20; // pixel

type Props = {
  readAtom?: Atom<Shapes>,
  setAtom?: WritableAtom<null, [shapes: Shapes], void>,
}

export default function useReportManipulator(props: Props = {}) {
  const {
    shapes, removeShapes, addShape, updateShapes
  } = useShapes(props);
  const { selection, setSelection, clearSelection } = useSelection();
  const settings = getSettings();
  const { setToClipboard, getFromClipboard, canPaste } = useClipboard();
  const canUndo = useAtomValue(CanUndoAtom);
  const canRedo = useAtomValue(CanRedoAtom);
  const doUndo = useSetAtom(UndoHistoryAtom);
  const doRedo = useSetAtom(RedoHistoryAtom);
  const dirty = useAtomValue(ReadDirtyAtom);
  const { scale } = useScale();

  const select = useCallback((area: Box | Position) => {
      const selector = createShapesSelector(scale, settings.lineSelect);
      if ('width' in area) {
        setSelection(selector.selectByBox(area as Box, shapes));
      } else {
        setSelection(selector.selectByPosition(area, shapes));
      }
    },
    [scale, settings, setSelection, shapes]
  );

  const selectAll = useCallback(() => {
    setSelection(shapes);
  }, [setSelection, shapes]);

  const move = useCallback((pos: Position) => {
    pos = scale.fromPixel(pos);
    const newSelection = selection.moveTo(pos)
    updateShapes(selection, newSelection);
    setSelection(newSelection);
  }, [scale, selection, setSelection, updateShapes]);

  const resize = useCallback((box: Box) => {
    box = scale.fromPixel(box);
    const newSelection = selection.resize(box)
    updateShapes(selection, newSelection);
    setSelection(newSelection);
  }, [scale, selection, setSelection, updateShapes]);

  const movePosition = useCallback((positions: PositionPair) => {
    positions = scale.fromPixel(positions);
    const line = selection.get(0) as Line;
    const newLine = line.setPositions(positions);
    const newSelection = new Shapes([newLine]);
    updateShapes(selection, newSelection);
    setSelection(newSelection);
  }, [scale, selection, setSelection, updateShapes])

  const append = useCallback((shape: Shape) => {
    addShape(shape);
  }, [addShape]);

  const remove = useCallback(() => {
    removeShapes(selection);
    clearSelection();
  }, [clearSelection, removeShapes, selection]);

  const copy = useCallback(async () => {
    await setToClipboard(selection);
  }, [selection, setToClipboard]);

  const paste = useCallback(async () => {
    const clipboard = await getFromClipboard();
    const moveSize = scale.fromPixel(PASTE_OFFSET);
    if (clipboard.count > 0) {
      const newShapes = clipboard.moveTo({
        x: clipboard.bbox.x + moveSize,
        y: clipboard.bbox.y + moveSize,
      });
      addShape(newShapes);
      setSelection(newShapes);
    }
  }, [addShape, getFromClipboard, scale, setSelection]);

  const cut = useCallback(async () => {
    await copy();
    remove();
  }, [copy, remove]);

  const undo = useCallback(() => {
    if (canUndo) {
      clearSelection();
      doUndo();
    }
  }, [canUndo, clearSelection, doUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      clearSelection();
      doRedo();
    }
  }, [canRedo, clearSelection, doRedo])

  return {
    select,
    selectAll,
    move,
    resize,
    movePosition,
    append,
    remove,
    copy,
    paste,
    cut,
    undo,
    redo,
    canPaste,
    canUndo,
    canRedo,
    dirty,
  }
}
