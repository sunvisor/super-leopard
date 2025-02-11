/**
 * Style
 *
 * Created by sunvisor on 2025/02/11.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { FontStyle, StyleParams } from '../pdfDriver/PdfDriverInterface';
import { Border, Color, Font } from '@sunvisor/super-leopard-core';
import { PdfFont } from '../font/pdfFont';


export function applyStroke(options: StyleParams  , border: Border | undefined): void {
  if (border) {
    options.stroke = {
      style: border.style,
      color: border.color.color,
      width: border.width,
      join: border.join,
      cap: border.cap,
    }
  }
}

export function applyFillColor(options: StyleParams, fillColor: Color | undefined): void {
  if (fillColor) {
    options.fillColor = fillColor.color;
  }
}

export function applyOpacity(options: StyleParams, opacity: number | undefined): void {
  if (opacity) {
    options.opacity = opacity;
  }
}

export function applyFont(fontStyle: FontStyle, font: Font, pdfFont: PdfFont) : void {
  const fontFamily = pdfFont.fontName(font);
  const textOptions = pdfFont.textOption(font);

  fontStyle.font = {
    name: fontFamily,
    size: font.size,
  }
  fontStyle.options = {
    ...(fontStyle.options ?? {}),
    ...textOptions
  };
}
