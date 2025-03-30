
/**
 * SvgDriverInterface
 *
 * Created by sunvisor on 2025/02/12.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Box, Position, PositionPair, Size, StyleValue } from '@sunvisor/super-leopard-core';
import { Shape } from '@svgdotjs/svg.js';


export type StrokeOptions = {
  style: StyleValue;
  color: string;
  width: number;
  join?: string;
  cap?: string;
}

type StrokeParams = {
  stroke?: StrokeOptions;
  opacity?: number;
}

type ElementParam = {
  css?: Partial<CSSStyleDeclarationWithVars>;
  classes?: string[];
}

export type StyleParams = {
  fillColor?: string;
} & StrokeParams & ElementParam;

export type CircleParams = Position & {
  diameter: number
} & StyleParams;

export type EllipseParams = Box &  StyleParams;

export type RectParams = Box & StyleParams;

export type LineParams = PositionPair & StrokeParams & ElementParam;

export type ImageParams = Box & ElementParam & {
  src?: string;
  opacity?: number;
}

export type FontParams = {
  family: string;
  size: number;
  weight?: string;
  style?: string;
}

export type FontStyle = {
  font: FontParams;
  letterSpacing?: number;
  textDecoration?: string;
}

export type TextParams = Position & FontStyle & ElementParam &{
  text: string;
  fillColor: string;
  opacity?: number;
}

export interface SvgDriverInterface {
  createDrawer(): SvgDrawerInterface;
}


export type SvgShapeInterface = {
  type: string;
  move(x: number, y: number): SvgShapeInterface;
  size(width: number, height?: number): SvgShapeInterface;
  on(event: string | Event[], callback: EventListener, bind?: any): void;
  off(event: string | Event[], callback?: EventListener, bind?: any): void;
  remove(): void;
  css(css: Partial<CSSStyleDeclarationWithVars>): void;
}

// Element interfaces
export type SvgCircleInterface = SvgShapeInterface;
export type SvgEllipseInterface = SvgShapeInterface;
export type SvgRectInterface = SvgShapeInterface;
export type SvgLineInterface = SvgShapeInterface & {
  plot: (x1: number, y1: number, x2: number, y2: number) => void;
};
export type SvgTextInterface = SvgShapeInterface;
export type SvgImageInterface = SvgShapeInterface;

export interface SvgDrawerInterface {

  init(el: HTMLElement, size?: Size): this;

  circle(params: CircleParams): SvgCircleInterface;

  ellipse(params: EllipseParams): SvgEllipseInterface;

  rect(params: RectParams): SvgRectInterface;

  line(params: LineParams): SvgLineInterface;

  text(params: TextParams): SvgTextInterface;

  image(params: ImageParams): SvgImageInterface;

  find(selector: string): Shape[];

  clear(): this;

  on(event: string | Event[], callback: EventListener, bind?: any): this;

  off(event: string | Event[], callback?: EventListener, bind?: any): this;

  css(css: Partial<CSSStyleDeclarationWithVars>): this;

  getClientPosition({ x, y }: Position): Position;
}

