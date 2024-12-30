/**
 * Types
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Svg } from '@svgdotjs/svg.js';
import { MeasurementInterface, Scale } from '@sunvisor/super-leopard-core';
import { GetSvgImagePath, SettingData } from '../index';
import { WebFont } from './WebFont';


export type ShapeDrawerProps = {
  svg: Svg;
  scale: Scale;
}

export type ImageDrawerProps =  ShapeDrawerProps & {
  getImagePath: GetSvgImagePath;
}

export type TextDrawerProps = ShapeDrawerProps & {
  webFont: WebFont;
  measurement: MeasurementInterface;
}

export type StaticDrawerProps = TextDrawerProps & ImageDrawerProps;

export type DrawerProps = ImageDrawerProps & {
  settings: SettingData;
}

