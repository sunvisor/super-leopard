import { StrokeData } from '@svgdotjs/svg.js';
import { WebFontMap } from '../../font';
import { ColorConfig } from '@sunvisor/super-leopard-core';

export type StrokeOptions = {
  stroke: StrokeData;
  attr: object;
}

export type BoundingBoxOptions = {
  handleSize: number;
  stroke: StrokeOptions;
}

export type RubberBandOptions = {
  stroke: StrokeOptions;
  dragThreshold: number;
}

export type LineSelectOptions = {
  minTolerance: number;
}

export type DefaultShapeSize = {
  width: number;
  height: number;
}

export type DesignModeOptions = {
  textBorder: ColorConfig;
  fieldBorder: ColorConfig;
}

export type SettingData = {
  boundingBox: BoundingBoxOptions;
  rubberBand: RubberBandOptions;
  lineSelect: LineSelectOptions;
  /**
   * default shape size by point
   */
  defaultShapeSize: DefaultShapeSize;
  designMode: DesignModeOptions;
  fontMap: WebFontMap;
}

export const defaultSettings: SettingData = {
  boundingBox: {
    handleSize: 6,
    stroke: {
      stroke: { color: 'lightgray', width: 1 },
      attr: { 'stroke-dasharray': '1 1' }
    }
  },
  rubberBand: {
    stroke: {
      stroke: { color: 'gray', width: 1 },
      attr: { 'stroke-dasharray': '1 2' }
    },
    dragThreshold: 2,
  },
  lineSelect: {
    minTolerance: 3,
  },
  defaultShapeSize: {
    width: 72,
    height: 72,
  },
  designMode: {
    textBorder: '#d3d3d3',
    fieldBorder: '#3be5e5',
  },
  fontMap: {}
}

