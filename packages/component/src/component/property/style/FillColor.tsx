/**
 * FillColor
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback } from "react";
import { useAtom } from 'jotai/index';
import { FillColorAtom } from '../../../atom/StylesAtom';
import { ColorData } from '@sunvisor/super-leopard-core';
import FillColorField from '../field/FillColorField';

export default function FillColor() {
  const [fillColor, setFillColor] = useAtom(FillColorAtom);

  const handleChangeValue = useCallback(
    (_: string, value: ColorData|undefined, update?: boolean) => {
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
