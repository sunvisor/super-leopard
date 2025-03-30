/**
 * CirclePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box } from '@mui/material';
import { BorderData, CircleData, MAX_SCALE_VALUE, UnitValue } from '@sunvisor/super-leopard-core';
import translation from '@/translations/translation';
import NumberField from '../field/NumberField';
import FillColorField from '../field/FillColorField';
import BorderFields from '../fieldGroup/BorderFields';
import PositionFields from '../fieldGroup/PositionFields';
import { ChangeValueHandler } from '../usePropertyStates';
import GroupBox from '../fieldGroup/GroupBox';

export type CirclePanelValueType = number|string | BorderData | undefined;
type Props = {
  unit: UnitValue;
  values: CircleData;
  onChangeValue: ChangeValueHandler<CirclePanelValueType>;
}

export default function CirclePanel(props: Props) {
  const { unit, values, onChangeValue } = props;
  const t = translation().circleProperty;

  return (
    <>
      <PositionFields
        x={values.x}
        y={values.y}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <GroupBox>
        <Box sx={{ flex: 1, mr: 2 }}>
          <NumberField
            label={t.diameter}
            name="diameter"
            unit={unit}
            value={values.diameter}
            minValue={-MAX_SCALE_VALUE}
            maxValue={MAX_SCALE_VALUE}
            onChangeValue={onChangeValue}
          />
        </Box>
        <Box sx={{ flex: 1 }}/>
      </GroupBox>
      <FillColorField
        fillColor={values.fillColor}
        onChangeValue={onChangeValue}
      />
      <BorderFields
        border={values.border}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
