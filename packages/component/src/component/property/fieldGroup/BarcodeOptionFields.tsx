/**
 * BarcodeOptionFields
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeOptions, BarcodeRotateType } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import GroupBox from './GroupBox';
import BarcodeRotateField from '../field/BarcodeRotateField';
import SvCheckboxField from '../field/SvCheckboxField';
import translation from '@/translations/translation';
import { useCallback } from 'react';

type Props = {
  values: { rotate?: BarcodeRotateType, includeText?: boolean };
  captions: Record<string, string>;
  onChangeValue: ChangeValueHandler<BarcodeOptions>
}
export default function BarcodeOptionFields(props :Props) {
  const { values, captions, onChangeValue } = props;
  const { rotate = 'N', includeText = false } = values;
  const rotateTypeList = translation().barcodeRotateName;

  const handleChange = useCallback((key: string, value: string | boolean, update?: boolean) => {
    const newValue = { ...values, [key]: value };
    onChangeValue('options', newValue, update);
  }, [values, onChangeValue])

  return (
    <GroupBox sx={{ gap: 2 }}>
      <BarcodeRotateField
        sx={{ flex: 1 }}
        label={captions.rotate}
        name="rotate"
        value={rotate}
        rotateTypeList={rotateTypeList}
        onChangeValue={handleChange}
      />
      <SvCheckboxField
        name="includeText"
        label={captions.includeText}
        value={includeText}
        onChangeValue={handleChange}
      />
    </GroupBox>
  );
}
