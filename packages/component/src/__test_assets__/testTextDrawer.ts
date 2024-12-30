import { createScale, TextDrawer } from '@sunvisor/super-leopard-core';
import { UnitType } from '@sunvisor/super-leopard-core';
import {createText,  TextData } from '@sunvisor/super-leopard-core';
import { SVG } from '@svgdotjs/svg.js';
import { within } from '@storybook/test';
import { webFontMap } from './font';
import TextElementDrawer from '../svg/shapeDrawer/TextElementDrawer';
import { Measurement } from '../svg/shapeDrawer/Measurement';
import { RectDrawer } from '../svg/shapeDrawer/RectDrawer';
import { WebFont } from '../svg/shapeDrawer/WebFont';


export type TextProps = {
  text: TextData;
  opacity?: number;
}

export function draw(canvasElement: HTMLElement, args: TextProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const scale = createScale({unit: UnitType.MILLIMETER, zoom:1, precision:2, pointPrecision: 2});
  const webFont = new WebFont(webFontMap)
  const text = createText(args.text);
  const svg = SVG().addTo(el).size(scale.toPixel(200), scale.toPixel(200));
  const measurement = new Measurement({ scale, webFont });
  const textElementDrawer = new TextElementDrawer({ svg, scale, webFont, measurement });
  const rectDrawer = new RectDrawer({ svg, scale });
  const drawer = new TextDrawer({
    textElementDrawer,
    scale,
    rectDrawer,
    measurement,
  })
  drawer.draw(text, {opacity: args.opacity ?? 1});

  return el;
}
