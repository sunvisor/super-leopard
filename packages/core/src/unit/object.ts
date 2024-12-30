/**
 * Change Unit
 *
 * Created by sunvisor on 2024/03/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */

import { convertUnit } from './convert';
import { Group, GroupShape, List, ListShape, Shape, Shapes, UnitValue } from '../object';
import { LayerData, PageData, ReportData } from '../data';
import { createShapes } from '../creator';
import { serializeShapes } from '../serializer';

type Converter = (value: number) => number;

export function changeUnit(report: ReportData, fromUnit: UnitValue, toUnit: UnitValue): ReportData {
  const converter = getConverter(fromUnit, toUnit);
  const layers = convertLayers(report.layers, converter) ;
  const page = convertPage(report.page, converter);
  return { ...report, layers, page };
}

export function changeLayersUnit(layers: LayerData[], fromUnit: UnitValue, toUnit: UnitValue): LayerData[] {
  const converter = getConverter(fromUnit, toUnit);
  return convertLayers(layers, converter);
}

export function changeShapesUnit(shapes: Shapes, fromUnit: UnitValue, toUnit: UnitValue): Shapes {
  const converter = getConverter(fromUnit, toUnit);
  return convertShapes(shapes, converter);
}

function getConverter(fromUnit: UnitValue, toUnit: UnitValue): Converter {
  return (source: number): number => {
    return convertUnit(source, fromUnit, toUnit);
  }
}

function convertPage(page: PageData, func: (value: number) => number): PageData {
  const config = page
  return {
    ...config,
    size: (typeof config.size === 'object') ? {
      width: func(config.size.width),
      height: func(config.size.height)
    } : config.size,
    margin: config.margin && {
      top: func(config.margin.top), left: func(config.margin.left),
    }
  }
}

function convertShape(source: Shape, func: (value: number) => number): Shape {
  switch (source.type) {
    case ListShape:
      return convertList(source as List, func);
    case GroupShape:
      return convertGroup(source as Group, func);
    default:
      return source.resize({
        x: func(source.bbox.x),
        y: func(source.bbox.y),
        width: func(source.bbox.width),
        height: func(source.bbox.height),
      }) as Shape;
  }
}

function convertShapes(source: Shapes, func: (value: number) => number): Shapes {
  const shapes = source.map(shape => convertShape(shape, func));
  return new Shapes(shapes);
}

function convertList(source: List, func: (value: number) => number): List {
  const config = source.config
  return new List({
    ...config,
    width: config.width && func(config.width),
    height: config.height && func(config.height),
    shapes: convertShapes(source.shapes, func),
  });
}

function convertGroup(source: Group, func: (value: number) => number): Group {
  const config = source.config
  return new Group({
    ...config,
    width: config.width && func(config.width),
    height: config.height && func(config.height),
    shapes: convertShapes(source.shapes, func),
  });
}

function convertLayers(source: LayerData[], func: (value: number) => number): LayerData[] {
  return source.map(layer => {
    const shapes = createShapes(layer.shapes);
    const updated = convertShapes(shapes, func);
    return {
      ...layer,
      shapes: serializeShapes(updated),
    }
  });
}
