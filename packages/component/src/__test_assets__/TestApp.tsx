/**
 * TestApp
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Box, IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { OnSaveHandler, ReportEditor, useReportStates } from '../component';
import { ReportData } from '@sunvisor/super-leopard-core';
import { useCallback, useState } from 'react';
import { testSettings } from './settings';


function HistoryTool() {
  const { undo, redo, canUndo, canRedo } = useReportStates();

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = useCallback(() => {
    redo();
  }, [redo]);

  return (
    <>
      <IconButton size="small" color="inherit" onClick={handleUndo} aria-label={'undo'} disabled={!canUndo}>
        <UndoIcon/>
      </IconButton>
      <IconButton size="small" color="inherit" onClick={handleRedo} aria-label={'redo'} disabled={!canRedo}>
        <RedoIcon/>
      </IconButton>
    </>
  )
}

type Props = {
  report: ReportData;
  title: string;
  onSave: OnSaveHandler;
}

export default function TestApp(props: Props) {
  const [title, setTitle] = useState(props.title);
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <ReportEditor
        report={props.report}
        title={title}
        settings={testSettings}
        onSave={props.onSave}
        onChangeTitle={title => setTitle(title)}
        additionalTools={
          {
            before: <HistoryTool/>
          }
        }
      />
    </Box>
  );
}
