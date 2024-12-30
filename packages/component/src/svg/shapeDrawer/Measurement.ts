/**
 * Measurement
 *
 * Created by sunvisor on 2025/02/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { MeasurementInterface, Scale, Size, Text } from '@sunvisor/super-leopard-core';
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
    return this.getTextSize(text).height;
  }

  measureWidth(text: Text): number {
    return this.getTextSize(text).width;
  }

  private getTextSize(text: Text): Size {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      return { width: 0, height: 0 };
    }
    context.font = this.#webFont.webFontAttr(text.font);
    const metrics = context.measureText(text.text);

    return {
      width: this.#scale.pointFromPixel(metrics.width),
      height: this.#scale.pointFromPixel(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
    };
  }

}
