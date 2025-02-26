/**
 * OrientationField
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import { SxProps } from '@mui/material';
import { OrientationValue } from '@sunvisor/super-leopard-core';
import React, { useCallback, useMemo } from "react";
import getCaptions from '../../../captions/getCaptions';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { ChangeValueHandler } from '../usePropertyStates';

type Props = {
  name: string;
  value: OrientationValue;
  onChangeValue: ChangeValueHandler<OrientationValue>;
  sx?: SxProps;
}


export default function OrientationField(props: Props) {
  const { name, value, onChangeValue , sx } = props;
  const captions = getCaptions().pageProperty;

  const button: ToggleToolButton[] = useMemo(() => [
    { icon: <CropPortraitIcon/>, value: 'portrait', caption: captions.portrait, sx: { flex: 1 } },
    { icon: <CropLandscapeIcon/>, value: 'landscape', caption: captions.landscape, sx: { flex: 1 } },
  ], [captions.portrait, captions.landscape]);

  const handleChange = useCallback((_: React.MouseEvent<HTMLElement>, newOrientation: OrientationValue) => {
    if (newOrientation === null) return;
    onChangeValue(name, newOrientation, true);
  }, [name, onChangeValue]);

  return (
    <ToggleTools
      value={value}
      sx={{ ...sx, display: 'flex' }}
      exclusive
      onChange={handleChange}
      buttons={button}
    />
  );
}
