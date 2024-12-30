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
import PDFDocument = PDFKit.PDFDocument;
import TextOptions = PDFKit.Mixins.TextOptions;

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
  readonly #doc: PDFDocument;
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
    this.applyFont(text);
    const pos = this.#scale.toPoint({ x: text.x, y: text.y });
    this.#doc.opacity(params?.opacity || 1);
    this.#doc.fillColor(text.color?.color || '#000000');
    this.#doc.text(text.text, pos.x, pos.y, this.textOptions(text));
  }

  private applyFont(text: Text) {
    const fontName = this.#fonts.fontName(text.font);
    this.#doc.font(fontName).fontSize(text.font.size);
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
