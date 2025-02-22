/**
 * CircleProperty
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  Circle, CircleData, createCircle, serializeCircle,
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
    () => serializeCircle(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: CircleData) => {
      const updated = createCircle(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<CircleData>(
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
