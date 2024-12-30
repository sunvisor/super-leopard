/**
 * GroupProperty
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo } from "react";
import PropertyBox from './PropertyBox';
import { UpdateHandler } from './ShapeProperty';
import { expandGroup, GroupPropertyValue, contractGroup, Group, UnitValue } from '@sunvisor/super-leopard-core';
import usePropertyStates from '../usePropertyStates';
import SizeFields from '../fieldGroup/SizeFields';
import GroupFields from '../fieldGroup/GroupFields';


type Props = {
  unit: UnitValue;
  shape: Group;
  onUpdate: UpdateHandler;
}
export default function GroupProperty(props: Props) {
  const { unit, shape, onUpdate } = props;
  const groupProperty = useMemo(
    () => expandGroup(shape), [shape]
  );

  const doUpdate = useCallback(
    (values: GroupPropertyValue) => {
      const updated = contractGroup(values, shape.shapes);
      onUpdate(shape, updated);
    },
    [shape, onUpdate]
  );

  const { values, setValues, handleChangeValue } = usePropertyStates<GroupPropertyValue>(
    groupProperty,
    values => doUpdate(values),
  );

  useEffect(() => {
    setValues(groupProperty);
  }, [groupProperty, setValues]);

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
      <GroupFields
        direction={values.direction}
        repeatCount={values.repeatCount}
        onChangeValue={handleChangeValue}
      />
    </PropertyBox>
  );
}
