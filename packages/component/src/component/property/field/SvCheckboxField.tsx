/**
 * SvCheckboxField
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useCallback } from "react";
import Caption from '../Caption';
import { ChangeValueHandler } from '../usePropertyStates';

type Props = {
  name: string;
  label: string;
  value: boolean;
  onChangeValue: ChangeValueHandler<boolean>;
};

export default function SvCheckboxField(props: Props) {
  const { name, label, value, onChangeValue } = props;

  const handleCheckChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.checked;
    onChangeValue(name, value, true);
  }, [onChangeValue]);

  return (
    <FormControlLabel control={
      <Checkbox
        checked={value ?? false}
        name={name}
        onChange={handleCheckChange}
      />
    } label={
      <Caption>
        {label}
      </Caption>
    }/>
  );
}
