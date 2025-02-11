/**
 * PdfDriverInterface
 *
 * Created by sunvisor on 2025/02/11.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Box, Position, PositionPair, StyleValue } from '@sunvisor/super-leopard-core';

export interface PdfDriverInterface {
  createDocument(): PdfDocumentInterface;
}

export type StrokeOptions = {
  style: StyleValue;
  color: string;
  width: number;
  join: string;
  cap: string;
}

type StrokeParams = {
  stroke?: StrokeOptions;
  opacity?: number;
}

export type StyleParams = {
  fillColor?: string;
} & StrokeParams;

export type CircleParams = Position & {
  radius: number
} & StyleParams;

export type EllipseParams = Position & {
  rx: number;
  ry: number;
} & StyleParams;

export type RectParams = Box & {
  width: number;
  height: number;
} & StyleParams;

export type LineParams = PositionPair & StrokeParams;

export type ImageParams = Box & {
  src?: string;
  svg?: SVGElement | string;
  opacity?: number;
}

export type FontParams = {
  name: string;
  size: number;
}

export type FontStyle = {
  font?: FontParams;
  options?: Record<string, any>
}

export type TextParams = Position & FontStyle & {
  text: string;
  fillColor?: string;
  opacity?: number;
}

export type MeasurementParams = {
  text: string;
  font?: FontParams;
  options?: Record<string, any>
}

export type RegisterFontParams = {
  name: string,
  src: string
};

export interface PdfDocumentInterface {
  addPage(params: Record<string, any>): void;

  font(params: FontParams): void;

  registerFont(params: RegisterFontParams): void;

  circle(params: CircleParams): void;

  ellipse(params: EllipseParams): void;

  rect(params: RectParams): void;

  line(params: LineParams): void;

  text(params: TextParams): void;

  image(params: ImageParams): void;

  measureHeight(params: MeasurementParams): number;

  measureWidth(params: MeasurementParams): number;

  open(stream: NodeJS.WritableStream): void;

  close(): void;
}
