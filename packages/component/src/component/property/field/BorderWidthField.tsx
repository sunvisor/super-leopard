/**
 * BorderWidthField
 *
 * Created by sunvisor on 2024/02/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  Autocomplete,
  Box,
  InputAdornment,
  SxProps,
  TextField,
} from '@mui/material';
import React, { SyntheticEvent, useCallback } from 'react';
import { ChangeValueHandler } from '../usePropertyStates';
import useValidateNumber from './useValidateNumber';

const options = [
  '0.25', '0.5', ' 1', ' 1.5', '2', '3', '4', '5', '6', '7', '8', '9', '10'
]

type Props = {
  label: string;
  name: string;
  value: string;
  sx?: SxProps;
  onChangeValue: ChangeValueHandler<string>;
}

export default function BorderWidthField(props: Props) {
  const {
    label, name, value, onChangeValue
  } = props;

  const { error, message, validate } = useValidateNumber({
    minValue: 0, maxValue: 72
  });

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === null) return;
    if (!validate(value)) return;
    onChangeValue(name, value);
  }, [validate, onChangeValue, name])

  const handleChange = useCallback((_: SyntheticEvent<Element, Event>, value: string | null,) => {
    if (value === null) return;
    if (!validate(value)) return;
    onChangeValue(name, value, true);
  }, [name, onChangeValue, validate]);

  const handleBlur = useCallback(() => {
    if (error) return;
    onChangeValue(name, value, true);
  }, [name, onChangeValue, value, error]);

  return (
    (<Autocomplete
      size="small"
      sx={props.sx}
      options={options}
      value={value.toString()}
      freeSolo
      onChange={handleChange}
      onBlur={handleBlur}
      renderOption={(props, option) => {
        const width = Number(option);
        const lineWidth = width / 72 * 96;
        const y = 7;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {key, ...liProps} = props;
        return (
          <li key={width} {...liProps}>
            <Box sx={{ flexGrow: 1 }}>
              {width} pt
            </Box>
            <Box sx={{ width: 100 }}>
              <svg viewBox="0 0 100 14">
                <line x1="0" y1={y} x2="100" y2={y} stroke="black" strokeWidth={lineWidth}></line>
              </svg>
            </Box>
          </li>
        );
      }}
      renderInput={
        (params) => {
          return (
            (<TextField
              {...params}
              label={label}
              name={name}
              size="small"
              onChange={handleTextChange}
              error={error}
              helperText={message}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <InputAdornment position="end"><Box>pt</Box></InputAdornment>
                      {params.InputProps.endAdornment}
                    </>
                  )
                }
              }}
            />)
          );
        }
      }
    />)
  );

}
