/**
 * WebFont Class
 *
 * Created by sunvisor on 2025/02/08.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { WebFontMap } from '../../font';
import { Font, FontStyleType, Scale } from '@sunvisor/super-leopard-core';

type SvgFontParams = {
  family: string;
  size: number;
  style: string;
  weight: string;
}

export class WebFont {

  readonly #fontMap: WebFontMap;

  constructor(
    fontMap: WebFontMap
  ) {
    this.#fontMap = fontMap;
  }

  svgFontParams(font: Font, scale: Scale): SvgFontParams {
    return {
      family: this.family(font),
      size: getSize(font, scale),
      style: getStyle(font),
      weight: this.weight(font),
    };
  }

  webFontAttr(font: Font): string {
    const style = getStyle(font);
    const weight = this.weight(font);
    const family = this.family(font);
    const size = `${font.size}pt`;

    return `${style} ${weight} ${size} "${family}"`;
  }

  textDecoration(font: Font) {
    const { style } = font;
    const decoration = [FontStyleType.UNDERLINE, FontStyleType.STRIKE]
      .filter(type => style.includes(type))
      .map(type => (type === FontStyleType.UNDERLINE ? 'underline' : 'line-through'));
    if (decoration.length > 0) {
      return decoration.join(' ');
    }
    return undefined;
  }

  private webFont(font: Font) {
    return this.#fontMap[font.family] ?? {
      family: 'Times',
      weight: { regular: '400', bold: '700' },
    }
  }

  private family(font: Font): string {
    const webFont = this.webFont(font);
    return webFont.family;
  }

  private weight(font: Font) {
    const webFont = this.webFont(font);
    return font.style.includes(FontStyleType.BOLD)
      ? webFont.weight['bold'] ?? 'bold'
      : webFont.weight['regular'] ?? 'normal';
  }

}

function getStyle(font: Font) {
  return font.style.includes(FontStyleType.ITALIC) ? 'italic' : 'normal';
}

function getSize(font: Font, scale: Scale) {
  return scale.pointToPixel(font.size);
}

