/**
 * CreateFont
 *
 * Created by sunvisor on 2023/11/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Font, FontStyleType, FontStyleValue } from "./Font";
import { FontData } from '../../data';

export const FontStyleShortSyntax = {
  ITALIC: 'I',
  BOLD: 'B',
  UNDERLINE: 'U',
  STRIKE: 'S',
}


export function createFont(data: FontData): Font {
  const style = toStyleValues(data.style);

  return new Font({ family: data.family, style, size: data.size });
}

export function toStyleValues(style: string | undefined): FontStyleValue[] | undefined {
  if (!style) return undefined;
  const result: FontStyleValue[] = [];
  if (style.includes(FontStyleType.ITALIC) || style.includes(FontStyleShortSyntax.ITALIC)) {
    result.push(FontStyleType.ITALIC);
  }
  if (style.includes(FontStyleType.BOLD) || style.includes(FontStyleShortSyntax.BOLD)) {
    result.push(FontStyleType.BOLD);
  }
  if (style.includes(FontStyleType.UNDERLINE) || style.includes(FontStyleShortSyntax.UNDERLINE)) {
    result.push(FontStyleType.UNDERLINE);
  }
  if (style.includes(FontStyleType.STRIKE) || style.includes(FontStyleShortSyntax.STRIKE)) {
    result.push(FontStyleType.STRIKE);
  }
  return result;
}

