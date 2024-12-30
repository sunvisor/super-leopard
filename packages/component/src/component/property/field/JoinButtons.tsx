/**
 * JoinButtons
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo } from "react";
import JoinMiterIcon from '../field/icon/JoinMiterIcon';
import JoinRoundIcon from '../field/icon/JoinRoundIcon';
import JoinBevelIcon from '../field/icon/JoinBevelIcon';
import { JoinValue } from '@sunvisor/super-leopard-core';
import getCaptions from '../../../captions/getCaptions';
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
  const captions = getCaptions('joinTool');

  const buttons: ToggleToolButton[] = useMemo(() => [
    { icon: <JoinMiterIcon/>, value: 'miter', title: captions.miter },
    { icon: <JoinRoundIcon/>, value: 'round', title: captions.round },
    { icon: <JoinBevelIcon/>, value: 'bevel', title: captions.bevel }
  ], [captions.miter, captions.round, captions.bevel]);

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
