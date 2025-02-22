/**
 * EllipseProperty
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  createEllipse,
  Ellipse, EllipseData,
  serializeEllipse,
  UnitValue
} from '@sunvisor/super-leopard-core';
import { useCallback, useEffect, useMemo } from "react";
import PropertyBox from './PropertyBox';
import { UpdateHandler } from './ShapeProperty';
import EllipsePanel from '../panel/EllipsePanel';
import usePropertyStates from '../usePropertyStates';

type Props = {
  unit: UnitValue,
  shape: Ellipse;
  onUpdate: UpdateHandler;
}

export default function EllipseProperty(props: Props) {
  const { unit, shape, onUpdate } = props;
  const ellipseProperty = useMemo(
    () => serializeEllipse(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: EllipseData) => {
      const updated = createEllipse(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<EllipseData>(
    ellipseProperty,
    values => doUpdate(values),
  );

  useEffect(() => {
    setValues(ellipseProperty);
  }, [ellipseProperty, setValues]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <EllipsePanel
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
