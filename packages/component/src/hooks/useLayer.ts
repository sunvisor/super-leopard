/**
 * UseLayer
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue, useSetAtom } from 'jotai';
import {
  AddLayerAtom,
  ReadActiveLayerIndexAtom,
  RemoveLayerAtom,
  SetActiveLayerIndexAtom, UpdateLayerNameAtom,
  UpdateLayersAtom
} from '@/atom/ReportAtom';
import { useCallback } from 'react';


export default function useLayer() {
  const activeLayerIndex = useAtomValue(ReadActiveLayerIndexAtom);
  const setActiveLayerIndex = useSetAtom(SetActiveLayerIndexAtom);
  const updateLayers = useSetAtom(UpdateLayersAtom);
  const addLayer = useSetAtom(AddLayerAtom);
  const removeLayer = useSetAtom(RemoveLayerAtom);
  const updateLayerName = useSetAtom(UpdateLayerNameAtom)

  const isActive = useCallback(
    (index: number) => {
      return activeLayerIndex === index;
    }, [activeLayerIndex]
  );

  return {
    activeLayerIndex,
    setActiveLayerIndex,
    updateLayers,
    addLayer,
    removeLayer,
    updateLayerName,
    isActive,
  }
}
