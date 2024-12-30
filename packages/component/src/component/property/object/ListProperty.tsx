/**
 * ListProperty
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import { contractList, expandList, List, ListPropertyValue, UnitValue } from '@sunvisor/super-leopard-core';
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
    () => expandList(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: ListPropertyValue) => {
      const updated = contractList(values, shape.shapes);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<ListPropertyValue>(
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
        direction={values.direction}
        rows={values.rows}
        columns={values.columns}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
