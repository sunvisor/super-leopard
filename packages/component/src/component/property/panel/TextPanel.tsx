/**
 * TextPanel
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PositionFields from '../fieldGroup/PositionFields';
import SizeFields from '../fieldGroup/SizeFields';
import FontFields from '../fieldGroup/FontFields';
import TextColorFields, { TextColorFieldType } from '../fieldGroup/TextColorFields';
import AlignFields, { AlignFieldType } from '../fieldGroup/AlignFields';
import MultiLineFields, { MultiLineFieldType } from '../fieldGroup/MultiLineFields';
import { ChangeValueHandler } from '../usePropertyStates';
import { AlignType, FontData, TextData, UnitValue, ValignType } from '@sunvisor/super-leopard-core';
import { FontList } from '../../../font';
import SvCheckboxField from '../field/SvCheckboxField';
import getCaptions from '../../../captions/getCaptions';

export type TextPanelValueType =
  number
  | FontData
  | TextColorFieldType
  | AlignFieldType
  | MultiLineFieldType;

type Props = {
  unit: UnitValue;
  values: TextData;
  fontList: FontList;
  onChangeValue: ChangeValueHandler<TextPanelValueType>;
}

export default function TextPanel(props: Props) {
  const { unit, values, fontList, onChangeValue } = props;
  const captions = getCaptions().textProperty;

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
        font={values.font}
        fontList={fontList}
        multiLine={values.multiLine}
        onChangeValue={onChangeValue}
      />
      <TextColorFields
        fillColor={values.fillColor}
        color={values.color || '#000000'}
        onChangeValue={onChangeValue}
      />
      <AlignFields
        align={values.align || AlignType.LEFT}
        valign={values.valign || ValignType.TOP}
        onChangeValue={onChangeValue}
      />
      <MultiLineFields
        multiLine={values.multiLine || false}
        linePitch={values.linePitch || 0}
        unit={unit}
        onChangeValue={onChangeValue}
      />
      <SvCheckboxField
        name="fitCell"
        label={captions.fitCell}
        value={values.fitCell || false}
        onChangeValue={onChangeValue}
      />
    </>
  );
}
