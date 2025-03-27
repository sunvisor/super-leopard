/**
 * PositionFields
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import NumberField from '../field/NumberField';
import translation from '@/translations/translation';
import { ChangeValueHandler } from '../usePropertyStates';
import { UnitValue } from '@sunvisor/super-leopard-core';
import GroupBox from './GroupBox';
import { MAX_SCALE_VALUE } from '@sunvisor/super-leopard-core';

export type PositionFieldValue = number;
type Props = {
  x: number;
  y: number;
  unit: UnitValue;
  onChangeValue: ChangeValueHandler<PositionFieldValue>;
};

export default function PositionFields(props: Props) {
  const { x, y, unit, onChangeValue } = props;
  const t = translation().positionProperty;

  return (
    <GroupBox sx={{ gap: 2 }}>
      <NumberField
        label={t.x}
        name="x"
        unit={unit}
        value={x}
        minValue={-MAX_SCALE_VALUE}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={onChangeValue}
      />
      <NumberField
        label={t.y}
        name="y"
        unit={unit}
        value={y}
        minValue={-MAX_SCALE_VALUE}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={onChangeValue}
      />
    </GroupBox>
  );
}
