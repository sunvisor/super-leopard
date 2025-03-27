/**
 * ListFields
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DirectionValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import translation from '@/translations/translation';
import { Box } from '@mui/material';
import Caption from '../Caption';
import DirectionButtons from '../field/DirectionButtons';
import NumberField from '../field/NumberField';
import GroupBox from './GroupBox';

const MAX_ROWS = 1000;
const MAX_COLUMNS = 1000;

export type ListFieldValueType = DirectionValue|number;
type Props = {
  direction: DirectionValue;
  rows: number;
  columns: number;
  onChangeValue: ChangeValueHandler<ListFieldValueType>;
}

export default function ListFields(props: Props) {
  const { direction, rows, columns, onChangeValue } = props;
  const t = translation().listProperty;

  return (
    <GroupBox sx={{ gap: 2 }}>
      <GroupBox sx={{ flex: 10, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Caption>{t.direction}</Caption>
        </Box>
        <DirectionButtons
          name="direction"
          value={direction}
          onChangeValue={onChangeValue}
        />
      </GroupBox>
      <Box sx={{ flex: 9 }}>
        <NumberField
          label={t.columns}
          name="columns"
          value={columns}
          minValue={1}
          maxValue={MAX_COLUMNS}
          decimalPlace={0}
          onChangeValue={onChangeValue}
        />
      </Box>
      <Box sx={{ flex: 9 }}>
        <NumberField
          label={t.rows}
          name="rows"
          value={rows}
          minValue={1}
          maxValue={MAX_ROWS}
          decimalPlace={0}
          onChangeValue={onChangeValue}
        />
      </Box>
    </GroupBox>
  );
}
