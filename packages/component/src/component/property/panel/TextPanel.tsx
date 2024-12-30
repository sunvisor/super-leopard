/**
 * TextPanel
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionFields from '../fieldGroup/PositionFields';
import SizeFields from '../fieldGroup/SizeFields';
import FontFields, { FontFieldType } from '../fieldGroup/FontFields';
import TextColorFields, { TextColorFieldType } from '../fieldGroup/TextColorFields';
import AlignFields, { AlignFieldType } from '../fieldGroup/AlignFields';
import MultiLineFields, { MultiLineFieldType } from '../fieldGroup/MultiLineFields';
import { ChangeValueHandler } from '../usePropertyStates';
import { UnitValue, TextStyleValue } from '@sunvisor/super-leopard-core';
import { FontList } from '../../../font';
import SvCheckboxField from '../field/SvCheckboxField';
import getCaptions from '../../../captions/getCaptions';

export type TextPanelValueType  = number|FontFieldType|TextColorFieldType|AlignFieldType|MultiLineFieldType|boolean;
type Props = {
  unit: UnitValue;
  values: TextStyleValue;
  fontList: FontList;
  onChangeValue: ChangeValueHandler<TextPanelValueType>;
}

export default function TextPanel(props: Props) {
  const { unit, values, fontList, onChangeValue } = props;
  const captions = getCaptions('textProperty');

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
      <FontFields
        fontFamily={values.fontFamily}
        fontSize={values.fontSize}
        fontStyle={values.fontStyle}
        fontList={fontList}
        multiLine={values.multiLine}
        onChangeValue={onChangeValue}
      />
      <TextColorFields
        useFillColor={values.useFillColor}
        fillColor={values.fillColor}
        color={values.color}
        onChangeValue={onChangeValue}
      />
      <AlignFields
        align={values.align}
        valign={values.valign}
        onChangeValue={onChangeValue}
      />
      <MultiLineFields
        multiLine={values.multiLine}
        linePitch={values.linePitch}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <SvCheckboxField
        name="fitCell"
        label={captions.fitCell}
        value={values.fitCell}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
