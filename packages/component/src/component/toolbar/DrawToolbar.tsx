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
import LockToggle from '@/component/toolbar/LockToggle';


type Props = {
  mode: EditMode;
  locked: boolean;
  onChange: (event: React.MouseEvent<HTMLElement>, newMode: EditMode) => void;
  onChangeLocked: (locked: boolean) => void;
}

export type DrawToolbarProps = Props;

export default function DrawToolbar(props: Props) {
  const { mode, locked, onChange, onChangeLocked } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 1 }}>
        <EditModeButtons
          mode={mode}
          onChange={onChange}
          orientation="vertical"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <LockToggle locked={locked} onChange={onChangeLocked}/>
      </Box>
      <Box sx={{ flex: 1 }}/>
    </Box>
  );
}
