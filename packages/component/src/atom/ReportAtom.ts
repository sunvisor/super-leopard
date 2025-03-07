/**
 * Report Atom
 *
 * Created by sunvisor on 2024/02/10.
 * Copyright (C) Sunvisor Lab. 2024.
 */

import { atom } from 'jotai';
import {
  ReportData,
  updateLayers,
  Page,
  createShapes,
  Shapes,
  createScale,
  Scale,
  createPage,
  addLayer,
  LayerData,
  removeLayer,
  updateLayer,
  updateLayerName,
  updateLayerShapes, UnitType
} from '@sunvisor/super-leopard-core';
import { ClearDirtyAtom, ClearHistoryAtom, PushHistoryAtom } from './HistoryAtom';

const emptyReport: ReportData = {
  page: {
    size: 'A4',
    orientation: 'portrait',
    unit: UnitType.MILLIMETER,
  },
  layers: [
    {name: 'layer1', shapes: []}
  ],
}

/**
 * primitive atoms
 */
const ReportAtom = atom<ReportData>(emptyReport);

const PageAtom = atom<Page>(createPage(emptyReport.page));

const ActiveLayerIndexAtom = atom<number>(0);

const ShapesAtom = atom<Shapes>(new Shapes([]));

const ScaleAtom = atom<Scale>(createScale(emptyReport.page.unit))

/**
 * read only atoms
 */
export const ReadReportAtom = atom((get) => get(ReportAtom));

export const ReadShapesAtom = atom((get) => get(ShapesAtom));

export const ReadPageAtom = atom((get) => get(PageAtom));

export const ReadActiveLayerIndexAtom = atom((get) => get(ActiveLayerIndexAtom));

export const ReadScaleAtom = atom((get) => get(ScaleAtom));

/**
 * Set Report and add history
 * Only used in open report or create new report
 */
export const SetReportAtom = atom(null, (_, set, report: ReportData, activeLayerIndex: number = 0) => {
  set(ClearHistoryAtom);
  set(RestoreReportAtom, report, activeLayerIndex);
  set(PushHistoryAtom, {
    report,
  });
  set(ClearDirtyAtom);
  set(ScaleAtom, createScale(report.page.unit, report.page.margin));
});

/**
 * Set Report without add history
 */
export const RestoreReportAtom = atom(null, (_, set, report: ReportData, activeLayerIndex: number = 0) => {
  const shapes = createShapes(report.layers[activeLayerIndex].shapes);
  set(PageAtom, createPage(report.page));
  set(ReportAtom, report);
  set(ActiveLayerIndexAtom, activeLayerIndex);
  set(ShapesAtom, shapes);
});

const SetLayersAtom = atom(null, (get, set, layers: LayerData[]) => {
  const report = get(ReportAtom);
  const newReport = updateLayers(report, layers);
  set(ReportAtom, newReport);
});

/**
 * Updates the shapes of the active layer in the report.
 */
export const ApplyShapesToReportAtom= atom(null, (get, set) => {
  const index = get(ActiveLayerIndexAtom);
  const report = get(ReportAtom);
  const newLayer = updateLayerShapes(report.layers[index], get(ShapesAtom));
  const newLayers = updateLayer(report.layers, index, newLayer);
  const newReport = updateLayers(report, newLayers);
  set(ReportAtom, newReport);
});

/**
 * Update whole layers
 */
export const UpdateLayersAtom = atom(null, (get, set, layers: LayerData[], activeLayerIndex: number) => {
  const report = get(ReportAtom);
  const newReport = updateLayers(report, layers);
  set(RestoreReportAtom, newReport, activeLayerIndex);
  set(PushHistoryAtom, { report: newReport });
});

export const AddLayerAtom = atom(null, (get, set) => {
  const report = get(ReportAtom);
  const name = `Layer ${report.layers.length + 1}`;
  const newLayers = addLayer(report.layers, {name, shapes: []});
  set(SetLayersAtom, newLayers);
  set(SetActiveLayerIndexAtom, newLayers.length - 1);
  set(PushHistoryAtom, { report: get(ReportAtom) });
});

export const RemoveLayerAtom = atom(null, (get, set, index: number) => {
  const activeLayerIndex = get(ActiveLayerIndexAtom);
  const report = get(ReportAtom);
  const newLayers = removeLayer(report.layers, index);
  const activeIndex = newLayers.indexOf(report.layers[activeLayerIndex]);
  const newIndex = activeLayerIndex !== index
    ? activeIndex
    : index > 0 ? index - 1 : 0;
  set(SetActiveLayerIndexAtom, newIndex);
  set(SetLayersAtom, newLayers);
  set(PushHistoryAtom, { report: get(ReportAtom) });
});

export const UpdateLayerNameAtom = atom(null, (get, set, index: number, name: string) => {
  const activeLayerIndex = get(ActiveLayerIndexAtom);
  const report = get(ReportAtom);
  const newLayer = updateLayerName(report.layers[index], name);
  const newLayers = updateLayer(report.layers, index, newLayer);
  set(SetActiveLayerIndexAtom, activeLayerIndex);
  set(SetLayersAtom, newLayers);
  set(PushHistoryAtom, { report: get(ReportAtom) });
});

export const SetActiveLayerIndexAtom = atom(null, (get, set, index: number) => {
  if (get(ActiveLayerIndexAtom) === index) return;
  set(ApplyShapesToReportAtom);
  set(ActiveLayerIndexAtom, index);
  const layer = get(ActiveLayerAtom);
  const shapes = createShapes(layer.shapes);
  set(ShapesAtom, shapes);
});

export const SetZoomAtom = atom(null, (get, set, zoom: number) => {
  const scale = get(ScaleAtom);
  const newScale = scale.setZoom(zoom);
  set(ScaleAtom, newScale);
});

/**
 * Represents an atom that provides the active layer data from a report.
 */
export const ActiveLayerAtom = atom<LayerData>((get) => {
  const report = get(ReportAtom);
  const activeLayerIndex = get(ActiveLayerIndexAtom);
  return report.layers[activeLayerIndex];
});


/**
 * Set shapes and add history
 */
export const SetShapesAtom = atom(null, (get, set, shapes: Shapes) => {
  set(ShapesAtom, shapes);
  set(ApplyShapesToReportAtom);
  set(PushHistoryAtom, { report: get(ReportAtom) });
});
