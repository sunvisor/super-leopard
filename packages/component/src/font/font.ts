import { FontStyleValue } from '@sunvisor/super-leopard-core';

/**
 * Font
 *
 * Created by sunvisor on 2024/03/24.
 * Copyright (C) Sunvisor Lab. 2024.
 */
type StyleType = 'bold' | 'italic';
type WeightType = 'regular' | 'bold';
export type FontWeight = Record<WeightType, string>

export type FontListItem = {
  id: string;
  label: string;
  styles: FontStyleValue[];
}
export type FontList = FontListItem[];

export type WebFontItem = {
  family: string;
  style: StyleType[];
  weight: FontWeight;
}
export type WebFontMap = Record<string, WebFontItem>

export function adjustFontStyle(params: {
  family: string, style: FontStyleValue[], multiLine: boolean, fontList: FontList;
}): FontStyleValue[] {
  const { family, style, multiLine, fontList } = params;
  const styles = fontList.find(item => item.id === family)?.styles ?? [];
  const result = style.filter(item => styles.includes(item));
  return multiLine ? result.filter(item => item !== 'strike' && item !== 'underline') : result;
}
