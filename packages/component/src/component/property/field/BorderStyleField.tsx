/**
 * BorderStyle
 *
 * Created by sunvisor on 2024/02/14.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { JSX, useCallback } from "react";
import { Box, InputLabel, Select, SxProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { StyleValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';


const options: StyleValue[] = [
  'solid', 'dashed', 'dotted',
];

const Strokes: Record<StyleValue, JSX.Element> = {
  solid: (
    <svg viewBox="0 0 100 14">
      <line x1="0" y1="7.5" x2="100" y2="7.5" stroke="black" strokeWidth="1"/>
    </svg>
  ),
  dashed: (
    <svg viewBox="0 0 100 14">
      <line x1="0" y1="7.5" x2="100" y2="7.5" stroke="black" strokeWidth="1" strokeDasharray="4"/>
    </svg>
  ),
  dotted: (
    <svg viewBox="0 0 100 14">
      <line x1="0" y1="7.5" x2="100" y2="7.5" stroke="black" strokeWidth="1" strokeDasharray="1 2"/>
    </svg>
  ),
}

type Props = {
  label: string;
  sx?: SxProps;
  name: string;
  value: StyleValue;
  onChangeValue: ChangeValueHandler<StyleValue>;
}

export default function BorderStyleField(props: Props) {
  const {
    label, name, value, onChangeValue
  } = props;


  const handleChange = useCallback((event: SelectChangeEvent) => {
    onChangeValue(name, event.target.value, true);
  }, [name, onChangeValue]);

  return (
    <FormControl sx={{ minWidth: 150, ...props.sx }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        size="small"
        name={name}
        label={label}
        value={value}
        renderValue={item => (
          <Box sx={{ width: 100 }}>
            {Strokes[item]}
          </Box>
        )}
        onChange={handleChange}
      >
        {
          options.map(option => (
            <MenuItem key={option} value={option}>
              <Box sx={{ width: 100 }}>
                {Strokes[option]}
              </Box>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
