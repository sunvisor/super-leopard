/**
 * useEventHandler
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from 'react';
import { Atom, useAtomValue, useSetAtom, WritableAtom } from 'jotai';
import { Box, createShapesSelector, Line, Position, PositionPair, Shape, Shapes } from '@sunvisor/super-leopard-core';
import useShapes from './useShapes';
import useClipboard from './useClipboard';
import { CanRedoAtom, CanUndoAtom, RedoHistoryAtom, UndoHistoryAtom } from '../../../atom/HistoryAtom';
import { getSettings } from '../../../settings';
import useScale from '../../../hooks/useScale';
import useSelection from '../../../hooks/useSelection';

const PASTE_OFFSET = 20; // pixel

type Props = {
  readAtom?: Atom<Shapes>,
  setAtom?: WritableAtom<null, [shapes: Shapes], void>,
}

export default function useEventHandler(props: Props = {}) {
  const {
    shapes, removeShapes, addShape, updateShapes
  } = useShapes(props);
  const { selection, setSelection, clearSelection } = useSelection();
  const settings = getSettings();
  const { setToClipboard, getFromClipboard, canPaste } = useClipboard();
  const canUndo = useAtomValue(CanUndoAtom);
  const canRedo = useAtomValue(CanRedoAtom);
  const undo = useSetAtom(UndoHistoryAtom);
  const redo = useSetAtom(RedoHistoryAtom);
  const { scale } = useScale();

  const onSelect = useCallback((area: Box | Position) => {
      const selector = createShapesSelector(scale, settings.lineSelect);
      if ('width' in area) {
        setSelection(selector.selectByBox(area as Box, shapes));
      } else {
        setSelection(selector.selectByPosition(area, shapes));
      }
    },
    [scale, settings, setSelection, shapes]
  );

  const onMove = useCallback((pos: Position) => {
    pos = scale.fromPixel(pos);
    const newSelection = selection.moveTo(pos)
    updateShapes(selection, newSelection);
    setSelection(newSelection);
  }, [scale, selection, setSelection, updateShapes]);

  const onResize = useCallback((box: Box) => {
    box = scale.fromPixel(box);
    const newSelection = selection.resize(box)
    updateShapes(selection, newSelection);
    setSelection(newSelection);
  }, [scale, selection, setSelection, updateShapes]);

  const onMovePosition = useCallback((positions: PositionPair) => {
    positions = scale.fromPixel(positions);
    const line = selection.get(0) as Line;
    const newLine = line.setPositions(positions);
    const newSelection = new Shapes([newLine]);
    updateShapes(selection, newSelection);
    setSelection(newSelection);
  }, [scale, selection, setSelection, updateShapes])

  const onAppend = useCallback((shape: Shape) => {
    addShape(shape);
  }, [addShape]);

  const onRemove = useCallback(() => {
    removeShapes(selection);
    clearSelection();
  }, [clearSelection, removeShapes, selection]);

  const onCopy = useCallback(() => {
    setToClipboard(selection);
  }, [selection, setToClipboard]);

  const onPaste = useCallback(() => {
    const clipboard = getFromClipboard();
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

  const onCut = useCallback(() => {
    onCopy();
    onRemove();
  }, [onCopy, onRemove]);

  const onUndo = useCallback(() => {
    if (canUndo) {
      clearSelection();
      undo();
    }
  }, [canUndo, clearSelection, undo]);

  const onRedo = useCallback(() => {
    if (canRedo) {
      clearSelection();
      redo();
    }
  }, [canRedo, clearSelection, redo])

  return {
    onSelect,
    onMove,
    onResize,
    onMovePosition,
    onAppend,
    onRemove,
    onCopy,
    onPaste,
    onCut,
    onUndo,
    onRedo,
    canPaste,
  }
}
