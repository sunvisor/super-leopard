/**
 * ZOrderTool
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import PropertyBox from '../object/PropertyBox';
import ZOrderButtons, { ZOrderCommand } from '../field/ZOrderButtons';
import useShapes from '@/hooks/useShapes';
import useSelection from '@/hooks/useSelection';


export default function ZOrderTool() {
  const {selection} = useSelection();
  const target = selection.count > 0 ? selection.get(0) : undefined;
  const { shapes, setShapes } = useShapes();

  const bringTo = useCallback((command: ZOrderCommand) => {
      if (!target) return shapes;
      switch (command) {
        case 'bringToFront':
          return shapes.bringToFront(target);
        case 'bringToForward':
          return shapes.bringToForward(target);
        case 'sendToBack':
          return shapes.sendToBack(target);
        case 'sendToBackward':
          return shapes.sendToBackward(target);
      }
    }, [shapes]
  );

  const onBringTo = useCallback(
    (command: ZOrderCommand) => {
      const newShapes = bringTo(command);
      setShapes(newShapes);
    }, [bringTo, setShapes]
  );

  return (
    <PropertyBox>
      <ZOrderButtons
        onBringTo={onBringTo}
      />
    </PropertyBox>
  );
}
