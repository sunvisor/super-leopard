/**
 * MultiLineFields
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ChangeValueHandler } from '../usePropertyStates';
import translation from '@/translations/translation';
import NumberField from '../field/NumberField';
import { UnitValue } from '@sunvisor/super-leopard-core';
import SvCheckboxField from '../field/SvCheckboxField';
import GroupBox from './GroupBox';

const MAX_LINE_PITCH = 100;

export type MultiLineFieldType = boolean|number;

type Props = {
  multiLine: boolean;
  linePitch: number;
  unit: UnitValue;
  onChangeValue: ChangeValueHandler<MultiLineFieldType>;
}

export default function MultiLineFields(props: Props) {
  const { multiLine, linePitch, onChangeValue, unit } = props;
  const t = translation().textProperty;

  return (
    <GroupBox>
      <SvCheckboxField
        name="multiLine"
        label={t.multiLine}
        value={multiLine}
        onChangeValue={onChangeValue}
      />
      {
        multiLine && <NumberField
          label={t.linePitch}
          name="linePitch"
          unit={unit}
          value={linePitch}
          minValue={0}
          maxValue={MAX_LINE_PITCH}
          onChangeValue={onChangeValue}
        />
      }
    </GroupBox>
  );
}
