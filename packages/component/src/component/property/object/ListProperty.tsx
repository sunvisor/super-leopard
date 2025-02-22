/**
 * ListProperty
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import { createList, serializeList, List, ListData, UnitValue, DirectionType } from '@sunvisor/super-leopard-core';
import { UpdateHandler } from './ShapeProperty';
import usePropertyStates from '../usePropertyStates';
import SizeFields from '../fieldGroup/SizeFields';
import PropertyBox from './PropertyBox';
import ListFields from '../fieldGroup/ListFields';

type Props = {
  unit: UnitValue;
  shape: List;
  onUpdate: UpdateHandler;
}

export default function ListProperty(props: Props) {
  const { unit, shape, onUpdate } = props;
  const listProperty = useMemo(
    () => serializeList(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: ListData) => {
      const updated = createList(values);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<ListData>(
    listProperty,
    values => doUpdate(values)
  );

  useEffect(() => {
    setValues(listProperty);
  }, [listProperty, setValues]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <SizeFields
        width={values.width}
        height={values.height}
        unit={unit}
        onChangeValue={handleChangeValue}
      />
      <ListFields
        direction={values.direction ?? DirectionType.VERTICAL}
        rows={values.rows ?? 1}
        columns={values.columns ?? 1}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
