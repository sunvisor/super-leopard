/**
 * LayerPanel
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box } from "@mui/material";
import { useCallback } from "react";
import LayerToolbar from './LayerToolbar';
import LayerList from './LayerList';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  AddLayerAtom,
  ReadActiveLayerIndexAtom,
  RemoveLayerAtom,
  SetActiveLayerIndexAtom,
  UpdateLayerNameAtom,
  UpdateLayersAtom
} from '../../../atom/ReportAtom';
import { LayerData } from '@sunvisor/super-leopard-core';
import useReport from '../../../hooks/useReport';

export default function LayerPanel() {
  const {report} = useReport();
  const activeLayerIndex = useAtomValue(ReadActiveLayerIndexAtom);
  const setActiveLayerIndex = useSetAtom(SetActiveLayerIndexAtom);
  const updateLayers = useSetAtom(UpdateLayersAtom);
  const removeLayer = useSetAtom(RemoveLayerAtom);
  const updateLayerName = useSetAtom(UpdateLayerNameAtom)
  const addLayer = useSetAtom(AddLayerAtom);

  const handleAddLayer = useCallback(
    () => {
      addLayer();
    }, [addLayer]
  );

  const handleChangeOrder = useCallback(
    (layers: LayerData[], activeLayerIndex: number) => {
      updateLayers(layers, activeLayerIndex);
    }, [updateLayers]
  );

  const handleChangeActiveLayer = useCallback(
    (index: number) => {
      setActiveLayerIndex(index);
    }, [setActiveLayerIndex]
  );

  const handleRemoveLayer = useCallback(
    (index: number) => {
      removeLayer(index);
    }, [removeLayer]
  );

  const handleRenameLayer = useCallback(
    (index: number, name: string) => {
      updateLayerName(index, name);
    }, [updateLayerName]
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      <LayerToolbar
        onAddLayer={handleAddLayer}
      />
      <LayerList
        layers={report.layers}
        activeLayerIndex={activeLayerIndex}
        onChangeOrder={handleChangeOrder}
        onChangeActiveLayer={handleChangeActiveLayer}
        onRemoveLayer={handleRemoveLayer}
        onRenameLayer={handleRenameLayer}
      />
    </Box>
  );
}
