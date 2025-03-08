/**
 * FontFields
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useState } from "react";
import { Box } from '@mui/material';
import FontFamilyField from '../field/FontFamilyField';
import translation from '../../../translations/translation';
import { FontData, FontStyleValue, toStyleString, toStyleValues } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import { FontList } from '../../../font';
import FontStyleButtons from '../field/FontStyleButtons';
import GroupBox from '../fieldGroup/GroupBox';
import NumberField from '../field/NumberField';
import { adjustFontStyle, FontListItem } from '../../../font/font';


const MAX_FONT_SIZE = 512;

export type FontValueType = Omit<FontData, 'style'> & {
  style: FontStyleValue[];
}

type ChangeValueType = number | string | FontStyleValue[] | undefined;

type Props = {
  font: FontData;
  fontList: FontList;
  multiLine?: boolean;
  onChangeValue: ChangeValueHandler<FontData>;
}

function toFontValue(font: FontData): FontValueType {
  return {
    ...font,
    style: toStyleValues(font.style) || [],
  }
}

function toFontData(font: FontValueType): FontData {
  return {
    ...font,
    style: toStyleString(font.style),
  }
}

export default function FontFields(props: Props) {
  const { fontList, multiLine, onChangeValue } = props;
  const t = translation().fontProperty;
  const [ enabledStyles, setEnabledStyles ] = useState<FontStyleValue[]>([]);

  const adjustFont = useCallback((font: FontValueType) => {
    return {
      ...font,
      style: adjustFontStyle({
        family: font.family,
        style: font.style,
        multiLine: multiLine ?? false,
        fontList,
      })
    }
  }, [multiLine, fontList]);

  const font = adjustFont(toFontValue(props.font) );

  useEffect(() => {
    const styles = fontList.find(item => item.id === font.family)?.styles ?? [];
    setEnabledStyles(styles);
  }, [font.family, fontList]);

  const handleChangeFamily = useCallback((value: FontListItem) => {
    setEnabledStyles(value.styles);
    const newFont =adjustFont({ ...font, family: value.id });
    onChangeValue('font', toFontData(newFont), true);
  }, [onChangeValue, font, adjustFont]);

  const handleChange = useCallback((key: string, value: ChangeValueType, update?: boolean) => {
    const newFont = adjustFont({ ...font, [key.split('.').pop() || '']: value });
    onChangeValue('font', toFontData(newFont), update);
  }, [onChangeValue, font, adjustFont]);

  return (
    <>
      <GroupBox>
        <FontFamilyField
          sx={{ flex: 1 }}
          label={t.fontFamily}
          name="font.family"
          value={font.family}
          fontList={fontList}
          onChangeValue={handleChange}
          onChangeFamily={handleChangeFamily}
        />
      </GroupBox>
      <GroupBox sx={{ gap: 2 }}>
        <NumberField
          sx={{ flex: 1 }}
          label={t.fontSize}
          name="font.size"
          value={font.size.toString()}
          unit="pt"
          decimalPlace={1}
          minValue={1}
          maxValue={MAX_FONT_SIZE}
          onChangeValue={handleChange}
        />
        <Box>
          <FontStyleButtons
            name="font.style"
            value={font.style}
            multiLine={multiLine}
            onChangeValue={handleChange}
            enabledStyles={enabledStyles}
          />
        </Box>
      </GroupBox>
    </>
  );
}
