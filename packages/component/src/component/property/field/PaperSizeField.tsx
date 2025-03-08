/**
 * PaperSizeField
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SxProps, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { PaperSize } from '@sunvisor/super-leopard-core';
import { ChangeEvent, useCallback } from "react";
import translation from '../../../translations/translation';
import { ChangeValueHandler } from '../usePropertyStates';

type Props = {
  label: string;
  name: string;
  value: string;
  onChangeValue: ChangeValueHandler<string>;
  sx?: SxProps;
}

function getPaperSizeList(customCaption: string) {
  const paperSizeList: {value: string, caption: string}[] = [];
  for (const key in PaperSize) {
    const v = PaperSize[key as keyof typeof PaperSize];
    paperSizeList.push({
      value: v,
      caption: key,
    });
  }
  paperSizeList.push({value: 'custom', caption: customCaption});
  return paperSizeList;
}

export default function PaperSizeField(props: Props) {
  const { label, name, value, onChangeValue, sx } = props;
  const t = translation().pageProperty;
  const paperSizeList = getPaperSizeList(t.custom);

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
        paperSizeList.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            {item.caption}
          </MenuItem>
        ))
      }
    </TextField>
  );
}
