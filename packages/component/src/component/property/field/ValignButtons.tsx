/**
 * ValignButtons
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useMemo } from "react";
import { AlignValue, ValignType, ValignValue } from '@sunvisor/super-leopard-core';
import getCaptions from '../../../captions/getCaptions';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { ChangeValueHandler } from '../usePropertyStates';
import { SvgIcon } from '@mui/material';

type Props = {
  name: string;
  value: ValignValue;
  onChangeValue: ChangeValueHandler<ValignValue>;
}

function ValignTopIcon() {
  return (
    <SvgIcon>
      <path d="M3 13h12v-2H3zm0-4h18v-2H3zm0-4h18v-2H3z"/>
    </SvgIcon>
  )
}

function ValignMiddleIcon() {
  return (
    <SvgIcon>
      <path d="M3 17h12v-2H3zm0-4h18v-2H3zm0-4h18v-2H3z"/>
    </SvgIcon>
  )
}

function ValignBottomIcon() {
  return (
    <SvgIcon>
      <path d="M3 21h12v-2H3zm0-4h18v-2H3zm0-4h18v-2H3z"/>
    </SvgIcon>
  )
}

export default function ValignButtons(props: Props) {
  const { name, value, onChangeValue } = props;
  const captions = getCaptions().alignTool;

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValign: AlignValue) => {
    if (newValign === null) return;
    onChangeValue  (name, newValign, true);
  };

  const buttons: ToggleToolButton[] = useMemo(() => [
    { value: ValignType.TOP, icon: <ValignTopIcon/>, title: captions.top },
    { value: ValignType.MIDDLE, icon: <ValignMiddleIcon/>, title: captions.middle },
    { value: ValignType.BOTTOM, icon: <ValignBottomIcon/>, title: captions.bottom },
  ], [captions.top, captions.middle, captions.bottom]);

  return (
    <ToggleTools
      value={value}
      exclusive
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
