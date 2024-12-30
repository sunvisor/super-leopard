/**
 * ColorPicker
 *
 * Created by sunvisor on 2024/02/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo, useState } from "react";
import { SxProps, TextField, TextFieldProps } from '@mui/material';
import getCaptions from '../../../captions/getCaptions';
import { ChangeValueHandler } from '../usePropertyStates';
import GroupBox from '../fieldGroup/GroupBox';

type Props = {
  name: string;
  textFieldProps?: TextFieldProps;
  colorFieldProps?: TextFieldProps;
  value: string;
  onChangeValue: ChangeValueHandler<string>;
  sx?: SxProps;
} & TextFieldProps

function isValidColor(color?: string) {
  return /#[0-9a-fA-F]{6}/.test(color ?? '');
}

export default function ColorPickerField(props: Props) {
  const {
    value,
    name,
    label, textFieldProps,
    colorFieldProps,
    onChangeValue,
  } = props;
  const captions = getCaptions('colorPickerField');
  const [color, setColor] = useState(value);

  const [error, message] = useMemo(
    () => isValidColor(color) ? [false, ''] : [true, captions.invalidColor],
    [captions.invalidColor, color]
  );

  const handleChangeColor = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value);
      onChangeValue(event.target.name, event.target.value, true);
    }, [onChangeValue]
  );

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setColor(value);
      if (isValidColor(value)) {
        onChangeValue(event.target.name, value);
      }
    }, [onChangeValue]
  );

  const handleBlur = useCallback(() => {
    onChangeValue(name, value, true);
  }, [name, onChangeValue, value]);

  return (
    <GroupBox sx={props.sx}>
      <TextField
        sx={{ width: 60, mr: 1 }}
        size="small"
        name={name}
        type="color"
        value={color}
        error={error}
        onChange={handleChangeColor}
        {...colorFieldProps}
      />
      <TextField
        sx={{ flex: 1 }}
        size="small"
        label={label}
        name={name}
        value={color}
        onChange={handleChangeText}
        onBlur={handleBlur}
        error={error}
        helperText={message}
        {...textFieldProps}
      />
    </GroupBox>
  );
}
