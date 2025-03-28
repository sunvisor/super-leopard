import { Box, Position } from '../../value';

/**
 * Shape
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export type RectShapeType = 'rect';
export type CircleShapeType = 'circle';
export type EllipseShapeType = 'ellipse';
export type LineShapeType = 'line';
export type TextShapeType = 'text';
export type ImageShapeType = 'image';
export type GroupShapeType = 'group';
export type FieldShapeType = 'field';
export type ListShapeType = 'list';
export type BarcodeShapeType = 'barcode';

export const RectShape: RectShapeType = 'rect';
export const CircleShape: CircleShapeType = 'circle';
export const EllipseShape: EllipseShapeType = 'ellipse';
export const LineShape: LineShapeType = 'line';
export const TextShape: TextShapeType = 'text';
export const ImageShape: ImageShapeType = 'image';
export const GroupShape: GroupShapeType = 'group';
export const FieldShape: FieldShapeType = 'field';
export const ListShape: ListShapeType = 'list';
export const BarcodeShape: BarcodeShapeType = 'barcode';


export type StaticShapeType =
  RectShapeType |
  CircleShapeType |
  EllipseShapeType |
  LineShapeType |
  TextShapeType |
  ImageShapeType |
  BarcodeShapeType;

export type CompositeShapeType = GroupShapeType | ListShapeType;
export type ShapeType =
  StaticShapeType |
  FieldShapeType |
  CompositeShapeType;

type Collection<T> = {
  items: T[];
  count: number;
  get: (index: number) => T;
  add: (item: T) => Collection<T>;
  remove: (item: T) => Collection<T>;
  each: (callback: (item: T) => void) => void;
  map: <U>(callback: (item: T) => U) => U[];
  indexOf: (item: T) => number;
}

export interface Boxable {
  bbox: Box;

  moveTo(pos: Position): ThisType<this>;

  resize(box: Box): ThisType<this>;
}

export type Shape = Boxable & {
  type: ShapeType;
  equals(other: Shape): boolean;
}

export type OrderHandler<T> = {
  bringToFront(item: T): Collection<T>;
  sendToBack(item: T): Collection<T>;
  bringToForward(item: T): Collection<T>;
  sendToBackward(item: T): Collection<T>;
}

export type ShapeCollection = Collection<Shape> & OrderHandler<Shape>;
