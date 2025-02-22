import { createRect, createScale, TextDrawer } from '@sunvisor/super-leopard-core';
import { UnitType } from '@sunvisor/super-leopard-core';
import { createText, TextData } from '@sunvisor/super-leopard-core';
import { within } from '@storybook/test';
import { testFontMap } from './font';
import { TextElementDrawer } from '../svg/shapeDrawer/TextElementDrawer';
import { Measurement } from '../svg/shapeDrawer/Measurement';
import { RectDrawer } from '../svg/shapeDrawer/RectDrawer';
import { WebFont } from '../svg/shapeDrawer/WebFont';
import { SvgJsDriver } from '../svgDriver/SvgJsDriver';


export type TextProps = {
  text: TextData;
  opacity?: number;
}

export function draw(canvasElement: HTMLElement, args: TextProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const webFont = new WebFont(testFontMap)
  const text = createText(args.text);
  const svg = SvgJsDriver.createDrawer().init(el, { width: scale.toPixel(200), height: scale.toPixel(200) });
  const measurement = new Measurement({ scale, webFont });
  const textElementDrawer = new TextElementDrawer({ svg, scale, webFont, measurement });
  const rectDrawer = new RectDrawer({ svg, scale });
  const drawer = new TextDrawer({
    textElementDrawer,
    scale,
    rectDrawer,
    measurement,
  })
  rectDrawer.draw(createRect({
    ...text.bbox,
    fillColor: '#ffffff',
  }), {})
  drawer.draw(text, { opacity: args.opacity ?? 1 });

  return el;
}
