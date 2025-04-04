/**
 * FillColorFields
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Checkbox, FormControlLabel } from '@mui/material';
import ColorPickerField from './ColorPickerField';
import React, { useCallback } from 'react';
import translation from '@/translations/translation';
import { ChangeValueHandler } from '../usePropertyStates';
import Caption from '../Caption';
import GroupBox from '../fieldGroup/GroupBox';


type Props = {
  fillColor?: string;
  onChangeValue: ChangeValueHandler<string | undefined>;
}

export default function FillColorField(props: Props) {
  const {
    onChangeValue,
  } = props;
  const t = translation().fillColorProperty;
  const [fillColor, setFillColor] = React.useState(props.fillColor);
  const [useFillColor, setUseFillColor] = React.useState(fillColor !== undefined);

  const handleCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUseFillColor(e.target.checked);
      const color = e.target.checked ? '#ffffff' : undefined;
      setFillColor(color);
      onChangeValue('fillColor', color, true);
    },
    [onChangeValue, setUseFillColor, setFillColor]
  );

  return (
    <GroupBox>
      <FormControlLabel control={
        <Checkbox
          name="useFillColor"
          checked={useFillColor}
          onChange={handleCheckChange}
        />
      } label={
        <Caption>
          {!fillColor && t.fillColor}
        </Caption>
      }/>
      {
        fillColor && <ColorPickerField
          sx={{ flex: 1 }}
          label={t.fillColor}
          name="fillColor"
          value={fillColor ?? '#ffffff'}
          onChangeValue={onChangeValue}
        />
      }
    </GroupBox>
  )
}
