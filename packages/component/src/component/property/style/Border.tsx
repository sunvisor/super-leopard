/**
 * Border
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useState } from "react";
import BorderFields from '../fieldGroup/BorderFields';
import { BorderData, } from '@sunvisor/super-leopard-core';
import useStyles from '@/hooks/useStyles';


export default function Border() {
  const { border, setBorder } = useStyles();
  const [values, setValues] = useState<BorderData | undefined>(border);

  const handleChangeValue = useCallback(
    (_: string, value: BorderData | undefined, update?: boolean) => {
      setValues(value);
      if (update) {
        setBorder(value);
      }
    }, [setBorder]
  )

  useEffect(() => {
    setValues(border);
  }, [border, setValues]);

  return (
    <BorderFields
      border={values}
      onChangeValue={handleChangeValue}
    />
  );
}
