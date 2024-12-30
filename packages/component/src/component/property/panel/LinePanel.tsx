/**
 * LinePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionPairFields from '../fieldGroup/PositionPairFields';
import BorderFields, { BorderFieldType } from '../fieldGroup/BorderFields';
import { LinePropertyValue, UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';

export type LinePanelValueType = number|BorderFieldType;
type Props = {
  unit: UnitValue;
  values: LinePropertyValue;
  onChangeValue: ChangeValueHandler<LinePanelValueType>;
}

export default function LinePanel(props: Props) {
  const { unit, values, onChangeValue } = props;

  return (
    <>
      <PositionPairFields
        x1={values.x1}
        y1={values.y1}
        x2={values.x2}
        y2={values.y2}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <BorderFields
        useStroke={values.useStroke}
        borderColor={values.borderColor}
        borderWidth={values.borderWidth}
        borderStyle={values.borderStyle}
        borderCap={values.borderCap}
        borderJoin={values.borderJoin}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
