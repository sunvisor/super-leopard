/**
 * TextElementDrawer
 *
 * Created by sunvisor on 2025/02/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Svg, Text as SvgText } from '@svgdotjs/svg.js';
import {
  AlignType, AlignValue,
  DrawerParams,
  MeasurementInterface,
  Scale,
  Text,
  TextDrawerInterface,
} from '@sunvisor/super-leopard-core';
import { WebFont } from './WebFont';


type TextDrawerProps = {
  svg: Svg;
  scale: Scale;
  webFont : WebFont;
  measurement: MeasurementInterface;
}

export default class TextElementDrawer implements TextDrawerInterface {

  readonly #svg: Svg;
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
    const textElement = this.#svg.text(text.text).fill({
      color: text.color.color,
      opacity,
    });
    this.#webFont.apply(textElement, text.font, this.#scale);
    this.setPosition(textElement, text)
    this.setLetterSpacing(text, textElement);
  }

  private setLetterSpacing(text: Text, textElement: SvgText) {
    if (text.align === AlignType.JUSTIFY_ALL) {
      const ls = getLetterSpacing(text.width, this.measureWidth(text), text.text.length);
      textElement.attr('letter-spacing', this.#scale.toPixel(ls));
    }
  }

  private setPosition(textElement: SvgText, text: Text) {
    const { x, y } = text;
    const areaWidth = text.width;
    const width = this.measureWidth(text);
    const xPosition = align(text.align, x, width, areaWidth);
    const position = this.#scale.toPixel({ x: xPosition, y });
    textElement.move(position.x, position.y);
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
