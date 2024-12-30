/**
 * PositionFields
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import NumberField from '../field/NumberField';
import getCaptions from '../../../captions/getCaptions';
import { ChangeValueHandler } from '../usePropertyStates';
import { UnitValue } from '@sunvisor/super-leopard-core';
import GroupBox from '../fieldGroup/GroupBox';
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
  const captions = getCaptions('positionProperty');

  return (
    <GroupBox sx={{ gap: 2 }}>
      <NumberField
        label={captions.x}
        name="x"
        unit={unit}
        value={x}
        minValue={-MAX_SCALE_VALUE}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={onChangeValue}
      />
      <NumberField
        label={captions.y}
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
