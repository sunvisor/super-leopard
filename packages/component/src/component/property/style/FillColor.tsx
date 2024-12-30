/**
 * FillColor
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from 'jotai/index';
import { FillColorAtom } from '../../../atom/StylesAtom';
import { Color, contractFillColor, expandFillColor, FillColorPropertyValue } from '@sunvisor/super-leopard-core';
import FillColorField from '../field/FillColorField';

export default function FillColor() {
  const [fillColor, setFillColor] = useAtom(FillColorAtom);
  const propertyValue = useMemo(() => {
    return expandFillColor(fillColor === undefined ? undefined : new Color(fillColor));
  }, [fillColor]);
  const [values, setValues] = useState<FillColorPropertyValue>(propertyValue);

  const handleChangeValue = useCallback(
    (name: string, value: string|boolean, update?: boolean) => {
      const newValues = { ...values, [name]: value };
      setValues(newValues);
      if (update) {
        setFillColor(contractFillColor(newValues));
      }
    }, [setFillColor, values]
  );

  useEffect(() => {
    setValues(propertyValue);
  }, [propertyValue]);

  return (
    <FillColorField
      useFillColor={values.useFillColor}
      fillColor={values.fillColor}
      onChangeValue={handleChangeValue}
    />
  );
}
