/**
 * Types
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { MeasurementInterface, Scale } from '@sunvisor/super-leopard-core';
import { BarcodeOptions, ImageOptions, SettingData } from '../../settings';
import { WebFont } from './WebFont';
import { SvgDrawerInterface } from '../../svgDriver';


export type ShapeDrawerProps = {
  svg: SvgDrawerInterface;
  scale: Scale;
}

export type ImageDrawerProps = ShapeDrawerProps & {
  imageOptions: ImageOptions;
}

export type TextDrawerProps = ShapeDrawerProps & {
  webFont: WebFont;
  measurement: MeasurementInterface;
}

export type BarcodeDrawerProps = ShapeDrawerProps & {
  barcodeOptions: BarcodeOptions;
}


export type DrawerProps = ShapeDrawerProps &{
  settings: SettingData;
}

