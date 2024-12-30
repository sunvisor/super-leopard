'use client';
/**
 * Editor
 *
 * Created by sunvisor on 2024/03/06.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Box } from '@mui/material';
import ReportWorkArea from '../reportEditor/ReportWorkArea';
import EditToolbar from '../toolbar/EditToolbar';
import { EditMode } from './ReportWorkArea';
import FooterToolbar from '../toolbar/FooterToolbar';
import { ReportData } from '@sunvisor/super-leopard-core';
import { useAtomValue, useSetAtom } from 'jotai';
import { ApplyShapesToReportAtom, ReadReportAtom, SetReportAtom } from '../../atom/ReportAtom';
import { ClearSelectionAtom } from '../../atom/SelectionAtom';
import DrawToolbar from '../toolbar/DrawToolbar';
import SidePanel from './side/SidePanel';
import { SetFontMapAtom } from '../../atom/SettingsAtom';
import { GetSvgImagePath } from '../../svg';
import { FontList, WebFontMap } from '../../font';
import { setLanguage } from '../../captions/getCaptions';

export type OnSaveHandler = (id: ReportId, title: string, report: ReportData) => void;
export type ReportId = number | 'new';

type Props = {
  data?: ReportData;
  reportId: ReportId;
  title: string;
  onSave: OnSaveHandler;
  webFontMap: WebFontMap;
  getImageUrl: GetSvgImagePath;
  apiBaseUrl: string;
  language?: string;
  fontList: FontList;
}

export default function ReportEditor(props: Props) {
  const { data, reportId, onSave, webFontMap, getImageUrl, apiBaseUrl, language, fontList } = props;
  const [title, setTitle] = useState<string>(props.title);
  const applyShapes = useSetAtom(ApplyShapesToReportAtom);
  const clearSelection = useSetAtom(ClearSelectionAtom);
  const report = useAtomValue(ReadReportAtom);
  const setReport = useSetAtom(SetReportAtom);
  const setFontMap = useSetAtom(SetFontMapAtom);
  const [mode, setMode] = React.useState<EditMode>("edit");
  const [zoom, setZoom] = useState<number>(100);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setFontMap(webFontMap);
    if (data) setReport(data);
    if (language) setLanguage(language);
  }, [data, setFontMap, setReport, language, webFontMap]);

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
    <Box sx={{ width: '100vw', height: '100vh', padding: 0 }}>
      <AppBar position="sticky">
        <EditToolbar
          title={title}
          onSave={handleSave}
          onChangeTitle={handleChangeTitle}
          onPropertyOpen={() => setOpen(true)}
        />
      </AppBar>
      <Box sx={{ width: '100%', height: '100%', padding: 0, display: 'flex' }}>
        <DrawToolbar onChange={handleChangeTool}/>
        <ReportWorkArea
          mode={mode}
          zoom={zoom / 100}
          getImageUrl={getImageUrl}
        />
      </Box>
      <AppBar position="sticky" sx={{ top: 'auto', bottom: 0 }} color="default">
        <FooterToolbar
          onChange={handleChangeZoom}
        />
      </AppBar>
      <SidePanel
        mode={mode}
        open={open}
        apiBaseUrl={apiBaseUrl}
        onClosePanel={() => setOpen(false)}
        fontList={fontList}
      />
    </Box>

  );
}
