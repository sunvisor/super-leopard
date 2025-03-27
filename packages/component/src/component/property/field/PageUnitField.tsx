/**
 * PageUnitField
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SxProps, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { UnitType } from '@sunvisor/super-leopard-core';
import { ChangeEvent, useCallback } from "react";
import translation from '@/translations/translation';
import { ChangeValueHandler } from '../usePropertyStates';

function getUnitList() {
  const t = translation().pageProperty;
  return Object.entries(UnitType).map(([, value]) => ({
    key: value,
    value: t[value as keyof typeof t],
  }))
}

type Props = {
  label: string;
  name: string;
  value: string;
  onChangeValue: ChangeValueHandler<string>;
  sx?: SxProps;
}

export default function PageUnitField(props: Props) {
  const { label, name, value, onChangeValue, sx } = props;
  const unitList = getUnitList();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChangeValue(name, value);
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
        unitList.map(item => (
          <MenuItem
            key={item.key}
            value={item.key}
          >
            {item.value}
          </MenuItem>
        ))
      }
    </TextField>
  );
}
