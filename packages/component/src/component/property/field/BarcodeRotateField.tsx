/**
 * BarcodeRotateField
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ChangeValueHandler } from '../usePropertyStates';
import { SxProps, TextField } from '@mui/material';
import { BarcodeRotateType } from '@sunvisor/super-leopard-core';
import { ChangeEvent, useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  label: string;
  name: string;
  value: BarcodeRotateType;
  rotateTypeList: Record<string, string>;
  onChangeValue: ChangeValueHandler<BarcodeRotateType>;
  sx?: SxProps;
}

export default function BarcodeRotateField(props: Props) {
  const { label, name, value, rotateTypeList, onChangeValue, sx } = props;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChangeValue(name, value as BarcodeRotateType);
  }, [name, onChangeValue]);

  const handleBlur = useCallback(() => {
    onChangeValue(name, value, true);
  }, [name, onChangeValue, value])

  return (
    <TextField
      size="small"
      name={name}
      label={label}
      value={value}
      sx={sx}
      onChange={handleChange}
      onBlur={handleBlur}
      select
    >
      {
        Object.entries(rotateTypeList).map(([key, value]) => (
          <MenuItem
            key={key}
            value={key}
          >
            {value}
          </MenuItem>
        ))
      }
    </TextField>
  );
}
