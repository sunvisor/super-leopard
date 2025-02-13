import { WebFontMap } from '../../font';
import { ColorConfig } from '@sunvisor/super-leopard-core';
import { StrokeOptions } from '../../svgDriver';

export type BoundingBoxOptions = {
  handleSize: number;
  stroke?: StrokeOptions;
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
      style: 'dotted', color: '#d3d3d3', width: 1,
    }
  },
  rubberBand: {
    stroke: {
      style: 'dashed', color: '#808080', width: 1,
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

