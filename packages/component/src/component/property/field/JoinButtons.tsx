/**
 * JoinButtons
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo } from "react";
import JoinMiterIcon from './icon/JoinMiterIcon';
import JoinRoundIcon from './icon/JoinRoundIcon';
import JoinBevelIcon from './icon/JoinBevelIcon';
import { JoinValue } from '@sunvisor/super-leopard-core';
import translation from '@/translations/translation';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { ChangeValueHandler } from '../usePropertyStates';

type Props = {
  value: JoinValue;
  name: string;
  onChangeValue: ChangeValueHandler<string>;
}
export type JoinButtonsProps = Props;

export default function JoinButtons(props: Props) {
  const { name, value, onChangeValue } = props;
  const t = translation().joinTool;

  const buttons: ToggleToolButton[] = useMemo(() => [
    { icon: <JoinMiterIcon/>, value: 'miter', title: t.miter },
    { icon: <JoinRoundIcon/>, value: 'round', title: t.round },
    { icon: <JoinBevelIcon/>, value: 'bevel', title: t.bevel }
  ], [t.miter, t.round, t.bevel]);

  const handleChange = useCallback( (_: React.MouseEvent<HTMLElement>, newJoin: JoinValue) => {
    if (newJoin === null) return;
    onChangeValue(name, newJoin, true);
  }, [name, onChangeValue]);

  return (
    <ToggleTools
      value={value}
      exclusive
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
