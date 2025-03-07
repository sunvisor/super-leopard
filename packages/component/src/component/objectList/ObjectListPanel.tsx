/**
 * ObjectListPanel
 *
 * Created by sunvisor on 2024/03/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import ObjectList from '../objectList/ObjectList';
import { Shape, Shapes } from '@sunvisor/super-leopard-core';
import useShapes from '../reportEditor/hooks/useShapes';
import useSelection from '../../hooks/useSelection';


type Props = {
  showPropertyTab: () => void;
}

export default function ObjectListPanel({ showPropertyTab }: Props) {
  const { shapes } = useShapes()
  const { setSelection } = useSelection();

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
