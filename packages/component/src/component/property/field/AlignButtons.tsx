/**
 * AlignButtons
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useMemo } from "react";
import { SvgIcon } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { AlignType, AlignValue } from '@sunvisor/super-leopard-core';
import getCaptions from '../../../captions/getCaptions';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { ChangeValueHandler } from '../usePropertyStates';

type Props = {
  name: string;
  value: AlignValue;
  onChangeValue: ChangeValueHandler<AlignValue>;
}

function AlignJustifyIcon() {
  return (
    <SvgIcon>
      <path d="M3 21h12v-2H3zm0-4h18v-2H3zm0-4h18v-2H3zm0-4h18V7H3zm0-6v2h18V3z"/>
    </SvgIcon>
  )
}

export default function AlignButtons(props: Props) {
  const { name, value, onChangeValue } = props;
  const captions = getCaptions().alignTool;

  const handleChange = (_: React.MouseEvent<HTMLElement>, newAlign: AlignValue) => {
    if (newAlign === null) return;
    onChangeValue  (name, newAlign, true);
  };

  const buttons: ToggleToolButton[] = useMemo(() => [
    { value: AlignType.LEFT, icon: <FormatAlignLeftIcon/>, title: captions.left },
    { value: AlignType.CENTER, icon: <FormatAlignCenterIcon/>, title: captions.center },
    { value: AlignType.RIGHT, icon: <FormatAlignRightIcon/>, title: captions.right },
    { value: AlignType.JUSTIFY, icon: <AlignJustifyIcon/>, title: captions.justify },
    { value: AlignType.JUSTIFY_ALL, icon: <FormatAlignJustifyIcon/>, title: captions.justifyAll },
  ], [captions.left, captions.center, captions.right, captions.justify]);

  return (
    <ToggleTools
      value={value}
      exclusive
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
