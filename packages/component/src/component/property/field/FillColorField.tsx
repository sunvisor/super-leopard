/**
 * FillColorFields
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Checkbox, FormControlLabel } from '@mui/material';
import ColorPickerField from '../field/ColorPickerField';
import React, { useCallback } from 'react';
import getCaptions from '../../../captions/getCaptions';
import { ChangeValueHandler } from '../usePropertyStates';
import Caption from '../Caption';
import GroupBox from '../fieldGroup/GroupBox';


type Props = {
  useFillColor: boolean;
  fillColor?: string;
  onChangeValue: ChangeValueHandler<boolean|string>;
}

export default function FillColorField(props: Props) {
  const {
    useFillColor,
    fillColor,
    onChangeValue,
  } = props;
  const captions = getCaptions('fillColorProperty');

  const handleCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeValue(e.target.name, e.target.checked, true);
    },
    [onChangeValue]
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
          {!useFillColor && captions.fillColor}
        </Caption>
      }/>
      {
        useFillColor && <ColorPickerField
          sx={{ flex: 1 }}
          label={captions.fillColor}
          name="fillColor"
          value={fillColor ?? '#ffffff'}
          onChangeValue={onChangeValue}
        />
      }
    </GroupBox>
  )
}
