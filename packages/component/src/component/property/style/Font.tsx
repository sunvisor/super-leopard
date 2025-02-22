/**
 * Font
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useState } from "react";
import { FontStyleAtom } from '../../../atom/StylesAtom';
import { useAtom } from 'jotai/index';
import FontFields from '../fieldGroup/FontFields';
import { FontList } from '../../../font';
import { FontData } from '@sunvisor/super-leopard-core';


type Props = {
  fontList: FontList;
}

export default function Font({ fontList }: Props) {
  const [font, setFont] = useAtom(FontStyleAtom);
  const [values, setValues] = useState<FontData>(font);

  const handleChangeValue = useCallback(
    (_: string, value: FontData, update?: boolean) => {
      setValues(value);
      if (update && value) {
        setFont(values);
      }
    }, [setFont, values]
  );

  return (
    <FontFields
      font={values}
      fontList={fontList}
      onChangeValue={handleChangeValue}
    />
  );
}
