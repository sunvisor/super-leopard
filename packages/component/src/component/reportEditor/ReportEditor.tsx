/**
 * Editor
 *
 * Created by sunvisor on 2024/03/06.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { AppBar, Box } from '@mui/material';
import ReportWorkArea from '../reportEditor/ReportWorkArea';
import EditToolbar from '../toolbar/EditToolbar';
import { EditMode } from './ReportWorkArea';
import FooterToolbar from '../toolbar/FooterToolbar';
import { ReportData } from '@sunvisor/super-leopard-core';
import DrawToolbar from '../toolbar/DrawToolbar';
import SidePanel from './side/SidePanel';
import { setLanguage } from '../../translations/translation';
import { setSettings, SettingData } from '../../settings';
import useReport from '../../hooks/useReport';
import useSelection from '../../hooks/useSelection';
import { emptyReport } from '../emptyReport';


export type OnSaveHandler = (id: ReportId, title: string, report: ReportData) => void;
export type ReportId = number | 'new';

type Props = {
  report?: ReportData;
  reportId: ReportId;
  title: string;
  language?: string;
  onSave: OnSaveHandler;
  settings?: SettingData;
  showSaveButton?: boolean;
  additionalTools?: {
    before?: ReactNode;
    after?: ReactNode;
  }
}

export default function ReportEditor(props: Props) {
  const { report: data, reportId, onSave, language, settings } = props;
  const [title, setTitle] = useState<string>(props.title);
  const { clearSelection } = useSelection();
  const { report, setReport, applyShapes } = useReport();
  const [mode, setMode] = React.useState<EditMode>("edit");
  const [zoom, setZoom] = useState<number>(100);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setReport(data || emptyReport);
    if (language) setLanguage(language);
    if (settings) setSettings(settings);
  }, [data, setReport, language]);

  const handleChangeTool = useCallback((_: React.MouseEvent<HTMLElement>, newMode: EditMode) => {
    setMode(newMode);
  }, [setMode]);

  const handleChangeZoom = useCallback((_: Event, value: number) => {
    setZoom(value);
  }, [setZoom]);

  const handleChangeTitle = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, [setTitle]);

  const handleSave = useCallback(async () => {
    applyShapes();
    onSave(reportId, title, report);
    clearSelection();
  }, [applyShapes, onSave, title, report, clearSelection]);

  return (
    <Box sx={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky">
        <EditToolbar
          title={title}
          onSave={handleSave}
          onChangeTitle={handleChangeTitle}
          onPropertyOpen={() => setOpen(true)}
          additionalTools={props.additionalTools}
          showSaveButton={props.showSaveButton}
        />
      </AppBar>
      <Box sx={{ padding: 0, display: 'flex', overflow: 'hidden', flex: 1 }}>
        <DrawToolbar onChange={handleChangeTool}/>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <ReportWorkArea
            mode={mode}
            zoom={zoom / 100}
          />
        </Box>
      </Box>
      <AppBar position="sticky" sx={{ top: 'auto', bottom: 0 }} color="default">
        <FooterToolbar
          onChange={handleChangeZoom}
        />
      </AppBar>
      <SidePanel
        mode={mode}
        open={open}
        onClosePanel={() => setOpen(false)}
      />
    </Box>

  );
}
