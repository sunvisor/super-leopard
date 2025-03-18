/**
 * SidePanel
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback } from "react";
import { Box, Drawer, IconButton, Tab, Tabs, Toolbar, Tooltip, Typography } from '@mui/material';
import { EditMode } from '../ReportWorkArea';
import CloseIcon from '@mui/icons-material/Close';
import { Shapes } from '@sunvisor/super-leopard-core';
import translation from '../../../translations/translation';
import PropertyTab from './PropertyTab';
import LayerPanel from './LayerPanel';
import ObjectListPanel from '../../objectList/ObjectListPanel';
import { getSettings } from '../../../settings';
import { getFontList } from '../../../font/font';
import useSelection from '../../../hooks/useSelection';


type Props = {
  mode: EditMode;
  open: boolean;
  onClosePanel: (value: boolean) => void;
}

function getAddModeTitle(mode: EditMode): string {
  const t = translation().editModeTool;
  return t[mode];
}

function getEditModeTitle(selection: Shapes): string {
  const { shapeType, operation: { transform } } = translation();
  if (selection.count === 1) {
    return shapeType[selection.get(0).type];
  }
  if (selection.count > 1) {
    return transform;
  }
  return '';
}

function getTitle(selection: Shapes, mode: EditMode): string {
  if (mode === 'edit') {
    return getEditModeTitle(selection);
  }
  return getAddModeTitle(mode);
}


export default function SidePanel(props: Props) {
  const { mode, open, onClosePanel } = props;
  const { selection } = useSelection();
  const settings = getSettings();
  const [tabIndex, setTabIndex] = React.useState(0);
  const t = translation().reportObject;
  const { image: imageOptions, barcode: barcodeOptions } = settings;
  const fontList = getFontList(settings.fontMap);

  const handleDrawerClose = useCallback(() => {
    onClosePanel(false)
  }, [onClosePanel]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const showPropertyTab = useCallback(() => {
    if (tabIndex !== 0) {
      setTabIndex(0);
    }
  }, [tabIndex, setTabIndex]);

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="persistent"
    >
      <Toolbar variant="dense" disableGutters sx={{ px: 1 }}>
        <Box sx={{ flexGrow: 1, mx: 1 }}>
          <Typography variant="subtitle1" color="textSecondary">
            {getTitle(selection, mode)}
          </Typography>
        </Box>
        <Tooltip title={translation().operation.close}>
        <IconButton size="small" onClick={handleDrawerClose}>
          <CloseIcon/>
        </IconButton>
        </Tooltip>
      </Toolbar>
      <Tabs onChange={handleTabChange} value={tabIndex}>
        <Tab label={t.property} value={0}/>
        <Tab label={t.layer} value={1}/>
        <Tab label={t.object} value={2}/>
      </Tabs>
      <Box sx={{ width: 430, height: '100vw', overflow: 'auto' }}>
        {
          tabIndex === 0 && <PropertyTab
            mode={mode}
            fontList={fontList}
            imageOptions={imageOptions}
            errorImageUrl={barcodeOptions.errorImageUrl}
          />
        }
        {
          tabIndex === 1 && <LayerPanel/>
        }
        {
          tabIndex === 2 && <ObjectListPanel showPropertyTab={showPropertyTab}/>
        }
      </Box>
    </Drawer>
  );
}
