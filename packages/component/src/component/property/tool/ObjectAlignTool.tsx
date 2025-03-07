/**
 * ObjectAlignTool
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import useShapes from '../../reportEditor/hooks/useShapes';
import PropertyBox from '../object/PropertyBox';
import ObjectsAlignButtons, { ObjectAlignCommand } from '../field/ObjectsAlignButtons';
import useSelection from '../../../hooks/useSelection';


export default function ObjectAlignTool() {
  const {selection, setSelection} = useSelection();
  const { updateShapes } = useShapes();

  const align = useCallback(
    (command: ObjectAlignCommand) => {
      switch (command) {
        case 'left':
          return selection.alignToLeft();
        case 'center':
          return selection.alignToCenter();
        case 'right':
          return selection.alignToRight();
        case 'top':
          return selection.alignToTop();
        case 'middle':
          return selection.alignToMiddle();
        case 'bottom':
          return selection.alignToBottom();
        case 'distributeHorizontally':
          return selection.distributeHorizontally();
        case 'distributeVertically':
          return selection.distributeVertically();
      }
    }, [selection]
  );

  const handleClick = useCallback(
    (command: ObjectAlignCommand) => {
      const newShapes = align(command);
      updateShapes(selection, newShapes);
      setSelection(newShapes);
    }, [align, selection, setSelection, updateShapes]
  )

  return (
    <PropertyBox>
      <ObjectsAlignButtons onClick={handleClick}/>
    </PropertyBox>
  );
}
