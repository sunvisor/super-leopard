/**
 * CircleProperty
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  Circle,
  CirclePropertyValue,
  contractCircle,
  expandCircle,
  UnitValue
} from '@sunvisor/super-leopard-core';
import { useCallback, useEffect, useMemo } from "react";
import PropertyBox from './PropertyBox';
import { UpdateHandler } from './ShapeProperty';
import CirclePanel from '../panel/CirclePanel';
import usePropertyStates from '../usePropertyStates';

type Props = {
  unit: UnitValue;
  shape: Circle;
  onUpdate: UpdateHandler;
}

export default function CircleProperty(props: Props) {
  const { unit, onUpdate, shape } = props;
  const circleProperty = useMemo(
    () => expandCircle(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: CirclePropertyValue) => {
      const updated = contractCircle(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<CirclePropertyValue>(
    circleProperty,
    values => doUpdate(values)
  );

  useEffect(() => {
    setValues(circleProperty);
  }, [circleProperty, setValues]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <CirclePanel
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
