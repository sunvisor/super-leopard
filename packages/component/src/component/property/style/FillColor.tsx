/**
 * FillColor
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import { ColorData } from '@sunvisor/super-leopard-core';
import FillColorField from '../field/FillColorField';
import useStyles from '../../../hooks/useStyles';


export default function FillColor() {
  const { fillColor, setFillColor } = useStyles();

  const handleChangeValue = useCallback(
    (_: string, value: ColorData | undefined, update?: boolean) => {
      if (update) {
        setFillColor(value);
      }
    }, [setFillColor]
  );

  return (
    <FillColorField
      fillColor={fillColor}
      onChangeValue={handleChangeValue}
    />
  );
}
