/**
 * CreateDrawer
 *
 * Created by sunvisor on 2025/02/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  BarcodeShape,
  CircleShape,
  createDataDrawer,
  createDesignDrawer,
  EllipseShape,
  ImageShape,
  LineShape,
  RectShape,
  Scale,
  ShapesDrawer,
  StaticShapeDrawers,
  TextShape
} from '@sunvisor/super-leopard-core';
import { RectDrawer } from './RectDrawer';
import { BarcodeDrawerProps, ImageDrawerProps, TextDrawerProps } from './types';
import { CircleDrawer } from './CircleDrawer';
import { EllipseDrawer } from './EllipseDrawer';
import { ImageDrawer } from './ImageDrawer';
import { TextElementDrawer } from './TextElementDrawer';
import { Measurement } from './Measurement';
import { SettingData } from '../../settings';
import { LineDrawer } from './LineDrawer';
import { WebFont } from './WebFont';
import { SvgDrawerInterface } from '../../svgDriver';
import { BarcodeDrawer } from './BarcodeDrawer';


type CreateDrawerParams = {
  svg: SvgDrawerInterface;
  scale: Scale;
  settings: SettingData;
}

export type StaticDrawerProps = TextDrawerProps & ImageDrawerProps & BarcodeDrawerProps;

export function createLayerDesignDrawer(
  { svg, scale, settings }: CreateDrawerParams
): ShapesDrawer {
  const { fontMap, designMode } = settings;
  const webFont = new WebFont(fontMap);
  const measurement = new Measurement({ scale, webFont });
  const staticShapeDrawers = createStaticShapeDrawers({
    svg, scale, webFont, measurement, imageOptions: settings.image, barcodeOptions: settings.barcode
  });
  return createDesignDrawer({
    staticShapeDrawers,
    measurement,
    scale,
    fieldBorderColor: designMode.fieldBorder,
    textBorderColor: designMode.textBorder,
  });
}

export function createLayerDataDrawer(
  { svg, scale, settings }: CreateDrawerParams
): ShapesDrawer {
  const { fontMap } = settings;
  const webFont = new WebFont(fontMap);
  const measurement = new Measurement({ scale, webFont });
  const staticShapeDrawers = createStaticShapeDrawers({
    svg, scale, webFont, measurement, imageOptions: settings.image, barcodeOptions: settings.barcode
  });
  return createDataDrawer({
    staticShapeDrawers,
    measurement,
    scale,
  });
}

function createStaticShapeDrawers(props: StaticDrawerProps): StaticShapeDrawers {
  return {
    [CircleShape]: new CircleDrawer(props),
    [EllipseShape]: new EllipseDrawer(props),
    [ImageShape]: new ImageDrawer(props),
    [LineShape]: new LineDrawer(props),
    [RectShape]: new RectDrawer(props),
    [TextShape]: new TextElementDrawer(props),
    [BarcodeShape]: new BarcodeDrawer(props),
  }
}
