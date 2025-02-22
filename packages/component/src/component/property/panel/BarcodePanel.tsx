/**
 * BarcodePanel
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeData, BarcodeOptions, UnitValue } from '@sunvisor/super-leopard-core';
import PositionFields from '../fieldGroup/PositionFields';
import { ChangeValueHandler } from '../usePropertyStates';
import SizeFields from '../fieldGroup/SizeFields';
import GroupBox from '../fieldGroup/GroupBox';
import BarcodeFormatField from '../field/BarcodeFormatField';
import getCaptions from '../../../captions/getCaptions';
import BarcodeOptionFields from '../fieldGroup/BarcodeOptionFields';


type BarcodePanelValueType = string | number | BarcodeOptions;
type Props = {
  unit: UnitValue;
  values: BarcodeData;
  onChangeValue: ChangeValueHandler<BarcodePanelValueType>
}

export default function BarcodePanel(props: Props) {
  const { values, unit, onChangeValue } = props;
  const captions = getCaptions('barcodeProperty');

  return (
    <>
      <PositionFields
        x={values.x}
        y={values.y}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <SizeFields
        width={values.width}
        height={values.height}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <GroupBox>
        <BarcodeFormatField
          sx={{ flex: 1 }}
          label={captions.format}
          name="format"
          value={values.format}
          onChangeValue={onChangeValue}
        />
      </GroupBox>
      <BarcodeOptionFields
        values={values.options ?? {}}
        captions={captions}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
