/**
 * ShapeState
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  BarcodeData,
  BarcodeShape,
  BorderData,
  Box,
  CircleData,
  CircleShape, ColorData,
  EllipseData,
  EllipseShape,
  FontData,
  ImageData,
  ImageShape,
  LineData,
  LineShape,
  RectData,
  RectShape, sampleBarcodeValues,
  ShapeData,
  ShapeType,
  TextData,
  TextShape,
} from '@sunvisor/super-leopard-core';

type PreviousStates = {
  box: Box;
  border: BorderData | undefined;
  fillColor: string | undefined;
  font: FontData;
  src: string;
  value: string;
}

export type StylesData = {
  border: BorderData | undefined,
  fillColor: ColorData | undefined,
  font: FontData,
}

const defaultBarcode: BarcodeData = {
  type: 'barcode',
  format: 'code128',
  value: sampleBarcodeValues['code128'],
  x: 0,
  y: 0,
  width: 0,
  height: 0
}

export default class ShapeState {

  #prev: PreviousStates;
  readonly #defaultStyle: StylesData;

  constructor(prevShape: ShapeData, defaultStyle: StylesData) {
    this.#prev = this.savePreviousStatus(prevShape);
    this.#defaultStyle = defaultStyle;
  }

  setPreviousState(prevShape: ShapeData) {
    this.#prev = {
      ...this.#prev,
      ...this.savePreviousStatus(prevShape)
    };
  }

  states(type: ShapeType): ShapeData {
    switch (type) {
      case LineShape:
        return {
          ...this.#prev.box,
          type,
          x1: this.#prev.box.x,
          y1: this.#prev.box.y,
          x2: this.#prev.box.x + this.#prev.box.width,
          y2: this.#prev.box.y + this.#prev.box.height,
          border: this.#prev.border || this.#defaultStyle.border,
        } as LineData;
      case RectShape:
        return {
          ...this.#prev.box,
          type,
          x: this.#prev.box.x,
          y: this.#prev.box.y,
          width: this.#prev.box.width,
          height: this.#prev.box.height,
          fillColor: this.#prev.fillColor,
          border: this.#prev.border,
        } as RectData;
      case CircleShape:
        return {
          ...this.#prev.box,
          type,
          x: this.#prev.box.x,
          y: this.#prev.box.y,
          diameter: this.#prev.box.width,
          fillColor: this.#prev.fillColor,
          border: this.#prev.border,
        } as CircleData;
      case EllipseShape:
        return {
          ...this.#prev.box,
          type,
          x: this.#prev.box.x,
          y: this.#prev.box.y,
          width: this.#prev.box.width,
          height: this.#prev.box.height,
          fillColor: this.#prev.fillColor,
          border: this.#prev.border,
        } as EllipseData;
      case ImageShape:
        return {
          ...this.#prev.box,
          type,
          src: this.#prev.src,
        } as ImageData;
      case BarcodeShape:
        return {
          ...defaultBarcode,
          ...this.#prev.box,
          type,
          x: this.#prev.box.x,
          y: this.#prev.box.y,
          width: this.#prev.box.width,
          height: this.#prev.box.height,
          value: this.#prev.value,
        } as BarcodeData;
      case TextShape:
        return {
          ...this.#prev.box,
          type,
          x: this.#prev.box.x,
          y: this.#prev.box.y,
          width: this.#prev.box.width,
          height: this.#prev.box.height,
          text: '',
          font: this.#prev.font || this.#defaultStyle.font,
        } as TextData;
    }
    throw new Error(`Unknown shape type: ${type}`);
  }

  savePreviousStatus(data: ShapeData): PreviousStates {
    const type = data.type;
    switch (type) {
      case LineShape:
        return {
          ...this.#prev,
          box: { x: data.x1, y: data.y1, width: data.x2 - data.x1, height: data.y2 - data.y1 },
          border: data.border,
        };
      case RectShape:
        return {
          ...this.#prev,
          box: { x: data.x, y: data.y, width: data.width, height: data.height },
          border: data.border,
          fillColor: data.fillColor,
        };
      case CircleShape:
        return {
          ...this.#prev,
          box: { x: data.x, y: data.y, width: data.diameter, height: data.diameter },
          border: data.border,
          fillColor: data.fillColor,
        };
      case EllipseShape:
        return {
          ...this.#prev,
          box: { x: data.x, y: data.y, width: data.width, height: data.height },
          border: data.border,
          fillColor: data.fillColor,
        }
      case ImageShape:
        return {
          ...this.#prev,
          box: { x: data.x, y: data.y, width: data.width, height: data.height },
        }
      case BarcodeShape:
        return {
          ...this.#prev,
          box: { x: data.x, y: data.y, width: data.width, height: data.height },
        }
      case TextShape:
        return {
          ...this.#prev,
          box: { x: data.x, y: data.y, width: data.width, height: data.height },
          fillColor: data.fillColor,
          font: data.font,
        }
    }
    throw new Error(`Unknown shape type: ${type}`);
  }


}


