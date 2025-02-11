/**
 * TextElementDrawer
 *
 * Created by sunvisor on 2024/03/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { TextDrawerProps } from './ShapeDrawer';
import {
  AlignType,
  AlignValue,
  DrawerParams,
  MeasurementInterface,
  Scale,
  Text,
  TextDrawerInterface
} from '@sunvisor/super-leopard-core';
import { PdfFont } from '../font/pdfFont';
import TextOptions = PDFKit.Mixins.TextOptions;
import { PdfDocumentInterface, TextParams } from '../pdfDriver/PdfDriverInterface';
import { applyFont } from './style';

function pdfAlign(align: AlignValue) {
  switch (align) {
    case AlignType.RIGHT:
      return 'right';
    case AlignType.CENTER:
      return 'center';
    default:
      return 'left';
  }
}

export class TextElementDrawer implements TextDrawerInterface {
  readonly #doc: PdfDocumentInterface;
  readonly #scale: Scale;
  readonly #fonts: PdfFont;
  readonly #measurement: MeasurementInterface

  constructor({ doc, scale, fonts, measurement }: TextDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
    this.#fonts = fonts;
    this.#measurement = measurement;
  }

  draw(text: Text, params?: DrawerParams): void {
    const pos = this.#scale.toPoint({ x: text.x, y: text.y });
    const textParams: TextParams = {
      ...pos,
      text: text.text,
      opacity: params?.opacity ?? 1,
      options: this.textOptions(text),
    }
    applyFont(textParams, text.font, this.#fonts);
    this.#doc.text(textParams);
  }

  private pointWidth(text: Text) {
    return this.#scale.toPoint(text.width);
  }

  private measureWidth(text: Text) {
    return this.#measurement.measureWidth(text);
  }

  private characterSpacing(text: Text) {
    return (this.pointWidth(text) - this.measureWidth(text)) / (text.text.length - 1);
  }

  private textOptions(text: Text): TextOptions {
    const options = this.#fonts.textOption(text.font);
    if (text.align === AlignType.JUSTIFY_ALL) {
      options.characterSpacing = this.characterSpacing(text);
      return {
        ...options,
        align: pdfAlign(text.align),
      }
    }
    return {
      ...options,
      width: this.pointWidth(text),
      align: pdfAlign(text.align),
    }
  }

}
