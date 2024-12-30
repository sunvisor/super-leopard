/**
 * useKeyboard
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect } from 'react';

const isDelete = (event: KeyboardEvent) => {
  return event.key.toLowerCase() === 'delete' && modifierKey(event) === '';
}

const isCtrlC = (event: KeyboardEvent, isMac: boolean) => {
  const key = isMac ? 'M' : 'C';
  return event.key.toLowerCase() === 'c' && modifierKey(event) === key;
}

const isCtrlV = (event: KeyboardEvent, isMac: boolean) => {
  const key = isMac ? 'M' : 'C';
  return event.key.toLowerCase() === 'v' && modifierKey(event) === key;
}

const isCtrlX = (event: KeyboardEvent, isMac: boolean) => {
  const key = isMac ? 'M' : 'C';
  return event.key.toLowerCase() === 'x' && modifierKey(event) === key;
}

const isCtrlZ = (event: KeyboardEvent, isMac: boolean) => {
  const key = isMac ? 'M' : 'C';
  return event.key.toLowerCase() === 'z' && modifierKey(event) === key;
}

const isCtrlShiftZ = (event: KeyboardEvent, isMac: boolean) => {
  const key = isMac ? 'M' : 'C';
  return event.key.toLowerCase() === 'z' && modifierKey(event) === `S${key}`;
}

const modifierKey = (event: KeyboardEvent) =>
  (event.shiftKey ? 'S' : '') +
  (event.altKey ? 'A' : '') +
  (event.ctrlKey ? 'C' : '') +
  (event.metaKey ? 'M' : '');

type Listeners = {
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onRemove: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export default function useKeyboard(listeners: Listeners, isMac: boolean = false) {
  const { onCopy, onCut, onPaste, onRemove, onUndo, onRedo } = listeners;

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (isDelete(event)) onRemove();
    if (isCtrlC(event, isMac)) onCopy();
    if (isCtrlV(event, isMac)) onPaste();
    if (isCtrlX(event, isMac)) onCut();
    if (isCtrlZ(event, isMac)) onUndo();
    if (isCtrlShiftZ(event, isMac)) onRedo();
  }, [isMac, onCopy, onCut, onPaste, onRedo, onRemove, onUndo]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown]);
}
