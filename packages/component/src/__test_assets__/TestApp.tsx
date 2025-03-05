/**
 * TestApp
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Box, IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { ReportEditor, ReportId, useReportStates } from '../component';
import { ReportData } from '@sunvisor/super-leopard-core';
import { billTestData } from '@sunvisor/super-leopard-test-assets';
import { useCallback } from 'react';

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

export default function TestApp() {
  return (
    <Box>
      <ReportEditor
        reportId={1}
        report={billTestData}
        title="Bill"
        onSave={function (id: ReportId, title: string, report: ReportData): void {
          throw new Error(`Function not implemented. ${id}, ${title}, ${report}`);
        }}
        additionalTools={
          {
            before: <HistoryTool/>
          }
        }
      />
    </Box>
  );
}
