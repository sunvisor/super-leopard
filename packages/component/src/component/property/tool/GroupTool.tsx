/**
 * GroupTool
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import PropertyBox from '../object/PropertyBox';
import { Button, ButtonGroup } from '@mui/material';
import getCaptions from '../../../captions/getCaptions';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import useShapes from '../../reportEditor/hooks/useShapes';
import {
  Field, Group, grouping, List, listToShapes,
  Shapes, shapesToList, ungrouping
} from '@sunvisor/super-leopard-core';
import { useAtom, useSetAtom } from 'jotai/index';
import { ReportHasListAtom, SetShapesAtom } from '../../../atom/ReportAtom';
import GroupBox from '../fieldGroup/GroupBox';
import { useAtomValue } from 'jotai';

export default function GroupTool() {
  const { shapes } = useShapes();
  const setShapes = useSetAtom(SetShapesAtom);
  const [selection, setSelection] = useAtom(SelectionAtom);
  const reportHasList = useAtomValue(ReportHasListAtom);
  const captions = getCaptions().groupOperation;

  const handleGroup = useCallback(() => {
    const { shapes: newShapes, group } = grouping(shapes, selection);
    setShapes(newShapes);
    setSelection(new Shapes([group]));
  }, [selection, setSelection, setShapes, shapes]);

  const handleUngroup = useCallback(() => {
    if (selection.count === 1 && selection.get(0) instanceof Group) {
      const { shapes: newShapes, items } = ungrouping(shapes, selection.get(0) as Group);
      setShapes(newShapes);
      setSelection(new Shapes(items));
    }
  }, [selection, setSelection, setShapes, shapes]);

  const handleShapesToList = useCallback(() => {
    const { shapes: newShapes, list } = shapesToList(shapes, selection);
    setShapes(newShapes);
    setSelection(new Shapes([list]));
  }, [selection, setSelection, setShapes, shapes]);

  const handleListToShapes = useCallback(() => {
    if (selection.count === 1 && selection.get(0) instanceof List) {
      const { shapes: newShapes, items } = listToShapes(shapes, selection.get(0) as List);
      setShapes(newShapes);
      setSelection(new Shapes(items));
    }

  }, [selection, setSelection, setShapes, shapes]);

  const canUngroup = () => selection.count === 1 && selection.get(0) instanceof Group;

  const canGroup = () => {
    return !selection.some(item => item instanceof List);
  }

  const canUnList = () => selection.count === 1 && selection.get(0) instanceof List;

  const canList = () => {
    if (reportHasList) return false;
    return selection.some(item => item instanceof Field);
  }


  return (
    <PropertyBox>
      <GroupBox sx={{ gap: 1 }}>
        <ButtonGroup variant="outlined">
          <Button size="small" onClick={handleGroup} disabled={!canGroup()}>
            {captions.group}
          </Button>
          <Button
            size="small" onClick={handleUngroup}
            disabled={!canUngroup()}
          >
            {captions.ungroup}
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button
            size="small" onClick={handleShapesToList}
            disabled={!canList()}
          >
            {captions.shapesToList}
          </Button>
          <Button
            size="small" onClick={handleListToShapes}
            disabled={!canUnList()}
          >
            {captions.listToShapes}
          </Button>
        </ButtonGroup>
      </GroupBox>
    </PropertyBox>
  );
}
