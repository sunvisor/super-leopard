/**
 * BarcodeFormatField
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ChangeValueHandler } from '../usePropertyStates';
import { Box, InputLabel, Select, SelectChangeEvent, SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';
import { barcodeDescriptions } from '@sunvisor/super-leopard-core';


type Props = {
  label: string;
  name: string;
  value: string;
  sx?: SxProps;
  onChangeValue: ChangeValueHandler<string>;
}

function getFormats() {
  const result = [];
  for (const format in barcodeDescriptions) {
    result.push({ format, caption: barcodeDescriptions[format] });
  }
  return result;
}

export default function BarcodeFormatField(props: Props) {
  const { label, name, value, onChangeValue } = props;
  const formats = getFormats();

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
        onChange={handleChange}
      >
        {
          formats.map(item => (
            <MenuItem key={item.format} value={item.format}>
              <Box sx={{ width: 100 }}>
                {item.caption}
              </Box>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
