/**
 * LinePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionPairFields from '../fieldGroup/PositionPairFields';
import BorderFields from '../fieldGroup/BorderFields';
import { BorderData, LineData, UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';

export type LinePanelValueType = number | BorderData | undefined;
type Props = {
  unit: UnitValue;
  values: LineData;
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
        border={values.border}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
