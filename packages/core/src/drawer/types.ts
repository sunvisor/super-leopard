/**
 * Drawer types
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  Barcode,
  BarcodeShape,
  Circle,
  CircleShape,
  Ellipse,
  EllipseShape,
  Field,
  Group,
  Image,
  ImageShape,
  Line,
  LineShape,
  List, Rect,
  RectShape,
  Shape,
  Shapes,
  Text,
  TextShape
} from '../object';
import { FieldValues } from '../data';

export type DrawerParams = {
  opacity?: number;
}

type ValueParams = {
  values?: FieldValues;
}

export type ListDataParams = {
  listRecords?: FieldValues[];
};

export type FieldDrawerParams = DrawerParams & ValueParams;

export type DataParams = ListDataParams & ValueParams;


export interface ShapeDrawerInterface {
  draw(shape: Shape, params?: DrawerParams): void;
}

export interface CircleDrawerInterface {
  draw(circle: Circle, params?: DrawerParams): void;
}

export interface EllipseDrawerInterface {
  draw(ellipse: Ellipse, params?: DrawerParams): void;
}

export interface LineDrawerInterface {
  draw(line: Line, params?: DrawerParams): void;
}

export interface ImageDrawerInterface {
  draw(image: Image, params?: DrawerParams): void;
}

export interface RectDrawerInterface {
  draw(rect: Rect, params?: DrawerParams): void;
}

export interface TextDrawerInterface {
  draw(text: Text, params?: DrawerParams): void;
}

export interface BarcodeDrawerInterface {
  draw(barcode: Barcode, params?: DrawerParams): void;
}

export type StaticShapeDrawerInterface = ShapeDrawerInterface;

export interface FieldDrawerInterface {
  draw(shape: Field, params: FieldDrawerParams): void;
}

export interface SingleShapeDrawerInterface {
  draw(shape: Shape, params: FieldDrawerParams): void;
}

export interface GroupDrawerInterface {
  draw(group: Group, params: FieldDrawerParams): void;
}

export interface ListDrawerInterface {
  draw(list: List, data?: ListDataParams): void;
}

export interface BarcodeDrawerInterface {
  draw(barcode: Barcode, params?: DrawerParams): void;
}

export interface ShapesDrawerInterface {
  draw(shapes: Shapes, params: DataParams): void;
}

export type StaticShapeDrawers = {
  [RectShape]: RectDrawerInterface,
  [LineShape]: LineDrawerInterface,
  [CircleShape]: CircleDrawerInterface,
  [EllipseShape]: EllipseDrawerInterface,
  [TextShape]: TextDrawerInterface,
  [ImageShape]: ImageDrawerInterface,
  [BarcodeShape]: BarcodeDrawerInterface,
};

export interface MeasurementInterface {
  /**
   * @returns {number} The height of the text in pt
   */
  measureHeight(text: Text): number;

  /**
   *
   * @returns {number} The width of the text in pt
   */
  measureWidth(text: Text): number;
}
