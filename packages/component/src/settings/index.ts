/**
 * Index
 *
 * Created by sunvisor on 2025/02/20.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { WebFontMap } from '../font';
import { ColorData } from '@sunvisor/super-leopard-core';
import { StrokeOptions } from '../svgDriver';
import { ImageListData } from '../component';
export * from './getSettings';

/**
 * Returns the actual url of the image
 *
 * @param {string} src  Image object
 * @returns The url of the file on the web, or the encoded dataUrl
 */
export type GetImageUrl = (src: string) => string;

/**
 * Options for drawing bounding box
 */
export type BoundingBoxOptions = {
  handleSize: number;
  stroke?: StrokeOptions;
}

/**
 * Options for drawing rubber band
 */
export type RubberBandOptions = {
  stroke: StrokeOptions;
  /**
   * threshold for drag start
   */
  dragThreshold: number;
}

/**
 * Option for line select
 */
export type LineSelectOptions = {
  /**
   * threshold for line select
   */
  minTolerance: number;
}

/**
 * default shape size (pt)
 */
export type DefaultShapeSize = {
  width: number;
  height: number;
}

/**
 * Options for design mode
 */
export type DesignModeOptions = {
  textBorder: ColorData;
  fieldBorder: ColorData;
}

/**
 * Options for image
 */
export type ImageOptions = {
  /**
   * function returns the actual url of the image
   */
  getImageUrl: GetImageUrl;
  /**
   * alternate image url when src is empty
   */
  noImageUrl: string;
  /**
   * async function returns image list
   */
  getImageList: () => Promise<ImageListData[]>;
}

export type BarcodeOptions = {
  /**
   * alternate image url barcode value is invalid
   */
  errorImageUrl: string;
}

export type SettingData = {
  boundingBox: BoundingBoxOptions;
  rubberBand: RubberBandOptions;
  lineSelect: LineSelectOptions;
  defaultShapeSize: DefaultShapeSize;
  designMode: DesignModeOptions;
  fontMap: WebFontMap;
  image: ImageOptions;
  barcode: BarcodeOptions;
}


// noinspection SpellCheckingInspection
const noImageUrl = 'data:image/svg+xml;base64,' +
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0ibGF5ZXJ' +
  'fMSIgZGF0YS1uYW1lPSJsYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
  '9zdmciIHZpZXdCb3g9IjAgMCA1Ni4wMSA0OC40NiI+CjxwYXRoIGQ9Ik0zOC4yLDUuNzljL' +
  'S40LDAtLjkxLS4yNy0xLjEzLS41OWwtMy4yMi00LjYxYy0uMjMtLjMyLS43NC0uNTktMS4x' +
   'My0uNTloLTkuMTNjLS40LDAtLjkxLjI3LTEuMTMuNTlsLTMuMjIsNC42MWMtLjIzLjMyLS' +
  '43NC41OS0xLjEzLjU5aC03LjY3Yy0uNCwwLS43Mi4zMi0uNzIuNzJ2MjEuMjNjMCwuNC4zM' +
  'i43Mi43Mi43MmgzNS4xOGMuNCwwLC43Mi0uMzIuNzItLjcyVjYuNTFjMC0uNC0uMzItLjcy' +
  'LS43Mi0uNzJoLTcuNFoiIHN0eWxlPSJmaWxsOiAjYzVjNWM1OyBzdHJva2Utd2lkdGg6IDB' +
  'weDsiLz4KPGNpcmNsZSBjeD0iMjguMDEiIGN5PSIxNy4wNCIgcj0iOC4wNiIgc3R5bGU9Im' +
  'ZpbGw6ICNmZmY7IHN0cm9rZS13aWR0aDogMHB4OyIvPgo8Y2lyY2xlIGN4PSIyOC4wMSIgY' +
  '3k9IjE3LjA0IiByPSI1LjE3IiBzdHlsZT0iZmlsbDogI2M1YzVjNTsgc3Ryb2tlLXdpZHRo' +
  'OiAwcHg7Ii8+Cjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNDQuMzkpIiBzdHlsZT0' +
  'iZmlsbDogI2M1YzVjNTsgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2' +
  'VyaWY7IGZvbnQtc2l6ZTogMTJweDsiPjx0c3BhbiB4PSIwIiB5PSIwIj5OTyBJTUFHRTwvd' +
  'HNwYW4+PC90ZXh0Pgo8L3N2Zz4K';

// noinspection SpellCheckingInspection
const errorImageUrl = 'data:image/svg+xml;base64,' +
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR' +
  '0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiB2aW' +
  'V3Qm94PSIwIDAgMjAwIDEwMCI+CiAgICA8IS0tIGJhY2tncm91bmQgLS0+CiAgICA8cmVjd' +
  'CB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAw' +
  'MDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KCiAgICA8IS0tIGJyb2tlbiBiYXJjb2RlIC0tPgo' +
  'gICAgPGxpbmUgeDE9IjEwIiB5MT0iMjAiIHgyPSIxMCIgeTI9IjcwIiBzdHJva2U9IiMwMD' +
  'AiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGxpbmUgeDE9IjI1IiB5MT0iMjUiIHgyPSIyN' +
  'SIgeTI9Ijc1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgPGxpbmUg' +
  'eDE9IjQwIiB5MT0iMTUiIHgyPSI0MCIgeTI9IjY1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1' +
  '3aWR0aD0iMiIvPgogICAgPGxpbmUgeDE9IjU1IiB5MT0iMzAiIHgyPSI1NSIgeTI9IjgwIi' +
  'BzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNSIvPgogICAgPGxpbmUgeDE9IjcwIiB5M' +
  'T0iMjAiIHgyPSI3MCIgeTI9IjY1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMyIv' +
  'PgogICAgPGxpbmUgeDE9Ijg1IiB5MT0iMTAiIHgyPSI4NSIgeTI9IjYwIiBzdHJva2U9IiM' +
  'wMDAiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgPGxpbmUgeDE9IjEwMCIgeTE9IjI1IiB4Mj' +
  '0iMTAwIiB5Mj0iNjUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8b' +
  'GluZSB4MT0iMTE1IiB5MT0iMTUiIHgyPSIxMTUiIHkyPSI2NSIgc3Ryb2tlPSIjMDAwIiBz' +
  'dHJva2Utd2lkdGg9IjUiLz4KICAgIDxsaW5lIHgxPSIxMzAiIHkxPSIzMCIgeDI9IjEzMCI' +
  'geTI9IjY1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGxpbmUgeD' +
  'E9IjE0NSIgeTE9IjIwIiB4Mj0iMTQ1IiB5Mj0iNzAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlL' +
  'XdpZHRoPSI0Ii8+CiAgICA8bGluZSB4MT0iMTYwIiB5MT0iMTAiIHgyPSIxNjAiIHkyPSI2' +
  'MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSIxNzU' +
  'iIHkxPSIyNSIgeDI9IjE3NSIgeTI9Ijc1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD' +
  '0iNSIvPgogICAgPGxpbmUgeDE9IjE5MCIgeTE9IjE1IiB4Mj0iMTkwIiB5Mj0iNjUiIHN0c' +
  'm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIi8+CgogICAgPCEtLSBlcnJvciBtYXJrIC0t' +
  'PgogICAgPGxpbmUgeDE9IjEwIiB5MT0iMTAiIHgyPSIxOTAiIHkyPSI5MCIgc3Ryb2tlPSI' +
  'jZDNkM2QzIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIC' +
  'AgPGxpbmUgeDE9IjE5MCIgeTE9IjEwIiB4Mj0iMTAiIHkyPSI5MCIgc3Ryb2tlPSIjZDNkM' +
  '2QzIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgoKICAgIDwh' +
  'LS0gRVJST1IgdGV4dCAtLT4KICAgIDx0ZXh0IHg9IjEwMCIgeT0iODUiIGZvbnQtZmFtaWx' +
  '5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LW' +
  'FuY2hvcj0ibWlkZGxlIiBmaWxsPSIjODA4MDgwIj5FUlJPUjwvdGV4dD4KPC9zdmc+Cg==';

const fontMap: WebFontMap = {
  TimesRoman: {
    label: 'Times Roman',
    family: 'Times New Roman',
    weight: {
      regular: 'normal',
      bold: 'bold',
    },
    style: ['bold', 'italic'],
  },
  Helvetica: {
    label: 'Helvetica',
    family: 'Helvetica',
    weight: {
      regular: 'normal',
      bold: 'bold',
    },
    style: ['bold', 'italic'],
  },
  Courier: {
    label: 'Courier',
    family: 'Courier',
    weight: {
      regular: 'normal',
      bold: 'bold',
    },
    style: ['bold', 'italic'],
  },
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
  fontMap,
  image: {
    getImageUrl: (src) => src,
    noImageUrl,
    getImageList: async () => [],
  },
  barcode: {
    errorImageUrl,
  }
}
