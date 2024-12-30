/**
 * FooterToolbar
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback } from "react";
import { Slider, Toolbar } from '@mui/material';
import Caption from '../property/Caption';

type Props = {
  onChange: (event: Event, zoom: number) => void;
}
export type FooterToolbarProps = Props;

export default function FooterToolbar(props: Props) {
  const { onChange } = props;
  const [zoom, setZoom] = React.useState(100);

  const handleChange = useCallback((event: Event, value: number | number[]) => {
    if (typeof value !== 'number') return;
    setZoom(value);
    onChange(event, value);
  }, [onChange, setZoom]);

  return (
    <Toolbar variant="dense">
      <Slider
        sx={{ width: 200, mr: 1 }}
        defaultValue={100}
        min={20}
        max={400}
        step={10}
        valueLabelDisplay="auto"
        value={zoom}
        onChange={handleChange}
      />
      <Caption>
        {zoom}%
      </Caption>
    </Toolbar>
  )
}
