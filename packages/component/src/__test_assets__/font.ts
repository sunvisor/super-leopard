import { FontListItem, getFontList, WebFontMap } from '../font/font';
import { defaultSettings } from '../settings';

export const testFontMap: WebFontMap = {
  ...defaultSettings.fontMap,
  NotoSerifJP: {
    label: 'Noto Serif JP',
    family: 'Noto Serif JP',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold', 'italic'],
  },
  NotoSansJP: {
    label: 'Noto Sans JP',
    family: 'Noto Sans JP',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold', 'italic'],
  },
  RampartOne: {
    label: 'Rampart One',
    family: 'Rampart One',
    weight: {
      regular: '400',
    },
    style: ['italic'],
  },
  MPlusRounded1c: {
    label: 'M PLUS Rounded 1c',
    family: 'M PLUS Rounded 1c',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold', 'italic'],
  }
}

export const testFontList: FontListItem[] = getFontList(testFontMap);
