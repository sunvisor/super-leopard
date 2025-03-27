/**
 * TransformProperty
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useMemo } from "react";
import { Box, UnitValue } from '@sunvisor/super-leopard-core';
import useShapes from '@/hooks/useShapes';
import useSelection from '@/hooks/useSelection';
import TransformPanel from '../panel/TransformPanel';

type Props = {
  unit: UnitValue;
}

export default function TransformProperty(props: Props) {
  const { unit } = props;
  const { selection, setSelection } = useSelection();
  const { updateShapes } = useShapes();
  const box = useMemo(() => selection.bbox, [selection.bbox]);

  const handleUpdate = useCallback(
    (values: Box) => {
      const newShapes = selection.resize(values);
      updateShapes(selection, newShapes);
      setSelection(newShapes);
    }, [selection, setSelection, updateShapes]
  );

  return (
    <TransformPanel
      unit={unit}
      box={box}
      onUpdate={handleUpdate}
    />
  );
}
