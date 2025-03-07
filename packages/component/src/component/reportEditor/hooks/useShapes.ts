/**
 * useReport
 *
 * Created by sunvisor on 2024/02/07.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Atom, useAtomValue, useSetAtom, WritableAtom } from 'jotai';
import { useCallback } from 'react';
import { Shape, Shapes } from '@sunvisor/super-leopard-core';
import { ReadShapesAtom, SetShapesAtom } from '../../../atom/ReportAtom';

type Props = {
  readAtom?: Atom<Shapes>,
  setAtom?: WritableAtom<null, [shapes: Shapes], void>,
}

export default function useShapes(props: Props = {}) {
  const { readAtom, setAtom } = props;
  const shapes = useAtomValue(readAtom ?? ReadShapesAtom);
  const setShapes = useSetAtom(setAtom ?? SetShapesAtom);

  const addShape = useCallback((shape: Shape | Shapes) => {
    const newShapes = shapes.add(shape);
    setShapes(newShapes)  ;
  }, [setShapes, shapes]);

  const updateShapes = useCallback((targets: Shapes, updated: Shapes) => {
    const newShapes = shapes.update(targets, updated);
    setShapes(newShapes);
  }, [setShapes, shapes]);

  const removeShapes = useCallback((targets: Shapes) => {
    const newShapes = shapes.remove(targets);
    setShapes(newShapes);
  }, [setShapes, shapes]);

  return {
    shapes,
    setShapes,
    addShape,
    updateShapes,
    removeShapes,
  }
}
