/**
 * SizeFields
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import NumberField from '../field/NumberField';
import { ChangeValueHandler } from '../usePropertyStates';
import getCaptions from '../../../captions/getCaptions';
import { UnitValue } from '@sunvisor/super-leopard-core';
import GroupBox from '../fieldGroup/GroupBox';
import { MAX_SCALE_VALUE } from '@sunvisor/super-leopard-core';

export type SizeFieldValueType = number;
type Props = {
  width?: number;
  height?: number;
  unit: UnitValue;
  onChangeValue: ChangeValueHandler<SizeFieldValueType>;
}

export default function SizeFields(props: Props) {
  const { width, height, unit, onChangeValue } = props;
  const captions = getCaptions().sizeProperty;

  return (
    <GroupBox sx={{ gap: 2 }}>
      <NumberField
        label={captions.width}
        name="width"
        unit={unit}
        value={width}
        minValue={0}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={onChangeValue}
      />
      <NumberField
        label={captions.height}
        name="height"
        unit={unit}
        value={height}
        minValue={0}
        maxValue={MAX_SCALE_VALUE}
        onChangeValue={onChangeValue}
      />
    </GroupBox>
  );
}
