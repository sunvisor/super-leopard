/**
 * useClipboard
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createShapes, serializeShapes, ShapeData, Shapes } from '@sunvisor/super-leopard-core';
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { ClipboardAtom } from '../../../atom/ClipboardAtom';

type OSClipboardData = {
  app: string;
  type: string;
  version: string;
  payload: ShapeData[];
}

async function writeToOSClipboard(shapes: Shapes) {
  const data = {
    app: 'super-leopard',
    type: 'shapes',
    version: '1.0',
    payload: serializeShapes(shapes),
  }

  navigator.clipboard.writeText(JSON.stringify(data))
    .catch(() => console.error('clipboard error'));
}

async function readFromOSClipboard(): Promise<Shapes | undefined> {
  const data = await navigator.clipboard.readText();
  return getShapesFromOSClipboard(data);
}

function getShapesFromOSClipboard(data: string): Shapes | undefined {
  try {
    const parsed: OSClipboardData = JSON.parse(data);
    if (parsed.app === 'super-leopard') {
      return createShapes(parsed.payload);
    }
  } catch (e) {
    return undefined;
  }
  return undefined;
}

export default function useClipboard() {
  const [shapes, setShapes] = useAtom(ClipboardAtom);

  const setToClipboard = useCallback(async (targets: Shapes) => {
    const items = targets.map(item => item);
    const newShapes = new Shapes(items);
    setShapes(newShapes);
    await writeToOSClipboard(newShapes);
  }, [setShapes])

  const getFromClipboard = useCallback(async () => {
    const clipboard = await readFromOSClipboard();
    if (clipboard) {
      return clipboard;
    }
    return shapes;
  }, [shapes]);

  const canPaste = useCallback(() => {
    return shapes.count > 0;
  }, [shapes]);

  return { setToClipboard, getFromClipboard, canPaste };
}
