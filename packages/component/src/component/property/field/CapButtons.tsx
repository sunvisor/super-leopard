/**
 * CapButtons
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo } from 'react';
import CapButtIcon from '../field/icon/CapButtIcon';
import { CapValue } from '@sunvisor/super-leopard-core';
import CapRoundIcon from '../field/icon/CapRoundIcon';
import CapSquareIcon from '../field/icon/CapSquareIcon';
import translation from '../../../translations/translation';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { ChangeValueHandler } from '../usePropertyStates';


type Props = {
  name: string;
  value: CapValue;
  onChangeValue: ChangeValueHandler<CapValue>;
}

export default function CapButtons(props: Props) {
  const { name, value, onChangeValue } = props;
  const t = translation().capTool;

  const buttons: ToggleToolButton[] = useMemo(() => [
    { icon: <CapButtIcon/>, value: 'butt', title: t.butt },
    { icon: <CapRoundIcon/>, value: 'round', title: t.round },
    { icon: <CapSquareIcon/>, value: 'square', title: t.square }
  ], [t.butt, t.round, t.square]);

  const handleChange = useCallback((_: React.MouseEvent<HTMLElement>, newCap: CapValue) => {
    if (newCap === null) return;
    onChangeValue(name, newCap, true);
  }, [name, onChangeValue]);

  return (
    <ToggleTools
      value={value}
      exclusive
      onChange={handleChange}
      buttons={buttons}
    />
  )
}
