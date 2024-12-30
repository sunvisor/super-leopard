/**
 * DrawToolbar
 *
 * Created by sunvisor on 2024/02/11.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React from "react";
import { Box } from '@mui/material';
import EditModeButtons from '../toolbar/EditModeButtons';
import { EditMode } from '../reportEditor/ReportWorkArea';

type Props = {
  mode?: EditMode;
  onChange: (event: React.MouseEvent<HTMLElement>, newMode: EditMode) => void;
}

export type DrawToolbarProps = Props;

export default function DrawToolbar(props: Props) {
  return (
    <Box sx={{ height: '100%', p: 1 }}>
      <EditModeButtons
        mode={props.mode}
        onChange={props.onChange}
        orientation="vertical"
      />
    </Box>
  );
}
