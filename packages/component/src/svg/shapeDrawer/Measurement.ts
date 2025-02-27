/**
 * Measurement
 *
 * Created by sunvisor on 2025/02/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Font, MeasurementInterface, Scale, Text } from '@sunvisor/super-leopard-core';
import { WebFont } from './WebFont';


type MeasurementProps = {
  scale: Scale;
  webFont: WebFont;
}

export class Measurement implements MeasurementInterface {

  readonly #scale: Scale;
  readonly #webFont: WebFont;

  constructor(
    { scale, webFont }: MeasurementProps
  ) {
    this.#scale = scale;
    this.#webFont = webFont;
  }

  measureHeight(text: Text): number {
    const context = this.getContext(text.font);
    if (!context) {
      return text.font.size;
    }
    // add 'MyAg' to get exact height
    const metrics = context.measureText(text.text + 'MyAg');
    return this.#scale.pointFromPixel(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
  }

  measureWidth(text: Text): number {
    const context = this.getContext(text.font);
    if (!context) {
      return text.font.size * text.text.length;
    }
    const metrics = context.measureText(text.text);
    return this.#scale.pointFromPixel(metrics.width);
  }

  private getContext(font: Font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('could not get canvas context!');
      return undefined;
    }
    context.font = this.#webFont.webFontAttr(font);

    return context;
  }

}
