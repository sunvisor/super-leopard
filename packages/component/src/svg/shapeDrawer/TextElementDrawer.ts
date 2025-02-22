/**
 * TextElementDrawer
 *
 * Created by sunvisor on 2025/02/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  AlignType,
  AlignValue,
  Box,
  DrawerParams,
  MeasurementInterface,
  Scale,
  Text,
  TextDrawerInterface,
} from '@sunvisor/super-leopard-core';
import { WebFont } from './WebFont';
import { SvgDrawerInterface } from '../../svgDriver';


type TextDrawerProps = {
  svg: SvgDrawerInterface;
  scale: Scale;
  webFont : WebFont;
  measurement: MeasurementInterface;
}

export class TextElementDrawer implements TextDrawerInterface {

  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;
  readonly #webFont: WebFont;
  readonly #measurement: MeasurementInterface

  constructor({ svg, scale, webFont, measurement }: TextDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
    this.#webFont = webFont;
    this.#measurement = measurement;
  }

  draw(text: Text, params?: DrawerParams): void {
    const opacity = params?.opacity || 1;
    const box = this.#scale.toPixel(this.position(text));
    const font = this.#webFont.svgFontParams(text.font, this.#scale);
    const letterSpacing = this.letterSpacing(text);
    this.#svg.text({
      ...box,
      text: text.text,
      font,
      opacity,
      fillColor: text.color?.color || '#000000',
      textDecoration: this.#webFont.textDecoration(text.font),
      letterSpacing,
    });
  }

  private letterSpacing(text: Text) {
    if (text.align === AlignType.JUSTIFY_ALL) {
      const ls = getLetterSpacing(text.width, this.measureWidth(text), text.text.length);
      return this.#scale.toPixel(ls);
    }
    return undefined;
  }

  private position(text: Text): Box {
    const { x, y, width, height } = text.bbox;
    const areaWidth = text.width;
    const textWidth = this.measureWidth(text);
    const xPosition = align(text.align, x, textWidth, areaWidth);

    return { x: xPosition, y, width, height };
  }

  private measureWidth(text: Text) {
    return this.#scale.fromPoint(this.#measurement.measureWidth(text));
  }

}

function align(align: AlignValue | undefined, x: number, width: number, areaWidth: number): number {
  switch (align) {
    case AlignType.RIGHT:
      return x + areaWidth - width;
    case AlignType.CENTER:
      return x + (areaWidth - width) / 2;
    default:
      return x;
  }
}

function getLetterSpacing(areaWidth: number, width: number, textLength: number) {
  return (areaWidth - width) / (textLength - 1);
}
