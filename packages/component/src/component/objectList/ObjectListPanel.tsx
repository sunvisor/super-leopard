/**
 * ObjectListPanel
 *
 * Created by sunvisor on 2024/03/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import { useAtomValue, useSetAtom } from 'jotai';
import { ReadShapesAtom } from '../../atom/ReportAtom';
import ObjectList from '../objectList/ObjectList';
import { SelectionAtom } from '../../atom/SelectionAtom';
import { Shape, Shapes } from '@sunvisor/super-leopard-core';

type Props = {
  showPropertyTab: () => void;
}

export default function ObjectListPanel({ showPropertyTab }: Props) {
  const shapes = useAtomValue(ReadShapesAtom);
  const setSelection = useSetAtom(SelectionAtom);

  const handleClick = useCallback((shape: Shape) => {
    setSelection(new Shapes([shape]))
  }, [setSelection])

  const handleSettingClick = useCallback((shape: Shape) => {
    setSelection(new Shapes([shape]));
    showPropertyTab();
  }, [setSelection, showPropertyTab]);

  return (
    <ObjectList shapes={shapes} onClick={handleClick} onSettingClick={handleSettingClick}/>
  );
}
