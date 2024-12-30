/**
 * Report
 *
 * Created by sunvisor on 2024/03/04.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { FieldData, GroupData, LayerData, ListData, ReportData, ShapeData } from '../data';
import { List, ListShape } from '../object';
import { createList } from '../creator';

export function updateLayers(report: ReportData, layers: LayerData[]): ReportData {
  if (layersHasMultipleList(layers)) {
    throw new Error('Report cannot have multiple List.');
  }
  return {
    ...report,
    layers,
  };
}

export function reportHasList(report: ReportData): boolean {
  return layersHasList(report.layers);
}

export function layersHasList(layers: LayerData[]): boolean {
  return layers.some(
    layer => layer.shapes.some(
      item => item.type === ListShape
    )
  );
}

export function layersHasMultipleList(layers: LayerData[]): boolean {
  return layers.some(
    layer => layer.shapes.filter(
      item => item.type === ListShape
    ).length > 1
  );
}

export function getListFromReport(report: ReportData): List | undefined {
  const listData = report.layers
    .flatMap(layer => layer.shapes)
    .find(shape => shape.type === ListShape) as ListData | undefined;

  return listData ? createList(listData) : undefined;
}

type ReportDetails = Record<string, string | boolean>;
type ReportValues = Record<string, string | boolean | ReportDetails>;

/**
 * Get expected data structure from report
 *
 * @param report
 */
export function getReportSchema(report: ReportData): ReportValues {
  const result: ReportValues = {};

  report.layers.forEach(layer => {
    const layerResult: ReportValues = collectFields(layer.shapes);
    Object.keys(layerResult).forEach(key => {
      result[key] = layerResult[key];
    });
  });
  return result;
}

function collectFields(shapes: ShapeData[]): ReportValues {
  const result: Record<string, any> = {};
  shapes.filter(shape => shape.type === 'field').forEach(field => {
    const data = field as FieldData;
    result[data.name] = data.shape.type === 'text' ? 'string' : 'boolean';
  });
  shapes.filter(shape => shape.type === 'list').forEach(list => {
    result.details = collectFields((list as ListData).shapes);
  });
  shapes.filter(shape => shape.type === 'group').forEach(group => {
    const groupResult: ReportValues = collectFields((group as GroupData).shapes);
    Object.keys(groupResult).forEach(key => {
      result[key] = groupResult[key];
    });
  });
  return result;
}
