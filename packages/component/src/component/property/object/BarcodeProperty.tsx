/**
 * BarcodeProperty
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import PropertyBox from './PropertyBox';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Barcode, BarcodeData, createBarcode, serializeBarcode,
  UnitValue
} from '@sunvisor/super-leopard-core';
import { UpdateHandler } from './ShapeProperty';
import usePropertyStates from '../usePropertyStates';
import { Box } from '@mui/material';
import SvTextField from '../field/SvTextField';
import BarcodePanel from '../panel/BarcodePanel';
import BarcodeField from '../field/BarcodeField';
import getCaptions from '../../../captions/getCaptions';


type Props = {
  unit: UnitValue;
  shape: Barcode;
  onUpdate: UpdateHandler;
  errorImageUrl: string;
}

export default function BarcodeProperty(props: Props) {
  const { unit, shape, onUpdate, errorImageUrl } = props;
  const barcodeProperty = useMemo(
    () => serializeBarcode(shape), [shape]
  );
  const captions = getCaptions('barcodeProperty');

  const doUpdate = useCallback(
    (values: BarcodeData) => {
      const updated = createBarcode(values);
      onUpdate(shape, updated);
    }
  ,[shape, onUpdate]);

  const { values, setValues, handleChangeValue } = usePropertyStates<BarcodeData>(
    barcodeProperty,
    values => doUpdate(values)
  );

  useEffect(() => {
    setValues(barcodeProperty);
  }, [barcodeProperty, setValues]);

  return (
    <PropertyBox
      onSubmit={() => doUpdate(values)}
    >
      <Box>
        <SvTextField
          name="value"
          size="small"
          fullWidth
          label={captions.value}
          value={values.value}
          onChangeValue={handleChangeValue}/>
      </Box>
      <BarcodePanel
        unit={unit}
        values={values}
        onChangeValue={handleChangeValue}
      />
      <Box sx={{ height: 200 }}>
        <BarcodeField
          format={values.format}
          value={values.value ?? ''}
          rotate={values.options?.rotate || 'N'}
          includeText={values.options?.includeText || false}
          errorImageUrl={errorImageUrl}
        />
      </Box>
    </PropertyBox>
  );
}
