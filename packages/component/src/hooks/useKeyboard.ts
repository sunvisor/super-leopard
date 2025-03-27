/**
 * useKeyboard
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect } from 'react';

type Listeners = {
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onRemove: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSelectAll: () => void;
};

const getModifierKey = (event: KeyboardEvent): string =>
  ['shift', 'alt', 'ctrl', 'meta']
    .map((key) => (event[`${key}Key` as keyof KeyboardEvent] ? key[0].toUpperCase() : ''))
    .join('');

const isKeyCombo = (event: KeyboardEvent, key: string, modifiers: string): boolean =>
  event.key.toLowerCase() === key && getModifierKey(event) === modifiers;

export default function useKeyboard(listeners: Listeners, isMac = false) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement)?.tagName;
      const isEditable =
        tag === 'INPUT' || tag === 'TEXTAREA' || (event.target as HTMLElement).isContentEditable;
      if (isEditable) return;

      const mod = isMac ? 'M' : 'C';
      const keyMap: [boolean, () => void][] = [
        [isKeyCombo(event, 'delete', ''), listeners.onRemove],
        [isKeyCombo(event, 'c', mod), listeners.onCopy],
        [isKeyCombo(event, 'v', mod), listeners.onPaste],
        [isKeyCombo(event, 'x', mod), listeners.onCut],
        [isKeyCombo(event, 'z', mod), listeners.onUndo],
        [isKeyCombo(event, 'z', 'S' + mod), listeners.onRedo],
        [isKeyCombo(event, 'a', mod), listeners.onSelectAll],
      ];

      for (const [condition, handler] of keyMap) {
        if (condition) {
          event.preventDefault();
          handler();
          break;
        }
      }
    },
    [listeners, isMac]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
}
