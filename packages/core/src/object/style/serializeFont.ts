/**
 * SerializeFont
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Font, FontStyleType, FontStyleValue } from "./Font";
import { FontStyleShortSyntax } from "./createFont";
import { FontData } from "../../data";


export function serializeFont(font: Font, useShortSyntax: boolean = false): FontData {
  const style = useShortSyntax ? toShortStyleString(font.style) : toStyleString(font.style);
  const result: FontData = {
    family: font.family,
    size: font.size,
  };
  if (font.config.style !== undefined) {
    result.style = style;
  }

  return result;
}

export function toStyleString(style: FontStyleValue[]) {
  return style.length ? style.join(',') : '';
}

function toShortStyleString(style: FontStyleValue[]) {
  return style
    .map((value) => {
      switch (value) {
        case FontStyleType.ITALIC:
          return FontStyleShortSyntax.ITALIC;
        case FontStyleType.BOLD:
          return FontStyleShortSyntax.BOLD;
        case FontStyleType.UNDERLINE:
          return FontStyleShortSyntax.UNDERLINE;
        case FontStyleType.STRIKE:
          return FontStyleShortSyntax.STRIKE;
        default:
          return '';
      }
    })
    .join('');
}
