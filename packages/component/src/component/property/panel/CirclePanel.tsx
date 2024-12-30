/**
 * CirclePanel
 *
 * Created by sunvisor on 2024/02/19.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionFields from '../fieldGroup/PositionFields';
import { Box } from '@mui/material';
import NumberField from '../field/NumberField';
import FillColorField from '../field/FillColorField';
import BorderFields from '../fieldGroup/BorderFields';
import { UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import getCaptions from '../../../captions/getCaptions';
import GroupBox from '../fieldGroup/GroupBox';
import { MAX_SCALE_VALUE, CirclePropertyValue  } from '@sunvisor/super-leopard-core';

export type CirclePanelValueType = number|string | boolean;
type Props = {
  unit: UnitValue;
  values: CirclePropertyValue;
  onChangeValue: ChangeValueHandler<CirclePanelValueType>;
}

export default function CirclePanel(props: Props) {
  const { unit, values, onChangeValue } = props;
  const captions = getCaptions('circleProperty');

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
            label={captions.diameter}
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
        useFillColor={values.useFillColor}
        fillColor={values.fillColor}
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
