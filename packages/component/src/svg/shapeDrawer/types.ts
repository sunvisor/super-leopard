/**
 * Types
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { MeasurementInterface, Scale } from '@sunvisor/super-leopard-core';
import { GetSvgImagePath, SettingData } from '../index';
import { WebFont } from './WebFont';
import { SvgDrawerInterface } from '../../svgDriver';


export type ShapeDrawerProps = {
  svg: SvgDrawerInterface;
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

