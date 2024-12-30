/**
 * LineProperty
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useMemo } from "react";
import {
  Line, UnitValue, expandLine, LinePropertyValue, contractLine
} from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import PropertyBox from './PropertyBox';
import LinePanel from '../panel/LinePanel';
import { UpdateHandler } from './ShapeProperty';

type Props = {
  unit: UnitValue;
  shape: Line;
  onUpdate: UpdateHandler;
}

export default function LineProperty(props: Props) {
  const { unit, shape, onUpdate } = props;
  const lineProperty = useMemo(
    () => expandLine(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: LinePropertyValue) => {
      const updated = contractLine(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, handleChangeValue } = usePropertyStates<LinePropertyValue>(
    lineProperty,
    values => doUpdate(values)
  );

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <LinePanel
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
