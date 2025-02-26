/**
 * GroupFields
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box } from '@mui/material';
import DirectionButtons from '../field/DirectionButtons';
import { DirectionValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import NumberField from '../field/NumberField';
import getCaptions from '../../../captions/getCaptions';
import Caption from '../Caption';
import GroupBox from '../fieldGroup/GroupBox';
import { SizeFieldValueType } from './SizeFields';

const MAX_REPEAT_COUNT = 1000;

export type GroupFieldsValueType = DirectionValue|number;
type Props = {
  direction: DirectionValue;
  repeatCount: number;
  onChangeValue: ChangeValueHandler<GroupFieldsValueType|SizeFieldValueType>;
}

export default function GroupFields(props: Props) {
  const { direction, repeatCount, onChangeValue } = props;
  const captions = getCaptions().groupProperty;
  return (
    <GroupBox sx={{ gap: 2 }}>
      <GroupBox sx={{ flex: 1, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Caption>{captions.direction}</Caption>
        </Box>
        <DirectionButtons
          name="direction"
          value={direction}
          onChangeValue={onChangeValue}
        />
      </GroupBox>
      <Box sx={{ flex: 1 }}>
        <NumberField
          label={captions.repeatCount}
          name="repeatCount"
          value={repeatCount}
          minValue={1}
          maxValue={MAX_REPEAT_COUNT}
          decimalPlace={0}
          unit={captions.times}
          onChangeValue={onChangeValue}
        />
      </Box>
    </GroupBox>
  );
}
