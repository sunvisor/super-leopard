/**
 * PdfFont
 *
 * Created by sunvisor on 2024/04/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Font, FontStyleType } from '@sunvisor/super-leopard-core';
import TextOptions = PDFKit.Mixins.TextOptions;
import PDFDocument = PDFKit.PDFDocument;

export type StandardFontMapItem = {
  normal: string;
  bold: string;
  italic: string;
  boldItalic: string;
}

type FontInfo = {
  fileName: string;
  name: string;
  options?: TextOptions;
}

export type AdditionalFontMapItem = {
  normal: FontInfo;
  bold?: FontInfo;
  italic?: FontInfo;
  boldItalic?: FontInfo;
}

export type StandardFontMap = Record<string, StandardFontMapItem>

export type AdditionalFontMap = Record<string, AdditionalFontMapItem>

type FontOptions = {
  fontPath: string;
  additionalFontMap: AdditionalFontMap;
}

export const standardPdfFontMap: StandardFontMap = {
  'TimesRoman': {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italic: 'Times-Italic',
    boldItalic: 'Times-BoldItalic',
  },
  'Helvetica': {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italic: 'Helvetica-Oblique',
    boldItalic: 'Helvetica-BoldOblique',
  },
  'Courier': {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italic: 'Courier-Oblique',
    boldItalic: 'Courier-BoldOblique',
  }
};

export const defaultFont = standardPdfFontMap['Helvetica'];

export class PdfFont {

  readonly #options: FontOptions;

  constructor(options: FontOptions) {
    this.#options = options;
  }

  registerFonts(doc: PDFDocument) {
    const { additionalFontMap, fontPath } = this.#options;

    for (const family in additionalFontMap) {
      const item = additionalFontMap[family];
      for (const style in item) {
        const font = item[style];
        doc.registerFont(font.name, `${fontPath}/${font.fileName}`);
      }
    }
    return doc;
  }

  /**
   * Get font name for PdfKit
   *
   * Returns the font name with the font style (bold, italic) applied.
   */
  fontName(font: Font): string {
    const standard = this.standardPdfFontName(font);
    if (standard) {
      return standard;
    }
    const additional = this.additionalPdfFontName(font);
    if (additional) {
      return additional;
    }
    return defaultFont.normal;
  }

  /**
   * Get text options
   *
   * Returns the font options for PdfKit text method
   * with the font style (bold, italic, underline, strike) applied.
   */
  textOption(font: Font) {
    const options = this.additionalPdfFontOption(font) ?? {};
    if (font.style.includes('underline')) {
      options.underline = true;
    }
    if (font.style.includes('strike')) {
      options.strike = true;
    }

    return options;
  }

  private standardPdfFontName(font: Font): string {
    const item = standardPdfFontMap[font.family];

    if (!item) return undefined;
    if (font.style.includes(FontStyleType.ITALIC) && font.style.includes(FontStyleType.BOLD)) {
      return item.boldItalic;
    }
    if (font.style.includes(FontStyleType.ITALIC)) {
      return item.italic;
    }
    if (font.style.includes(FontStyleType.BOLD)) {
      return item.bold;
    }
    return item.normal;
  }

  private additionalPdfFont(font: Font): FontInfo | undefined {
    const { additionalFontMap } = this.#options;
    const item: AdditionalFontMapItem = additionalFontMap[font.family];

    if (!item) return undefined;
    if (font.style.includes(FontStyleType.ITALIC) && font.style.includes(FontStyleType.BOLD)) {
      return item.boldItalic ?? item.bold ?? item.italic ?? item.normal;
    }
    if (font.style.includes(FontStyleType.ITALIC)) {
      return item.italic ?? item.normal;
    }
    if (font.style.includes(FontStyleType.BOLD)) {
      return item.bold ?? item.normal;
    }
    return item.normal;
  }

  private additionalPdfFontName(font: Font): string {
    const item = this.additionalPdfFont(font);
    if (!item) return undefined;
    return item.name;
  }

  private additionalPdfFontOption(font: Font): TextOptions {
    const item = this.additionalPdfFont(font);
    if (!item) return undefined;
    return item.options ? { ...item.options } : {};
  }

}

export function createPdfFont(options: FontOptions) {
  return new PdfFont(options);
}
