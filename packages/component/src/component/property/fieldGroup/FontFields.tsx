/**
 * FontFields
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useState } from "react";
import { Box } from '@mui/material';
import FontFamilyField from '../field/FontFamilyField';
import getCaptions from '../../../captions/getCaptions';
import { FontStyleValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import { FontList } from '../../../font';
import FontStyleButtons from '../field/FontStyleButtons';
import GroupBox from '../fieldGroup/GroupBox';
import NumberField from '../field/NumberField';
import { FontListItem } from '../../../font/font';

const MAX_FONT_SIZE = 512;

export type FontFieldType = string|number|FontStyleValue[];

type Props = {
  fontFamily: string;
  fontSize: number;
  fontStyle: FontStyleValue[];
  fontList: FontList;
  multiLine?: boolean;
  onChangeValue: ChangeValueHandler<FontFieldType>;
}

export default function FontFields(props: Props) {
  const { fontFamily, fontSize, fontStyle, fontList, multiLine, onChangeValue } = props;
  const captions = getCaptions('fontProperty');
  const [ enabledStyles, setEnabledStyles ] = useState<FontStyleValue[]>([]);

  useEffect(() => {
    const styles = fontList.find(item => item.id === fontFamily)?.styles ?? [];
    setEnabledStyles(styles);
  }, [fontFamily, fontList]);

  const handleChangeFamily = useCallback((value: FontListItem) => {
    setEnabledStyles(value.styles);
    onChangeValue('fontFamily', value.id, true);
  }, [onChangeValue]);

  return (
    <>
      <GroupBox>
        <FontFamilyField
          sx={{ flex: 1 }}
          label={captions.fontFamily}
          name="fontFamily"
          value={fontFamily}
          fontList={fontList}
          onChangeValue={onChangeValue}
          onChangeFamily={handleChangeFamily}
        />
      </GroupBox>
      <GroupBox sx={{ gap: 2 }}>
        <NumberField
          sx={{ flex: 1 }}
          label={captions.fontSize}
          name="fontSize"
          value={fontSize.toString()}
          unit="pt"
          decimalPlace={1}
          minValue={1}
          maxValue={MAX_FONT_SIZE}
          onChangeValue={onChangeValue}
        />
        <Box>
          <FontStyleButtons
            name="fontStyle"
            value={fontStyle}
            multiLine={multiLine}
            onChangeValue={onChangeValue}
            enabledStyles={enabledStyles}
          />
        </Box>
      </GroupBox>
    </>
  );
}
