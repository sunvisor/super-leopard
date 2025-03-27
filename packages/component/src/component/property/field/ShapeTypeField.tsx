/**
 * ShapeTypeField
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SxProps, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, useCallback } from "react";
import translation from '@/translations/translation';
import { ChangeValueHandler } from '../usePropertyStates';

type Props = {
  label: string;
  name: string;
  value: string;
  onChangeValue: ChangeValueHandler<string>;
  sx?: SxProps;
}

export default function ShapeTypeField(props: Props) {
  const { label, name, value, onChangeValue, sx } = props;
  const t = translation().staticShapeType;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(name, event.target.value);
  }, [name, onChangeValue]);

  return (
    <TextField
      size="small"
      name={name}
      label={label}
      value={value}
      sx={sx}
      onChange={handleChange}
      select
    >
      {
        Object.entries(t).map(([key, value]) => (
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
