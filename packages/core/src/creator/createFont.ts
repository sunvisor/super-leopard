import { Font, FontStyleType, FontStyleValue } from "../object";
import { FontData } from '../data';

export const FontStyleShortSyntax = {
  ITALIC: 'I',
  BOLD: 'B',
  UNDERLINE: 'U',
  STRIKE: 'S',
}


/**
 * CreateFont
 *
 * Created by sunvisor on 2023/11/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function createFont(data: FontData): Font {
  const style = data.style ? toStyleValues(data.style) : undefined;

  return new Font({ family: data.family, style: style, size: data.size });
}

function toStyleValues(style: string): FontStyleValue[] {
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

