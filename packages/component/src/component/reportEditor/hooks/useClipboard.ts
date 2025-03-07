/**
 * useClipboard
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Shapes } from '@sunvisor/super-leopard-core';
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { ClipboardAtom } from '../../../atom/ClipboardAtom';

export default function useClipboard() {
  const [shapes, setShapes] = useAtom(ClipboardAtom);

  const setToClipboard = useCallback((targets: Shapes) => {
    const items = targets.map(item => item);
    const newShapes = new Shapes(items);
    setShapes(newShapes);
  }, [setShapes])

  const getFromClipboard = useCallback(() => {
    return shapes;
  }, [shapes])

  const canPaste = useCallback(() => {
    return shapes.count > 0;
  }, [shapes]);

  return { setToClipboard, getFromClipboard, canPaste };
}
