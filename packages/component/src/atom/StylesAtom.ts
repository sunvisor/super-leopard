/**
 * StylesAtom
 *
 * Created by sunvisor on 2024/02/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { atom } from 'jotai';
import {
  BorderData,
  ColorData,
  FontData,
} from '@sunvisor/super-leopard-core';

export type StylesData = {
  border: BorderData | undefined,
  fillColor: ColorData | undefined,
  font: FontData,
}

const defaultFont: FontData = {
  family: "NotoSerifJP",
  size: 12,
}

export const defaultStyle: StylesData = {
  border: {},
  fillColor: undefined,
  font: defaultFont,
}

export const BorderAtom = atom<BorderData | undefined>({});
export const FillColorAtom = atom<ColorData | undefined>(undefined);
export const FontStyleAtom = atom<FontData>(defaultFont);

export const StylesAtom = atom<StylesData>(get => {
  return {
    border: get(BorderAtom),
    fillColor: get(FillColorAtom),
    font: get(FontStyleAtom),
  }
});
