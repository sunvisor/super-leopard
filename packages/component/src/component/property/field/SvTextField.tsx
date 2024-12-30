/**
 * SvTextField
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, useCallback } from "react";
import { ChangeValueHandler } from '../usePropertyStates';

type Props = TextFieldProps & {
  name: string;
  onChangeValue: ChangeValueHandler<string>;
}

export default function SvTextField(props: Props) {
  const { name, value, onChangeValue, ...rest } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeValue(name, event.target.value);
    }, [name, onChangeValue]
  );

  const handleBlur = useCallback(
    () => {
      onChangeValue(name, value as string, true);
    }, [name, value, onChangeValue]
  );

  return (
    <TextField
      size="small"
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...rest}
    />
  );
}
