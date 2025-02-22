/**
 * Font
 *
 * Created by sunvisor on 2024/03/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { FontStyleValue } from '@sunvisor/super-leopard-core';


type StyleType = 'bold' | 'italic';
export type FontWeight = {
  regular: string;
  bold?: string;
}

export type FontListItem = {
  id: string;
  label: string;
  styles: FontStyleValue[];
}
export type FontList = FontListItem[];

export type WebFontItem = {
  label: string;
  family: string;
  style: StyleType[];
  weight: FontWeight;
}
export type WebFontMap = Record<string, WebFontItem>

/**
 * Returns supported font styles.
 */
export function adjustFontStyle(params: {
  family: string, style: FontStyleValue[], multiLine: boolean, fontList: FontList;
}): FontStyleValue[] {
  const { family, style, multiLine, fontList } = params;
  const styles = fontList.find(item => item.id === family)?.styles ?? [];
  const result = style.filter(item => styles.includes(item));
  return multiLine ? result.filter(item => item !== 'strike' && item !== 'underline') : result;
}

/**
 * Convert WebFontMap to FontList
 * @param fontMap
 * @returns FontList
 */
export function getFontList(fontMap: WebFontMap): FontList {
  return Object.keys(fontMap).map(key => {
    const item = fontMap[key];
    return {
      id: key,
      label: item.label,
      styles: [...item.style, 'underline', 'strike'],
    }
  });
}
