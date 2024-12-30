/**
 * RectProperty
 *
 * Created by sunvisor on 2024/02/11.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import { contractRect, expandRect, Rect, RectPropertyValue, UnitValue } from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import PropertyBox from './PropertyBox';
import RectPanel from '../panel/RectPanel';
import { UpdateHandler } from './ShapeProperty';

type Props = {
  unit: UnitValue,
  shape: Rect;
  onUpdate: UpdateHandler;
}

export default function RectProperty(props: Props) {
  const { unit, shape, onUpdate } = props;
  const rectProperty = useMemo(
    () => expandRect(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: RectPropertyValue) => {
      const updated = contractRect(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<RectPropertyValue>(
    rectProperty,
    values => doUpdate(values)
  );

  useEffect(() => {
    setValues(rectProperty);
  }, [rectProperty, setValues]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <RectPanel
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
