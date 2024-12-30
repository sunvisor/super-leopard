/**
 * SidePanel
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback } from "react";
import { Box, Drawer, IconButton, Tab, Tabs, Toolbar } from '@mui/material';
import { EditMode } from '../ReportWorkArea';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Shapes } from '@sunvisor/super-leopard-core';
import getCaptions from '../../../captions/getCaptions';
import { useAtomValue } from 'jotai/index';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import PropertyTab from './PropertyTab';
import LayerPanel from './LayerPanel';
import ObjectListPanel from '../../objectList/ObjectListPanel';
import { FontList } from '../../../font';

type Props = {
  mode: EditMode;
  open: boolean;
  onClosePanel: (value: boolean) => void;
  apiBaseUrl: string;
  fontList: FontList;
}

function getAddModeTitle(mode: EditMode): string {
  const captions = getCaptions('editModeTool');
  return captions[mode];
}

function getEditModeTitle(selection: Shapes): string {
  const captions = getCaptions('shapeType');
  const { transform } = getCaptions('operation');
  if (selection.count === 1) {
    return captions[selection.get(0).type];
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
  const { mode, open, onClosePanel, apiBaseUrl, fontList } = props;
  const selection = useAtomValue(SelectionAtom);
  const [tabIndex, setTabIndex] = React.useState(0);
  const captions = getCaptions('reportObject');

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
      <Toolbar variant="dense" disableGutters>
        <IconButton size="small" onClick={handleDrawerClose}>
          <ChevronRightIcon/>
          {getTitle(selection, mode)}
        </IconButton>
      </Toolbar>
      <Tabs onChange={handleTabChange} value={tabIndex}>
        <Tab label={captions.property} value={0}/>
        <Tab label={captions.layer} value={1}/>
        <Tab label={captions.object} value={2}/>
      </Tabs>
      <Box sx={{ width: 430, height: '100vw', overflow: 'scroll' }}>
        {
          tabIndex === 0 && <PropertyTab
            mode={mode}
            apiBaseUrl={apiBaseUrl}
            fontList={fontList}
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
