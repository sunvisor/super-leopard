/**
 * Layer
 *
 * Created by sunvisor on 2024/03/04.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Shapes } from '../object';
import { serializeShapes } from '../serializer';
import { LayerData } from '../data';

export function updateLayerShapes(layer: LayerData, shapes: Shapes): LayerData {
  return { ...layer, shapes: serializeShapes(shapes) };
}

export function updateLayerName(layer: LayerData, name: string): LayerData {
  return { ...layer, name };
}

export function updateLayer(layers: LayerData[], index: number, layer: LayerData): LayerData[] {
  const newLayers = [...layers];
  newLayers[index] = layer;
  return newLayers;
}

export function removeLayer(layers: LayerData[], index: number): LayerData[] {
  const newLayers = [...layers];
  newLayers.splice(index, 1);
  return newLayers;
}

export function addLayer(layers: LayerData[], layer: LayerData): LayerData[] {
  const newLayers = [...layers];
  newLayers.push(layer);
  return newLayers;
}
