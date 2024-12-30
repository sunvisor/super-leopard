import { BorderData, ColorData, FontData } from '@sunvisor/super-leopard-core';

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

