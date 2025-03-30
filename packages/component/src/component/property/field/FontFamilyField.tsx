/**
 * FontFamilyField
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SyntheticEvent, useCallback } from "react";
import { Autocomplete, SxProps, TextField } from '@mui/material';
import { ChangeValueHandler } from '../usePropertyStates';
import { FontList, FontListItem } from '@/font';

type Props = {
  label: string;
  name: string;
  value: string;
  fontList: FontList;
  sx?: SxProps;
  onChangeFamily: (value: FontListItem) => void;
  onChangeValue: ChangeValueHandler<string>;
}

export default function FontFamilyField(props: Props) {
  const { label, name, value, sx, onChangeValue , onChangeFamily, fontList } = props;

  const handleChange = useCallback((_: SyntheticEvent<Element, Event>, value: FontListItem | null) => {
    if (value === null) return;
    onChangeFamily(value);
  }, [onChangeFamily]);

  const handleBlur = useCallback(() => {
    if (value === null) return;
    onChangeValue(name, value, true);
  }, [name, value, onChangeValue]);

  const listItem = fontList.find(item => item.id === value);

  return (
    <Autocomplete
      sx={sx}
      options={fontList}
      onChange={handleChange}
      onBlur={handleBlur}
      value={listItem}
      renderInput={
        params => {
          return <TextField
            {...params}
            label={label}
            name={name}
            size="small"
          />
        }
      }
    />
  );
}
