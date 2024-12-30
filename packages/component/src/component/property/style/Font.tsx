/**
 * Font
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { FontStyleAtom } from '../../../atom/StylesAtom';
import { useAtom } from 'jotai/index';
import { contractFont, createFont, expandFont, FontPropertyValue } from '@sunvisor/super-leopard-core';
import FontFields, { FontFieldType } from '../fieldGroup/FontFields';
import { adjustFontStyle, FontList } from '../../../font/font';

type Props = {
  fontList: FontList;
}

export default function Font({ fontList }: Props) {
  const [font, setFont] = useAtom(FontStyleAtom);
  const propertyValue = useMemo<FontPropertyValue>(() => {
    return expandFont(createFont(font));
  }, [font]);
  const [values, setValues] = useState<FontPropertyValue>(propertyValue);

  const adjustStyle = useCallback(
    (value: FontPropertyValue) => {
      const fontStyle = adjustFontStyle({
        family: value.fontFamily,
        style: value.fontStyle,
        multiLine: false,
        fontList,
      })
      return { ...value, fontStyle };
    }
    , [fontList]);

  const handleChangeValue = useCallback(
    (name: string, value: FontFieldType, update?: boolean) => {
      const newValues = adjustStyle({ ...values, [name]: value });
      setValues(newValues);
      if (update) {
        setFont(contractFont(newValues));
      }
    }, [setFont, values, adjustStyle]
  );

  useEffect(() => {
    setValues(adjustStyle(propertyValue));
  }, [adjustStyle, propertyValue]);

  return (
    <FontFields
      fontFamily={values.fontFamily}
      fontSize={values.fontSize}
      fontStyle={values.fontStyle}
      fontList={fontList}
      onChangeValue={handleChangeValue}
    />
  );
}
