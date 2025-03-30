/**
 * TransformPanel
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect } from "react";
import PropertyBox from '../object/PropertyBox';
import PositionFields from '../fieldGroup/PositionFields';
import SizeFields from '../fieldGroup/SizeFields';
import { Box, UnitValue } from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';

type Props = {
  unit: UnitValue;
  box: Box;
  onUpdate: (values: Box) => void;
}
export default function TransformPanel(props: Props) {
  const { unit, box , onUpdate } = props;

  const handleUpdate = useCallback(
    (values: Box) => {
      onUpdate(values);
    }, [onUpdate]
  );

  const { values, handleChangeValue, setValues } = usePropertyStates<Box>(
    box,
    values => handleUpdate(values)
  );

  useEffect(() => {
    setValues(box);
  }, [box]);

  return (
    <PropertyBox
      onSubmit={() => handleUpdate(values)}
    >
      <PositionFields
        x={values.x}
        y={values.y}
        unit={unit}
        onChangeValue={handleChangeValue}
      />
      <SizeFields
        width={values.width}
        height={values.height}
        unit={unit}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
