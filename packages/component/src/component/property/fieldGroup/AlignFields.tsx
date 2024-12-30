/**
 * AlignFields
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import AlignButtons from '../field/AlignButtons';
import ValignButtons from '../field/ValignButtons';
import { AlignValue, ValignValue } from '@sunvisor/super-leopard-core';
import { ChangeValueHandler } from '../usePropertyStates';
import GroupBox from './GroupBox';

export type AlignFieldType = AlignValue|ValignValue;

type Props = {
  align: AlignValue;
  valign: ValignValue;
  onChangeValue: ChangeValueHandler<AlignFieldType>;
}

export default function AlignFields(props: Props) {
  const { align, valign, onChangeValue } = props;

  return (
    <GroupBox sx={{ gap: 2 }}>
      <AlignButtons
        value={align}
        name="align"
        onChangeValue={onChangeValue}
      />
      <ValignButtons
        value={valign}
        name="valign"
        onChangeValue={onChangeValue}
      />
    </GroupBox>
  );
}
