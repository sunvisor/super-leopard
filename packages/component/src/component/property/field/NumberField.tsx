/**
 * NumberField
 *
 * Created by sunvisor on 2024/02/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect, useState } from "react";
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { UnitValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import useValidateNumber from '../field/useValidateNumber';

const DEFAULT_DECIMAL_PLACE = 3;

type Props = TextFieldProps & {
  unit?: UnitValue,
  name: string,
  decimalPlace?: number,
  minValue?: number,
  maxValue?: number,
  onChangeValue: ChangeValueHandler<number>;
};

function isValidNumber(value: string) {
  if (value.length === 0) return true;
  const char = value[value.length - 1];

  if (/^.+-$/.test(value)) return false;
  return (/^[0-9.\-+]+$/.test(char) && (!((value.match(/\./g) ?? []).length > 1)));
}

function checkDecimal(value: string, length: number) {
  const [, decimal] = value.split('.');
  return decimal ? decimal.length <= length : true;
}

export default function NumberField(props: Props) {
  const { name, value, unit, onChangeValue, decimalPlace, minValue, maxValue, ...fieldProps } = props;
  const [fieldValue, setFieldValue] = useState<string>(value as string);
  const { error, message, validate } = useValidateNumber({
    minValue, maxValue
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (!isValidNumber(value)) return;
      if (!checkDecimal(value, decimalPlace ?? DEFAULT_DECIMAL_PLACE)) return;
      setFieldValue(value);
      if (!validate(value)) return;
      onChangeValue(name, Number(value));
    },
    [decimalPlace, name, onChangeValue, validate]
  );

  const handleBlur = useCallback(() => {
    if (error) return;
    onChangeValue(name, Number(fieldValue), true);
  }, [name, onChangeValue, fieldValue, error]);

  useEffect(() => {
    setFieldValue(value as string);
  }, [value]);

  return (
    (<TextField
      size="small"
      name={name}
      value={fieldValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={message}
      {...fieldProps}
      slotProps={{
        input: {
          inputProps: {
            style: {
              textAlign: "right",
            }
          },
          endAdornment: unit ? <InputAdornment position="end">{unit}</InputAdornment> : undefined
        }
      }} />)
  );
}
