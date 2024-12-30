/**
 * Border
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import BorderFields, { BorderFieldType } from '../fieldGroup/BorderFields';
import { useAtom } from 'jotai/index';
import { BorderAtom } from '../../../atom/StylesAtom';
import { BorderPropertyValue, contractBorder, createBorder, expandBorder } from '@sunvisor/super-leopard-core';

export default function Border() {
  const [border, setBorder] = useAtom(BorderAtom);

  const propertyValue = useMemo(() => {
    return expandBorder(createBorder(border));
  }, [border]);
  const [values, setValues] = useState<BorderPropertyValue>(propertyValue);

  const handleChangeValue = useCallback(
    (name: string, value: BorderFieldType, update?: boolean) => {
      const newValues = { ...values, [name]: value };
      setValues(newValues);
      if (update) {
        setBorder(contractBorder(newValues));
      }
    }, [setBorder, values]
  )

  useEffect(() => {
    setValues(propertyValue);
  }, [propertyValue]);

  return (
    <BorderFields
      useStroke={values.useStroke}
      borderColor={values.borderColor}
      borderWidth={values.borderWidth}
      borderStyle={values.borderStyle}
      borderCap={values.borderCap}
      borderJoin={values.borderJoin}
      onChangeValue={handleChangeValue}
    />
  );
}
