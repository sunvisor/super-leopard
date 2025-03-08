/**
 * PositionPairFields
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ChangeValueHandler } from '../usePropertyStates';
import { Box } from '@mui/material';
import NumberField from '../field/NumberField';
import translation from '../../../translations/translation';
import { UnitValue } from '@sunvisor/super-leopard-core';
import Caption from '../Caption';
import GroupBox from '../fieldGroup/GroupBox';
import { MAX_SCALE_VALUE } from '@sunvisor/super-leopard-core';

type Props = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  unit: UnitValue;
  onChangeValue: ChangeValueHandler<number>;
}


export default function PositionPairFields(props: Props) {
  const { x1, y1, x2, y2, unit, onChangeValue } = props;
  const t = translation().positionProperty;

  return (
    <>
      <GroupBox>
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', width: 45 }}>
          <Caption>
            {t.startPosition}
          </Caption>
        </Box>
        <NumberField
          sx={{ mr: 2 }}
          label={t.x}
          name="x1"
          unit={unit}
          value={x1}
          minValue={-MAX_SCALE_VALUE}
          maxValue={MAX_SCALE_VALUE}
          onChangeValue={onChangeValue}
        />
        <NumberField
          label={t.y}
          name="y1"
          unit={unit}
          value={y1}
          minValue={-MAX_SCALE_VALUE}
          maxValue={MAX_SCALE_VALUE}
          onChangeValue={onChangeValue}
        />
      </GroupBox>
      <GroupBox>
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', width: 45 }}>
          <Caption>
            {t.endPosition}
          </Caption>
        </Box>
        <NumberField
          sx={{ mr: 2 }}
          label={t.x}
          name="x2"
          unit={unit}
          value={x2}
          minValue={-MAX_SCALE_VALUE}
          maxValue={MAX_SCALE_VALUE}
          onChangeValue={onChangeValue}
        />
        <NumberField
          label={t.y}
          name="y2"
          unit={unit}
          value={y2}
          minValue={-MAX_SCALE_VALUE}
          maxValue={MAX_SCALE_VALUE}
          onChangeValue={onChangeValue}
        />
      </GroupBox>
    </>
  );
}
