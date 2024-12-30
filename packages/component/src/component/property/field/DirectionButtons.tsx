/**
 * DirectionButtons
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo } from "react";
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { DirectionType, DirectionValue } from '@sunvisor/super-leopard-core';
import getCaptions from '../../../captions/getCaptions';
import { ChangeValueHandler } from '../usePropertyStates';


type Props = {
  name: string;
  value: DirectionValue;
  onChangeValue: ChangeValueHandler<DirectionValue>;
}

export default function DirectionButtons(props: Props) {
  const { name, value, onChangeValue } = props;
  const captions = getCaptions('groupProperty');

  const buttons: ToggleToolButton[] = useMemo(() => [
    { icon: <EastIcon/>, value: DirectionType.HORIZONTAL, title: captions.horizontal },
    { icon: <SouthIcon/>, value: DirectionType.VERTICAL, title: captions.vertical }
  ], [captions.horizontal, captions.vertical])

  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newDirection: DirectionValue) => {
      if (newDirection === null) return;
      onChangeValue(name, newDirection, true);
    },
    [name, onChangeValue]
  );

  return (
    <ToggleTools
      value={value}
      exclusive
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
