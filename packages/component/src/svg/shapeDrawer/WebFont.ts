/**
 * WebFont Class
 *
 * Created by sunvisor on 2025/02/08.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Text as SvgText } from '@svgdotjs/svg.js';
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

  webFontAttr(font: Font): string {
    const style = getStyle(font);
    const weight = this.weight(font);
    const family = this.family(font);
    const size = `${font.size}pt`;

    return `${style} ${weight} ${size} "${family}"`;
  }

  apply(element: SvgText, font: Font, scale: Scale) {
    element.font(this.svgFontParams(font, scale));
    const decoration = this.textDecoration(font);
    if (decoration.length > 0) {
      element.attr('text-decoration', this.textDecoration(font));
    }
  }

  private svgFontParams(font: Font, scale: Scale): SvgFontParams {
    return {
      family: this.family(font),
      size: getSize(font, scale),
      style: getStyle(font),
      weight: this.weight(font),
    };
  }

  private textDecoration(font: Font) {
    const { style } = font;
    return [FontStyleType.UNDERLINE, FontStyleType.STRIKE]
      .filter(type => style.includes(type))
      .map(type => (type === FontStyleType.UNDERLINE ? 'underline' : 'line-through'))
      .join(' ');
  }

}

function getStyle(font: Font) {
  return font.style.includes(FontStyleType.ITALIC) ? 'italic' : 'normal';
}

function getSize(font: Font, scale: Scale) {
  return scale.pointToPixel(font.size);
}

