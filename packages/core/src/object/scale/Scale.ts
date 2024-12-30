/**
 * Scale
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Box, PageMargin, Position, PositionPair } from '../../value';

export const DPPX = 96;
export const PointParInch = 72;
export const MmParInch = 25.4;

export const UnitType = {
  INCH: "in",
  MILLIMETER: "mm",
  POINT: "pt",
};
export type UnitValue = typeof UnitType[keyof typeof UnitType];

export type ScaleConfig = {
  unit?: UnitValue;
  zoom?: number;
  precision?: number;
  pointPrecision?: number;
}

export class Scale {
  readonly #unit?: UnitValue;
  readonly #scale: number;
  readonly #zoom?: number;
  readonly #precision?: number;
  readonly #pointPrecision?: number;
  readonly #pointToPixelScale: number;
  readonly #pointScale: number;
  readonly #margin: PageMargin;

  constructor(config: ScaleConfig, margin?: PageMargin) {
    const { unit, zoom, precision, pointPrecision } = config;
    this.#unit = unit;
    this.#scale = getScale(this.unit);
    this.#pointScale = getPointScale(this.unit);
    this.#zoom = zoom;
    this.#precision = precision;
    this.#pointPrecision = pointPrecision;
    this.#pointToPixelScale = DPPX / PointParInch;
    this.#margin = margin ?? { top: 0, left: 0 };
  }

  get config(): ScaleConfig {
    return {
      unit: this.#unit,
      zoom: this.#zoom,
      precision: this.#precision,
      pointPrecision: this.#pointPrecision
    }
  }

  get unit(): UnitValue {
    return this.#unit ?? UnitType.MILLIMETER;
  }

  get zoom() {
    return this.#zoom ?? 1;
  }

  setZoom(zoom: number) {
    const config = this.config
    return new Scale({ ...config, zoom }, this.#margin);
  }

  get precision() {
    return this.#precision ?? defaultPrecision(this.unit);
  }

  get pointPrecision() {
    return this.#pointPrecision ?? 2;
  }

  toPixel(value: number): number;
  toPixel(value: Box): Box;
  toPixel(value: Position): Position;
  toPixel(value: PositionPair): PositionPair;
  toPixel(value: number | Box | Position | PositionPair): number | Box | Position | PositionPair {
    if (typeof value === 'number') {
      return this.toPixelNum(value);
    }
    if ('width' in value) {
      return this.toPixelBox(value);
    }
    if ('x1' in value) {
      return this.toPixelPositionPair(value);
    }
    return this.toPixelPosition(value);
  }

  fromPixel(value: number): number;
  fromPixel(value: Box): Box;
  fromPixel(value: Position): Position;
  fromPixel(value: PositionPair): PositionPair;
  fromPixel(value: number | Box | Position | PositionPair): number | Box | Position | PositionPair {
    if (typeof value === 'number') {
      return this.fromPixelNum(value);
    }
    if ('width' in value) {
      return this.fromPixelBox(value);
    }
    if ('x1' in value) {
      return this.fromPixelPositionPair(value);
    }
    return this.fromPixelPosition(value);
  }

  toPoint(value: number): number;
  toPoint(value: Box): Box;
  toPoint(value: Position): Position;
  toPoint(value: PositionPair): PositionPair;
  toPoint(value: number | Box | Position | PositionPair): number | Box | Position | PositionPair {
    if (typeof value === 'number') {
      return this.toPointNum(value);
    }
    if ('width' in value) {
      return this.toPointBox(value);
    }
    if ('x1' in value) {
      return this.toPointPositionPair(value);
    }
    return this.toPointPosition(value);
  }

  fromPoint(value: number): number {
    return value / this.#pointScale;
  }

  pointToPixel(value: number) {
    return value * this.#pointToPixelScale * this.zoom;
  }

  pointFromPixel(value: number) {
    return this.round(value / this.#pointToPixelScale / this.zoom, this.pointPrecision);
  }

  round(value: number, precision: number) {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  private fromPixelNum(value: number, margin = 0): number {
    return this.round((value / this.#scale / this.zoom) - margin, this.precision);
  }

  private fromPixelBox(box: Box): Box {
    return {
      x: this.fromPixelNum(box.x, this.#margin.left),
      y: this.fromPixelNum(box.y, this.#margin.top),
      width: this.fromPixelNum(box.width),
      height: this.fromPixelNum(box.height),
    }
  }

  private fromPixelPosition(value: Position): Position {
    return {
      x: this.fromPixelNum(value.x, this.#margin.left),
      y: this.fromPixelNum(value.y, this.#margin.top),
    }
  }

  private fromPixelPositionPair(value: PositionPair): PositionPair {
    return {
      x1: this.fromPixelNum(value.x1, this.#margin.left),
      y1: this.fromPixelNum(value.y1, this.#margin.top),
      x2: this.fromPixelNum(value.x2, this.#margin.left),
      y2: this.fromPixelNum(value.y2, this.#margin.top),
    }
  }

  private toPixelNum(value: number): number {
    return value * this.#scale * this.zoom;
  }

  private toPixelBox(box: Box): Box {
    return {
      x: this.toPixelNum(box.x + this.#margin.left),
      y: this.toPixelNum(box.y + this.#margin.top),
      width: this.toPixelNum(box.width),
      height: this.toPixelNum(box.height),
    }
  }

  private toPixelPosition(value: Position): Position {
    return {
      x: this.toPixelNum(value.x + this.#margin.left),
      y: this.toPixelNum(value.y + this.#margin.top),
    }
  }

  private toPixelPositionPair(value: PositionPair): PositionPair {
    return {
      x1: this.toPixelNum(value.x1 + this.#margin.left),
      y1: this.toPixelNum(value.y1 + this.#margin.top),
      x2: this.toPixelNum(value.x2 + this.#margin.left),
      y2: this.toPixelNum(value.y2 + this.#margin.top),
    }
  }

  private toPointNum(value: number) {
    return this.round(value * this.#pointScale, this.pointPrecision);
  }

  private toPointBox(box: Box): Box {
    return {
      x: this.toPointNum(box.x + this.#margin.left),
      y: this.toPointNum(box.y + this.#margin.top),
      width: this.toPointNum(box.width),
      height: this.toPointNum(box.height),
    }
  }

  private toPointPosition(value: Position): Position {
    return {
      x: this.toPointNum(value.x + this.#margin.left),
      y: this.toPointNum(value.y + this.#margin.top),
    }
  }

  private toPointPositionPair(value: PositionPair): PositionPair {
    return {
      x1: this.toPointNum(value.x1 + this.#margin.left),
      y1: this.toPointNum(value.y1 + this.#margin.top),
      x2: this.toPointNum(value.x2 + this.#margin.left),
      y2: this.toPointNum(value.y2 + this.#margin.top),
    }
  }

}

function getScale(unit: UnitValue): number {
  switch (unit) {
    case UnitType.INCH:
      return DPPX;
    case UnitType.MILLIMETER:
      return DPPX / MmParInch;
    case UnitType.POINT:
      return DPPX / PointParInch;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}

function getPointScale(unit: UnitValue): number {
  switch (unit) {
    case UnitType.INCH:
      return PointParInch;
    case UnitType.MILLIMETER:
      return PointParInch / MmParInch;
    case UnitType.POINT:
      return 1;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}

function defaultPrecision(unit: UnitValue): number {
  switch (unit) {
    case UnitType.INCH:
      return 2;
    case UnitType.MILLIMETER:
      return 1;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}
