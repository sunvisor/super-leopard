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

const noImageUrl = 'data:image/svg+xml;base64,' +
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz5cbjxzdmcgaWQ9Il9sYXllcl8' +
  'xIiBkYXRhLW5hbWU9ImxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z' +
  'yIgdmlld0JveD0iMCAwIDU2LjAxIDQ4LjQ2Ij5cbiAgPHBhdGggZD0iTTM4LjIsNS43OWMtLjQs' +
  'MC0uOTEtLjI3LTEuMTMtLjU5bC0zLjIyLTQuNjFjLS4yMy0uMzItLjc0LS41OS0xLjEzLS41OWg' +
  'tOS4xM2MtLjQsMC0uOTEuMjctMS4xMy41OWwtMy4yMiw0LjYxYy0uMjMuMzItLjc0LjU5LTEuMT' +
  'MuNTloLTcuNjdjLS40LDAtLjcyLjMyLS43Mi43MnYyMS4yM2MwLC40LjMyLjcyLjcyLjcyaDM1L' +
  'jE4Yy40LDAsLjcyLS4zMi43Mi0uNzJWNi41MWMwLS40LS4zMi0uNzItLjcyLS43MmgtNy40WiIg' +
  'c3R5bGU9ImZpbGw6ICNjNWM1YzU7IHN0cm9rZS13aWR0aDogMHB4OyIvPlxuICA8Y2lyY2xlIGN' +
  '4PSIyOC4wMSIgY3k9IjE3LjA0IiByPSI4LjA2IiBzdHlsZT0iZmlsbDogI2ZmZjsgc3Ryb2tlLX' +
  'dpZHRoOiAwcHg7Ii8-XG4gIDxjaXJjbGUgY3g9IjI4LjAxIiBjeT0iMTcuMDQiIHI9IjUuMTciI' +
  'HN0eWxlPSJmaWxsOiAjYzVjNWM1OyBzdHJva2Utd2lkdGg6IDBweDsiLz5cbiAgPHRleHQgdHJh' +
  'bnNmb3JtPSJ0cmFuc2xhdGUoMCA0NC4zOSkiIHN0eWxlPSJmaWxsOiAjYzVjNWM1OyBmb250LWZ' +
  'hbWlseTogaGVsdmV0aWNhLCBhcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxMnB4OyI-PH' +
  'RzcGFuIHg9IjAiIHk9IjAiPk5PIElNQUdFPC90c3Bhbj48L3RleHQ-XG48L3N2Zz5cbg'

const errorImageUrl = 'data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBl' +
  'bmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc' +
  'iIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCI-CjxyZWN0IH' +
  'dpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiI' +
  'HN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB4MT0iMTAiIHkxPSIyMCIgeDI9IjEwIiB5Mj0iNzAi' +
  'IHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIi8-CjxsaW5lIHgxPSIyNSIgeTE9IjI1IiB' +
  '4Mj0iMjUiIHkyPSI3NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjQiLz4KPGxpbmUgeD' +
  'E9IjQwIiB5MT0iMTUiIHgyPSI0MCIgeTI9IjY1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0a' +
  'D0iMiIvPgo8bGluZSB4MT0iNTUiIHkxPSIzMCIgeDI9IjU1IiB5Mj0iODAiIHN0cm9rZT0iIzAw' +
  'MCIgc3Ryb2tlLXdpZHRoPSI1Ii8-CjxsaW5lIHgxPSI3MCIgeTE9IjIwIiB4Mj0iNzAiIHkyPSI' +
  '2NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9Ijg1IiB5MT0iMT' +
  'AiIHgyPSI4NSIgeTI9IjYwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNCIvPgo8bGluZ' +
  'SB4MT0iMTAwIiB5MT0iMjUiIHgyPSIxMDAiIHkyPSI2NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Ut' +
  'd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjExNSIgeTE9IjE1IiB4Mj0iMTE1IiB5Mj0iNjUiIHN0cm9' +
  'rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSI1Ii8-CjxsaW5lIHgxPSIxMzAiIHkxPSIzMCIgeDI9Ij' +
  'EzMCIgeTI9IjY1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMyIvPgo8bGluZSB4MT0iM' +
  'TQ1IiB5MT0iMjAiIHgyPSIxNDUiIHkyPSI3MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9' +
  'IjQiLz4KPGxpbmUgeDE9IjE2MCIgeTE9IjEwIiB4Mj0iMTYwIiB5Mj0iNjAiIHN0cm9rZT0iIzA' +
  'wMCIgc3Ryb2tlLXdpZHRoPSIyIi8-CjxsaW5lIHgxPSIxNzUiIHkxPSIyNSIgeDI9IjE3NSIgeT' +
  'I9Ijc1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNSIvPgo8bGluZSB4MT0iMTkwIiB5M' +
  'T0iMTUiIHgyPSIxOTAiIHkyPSI2NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4K' +
  'PGxpbmUgeDE9IjEwIiB5MT0iMTAiIHgyPSIxOTAiIHkyPSI5MCIgc3Ryb2tlPSIjZDNkM2QzIiB' +
  'zdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8bGluZSB4MT0iMTkwIi' +
  'B5MT0iMTAiIHgyPSIxMCIgeTI9IjkwIiBzdHJva2U9IiNkM2QzZDMiIHN0cm9rZS13aWR0aD0iN' +
  'yIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8-Cjx0ZXh0IHg9IjEwMCIgeT0iODUiIGZvbnQtZmFt' +
  'aWx5PSJoZWx2ZXRpY2EsIGFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXd' +
  'laWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCI-RVJST1I8L3' +
  'RleHQ-CiAgPC9zdmc-Cg';

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

export default function index() {

}
