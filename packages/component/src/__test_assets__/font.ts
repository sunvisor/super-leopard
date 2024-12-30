import { FontListItem, WebFontMap } from '../font/font';

export const webFontMap: WebFontMap = {
  TimesRoman: {
    family: 'Times New Roman',
    weight: {
      regular: 'normal',
      bold: 'bold',
    },
    style: ['bold', 'italic'],
  },
  Helvetica: {
    family: 'Helvetica',
    weight: {
      regular: 'normal',
      bold: 'bold',
    },
    style: ['bold', 'italic'],
  },
  Courier: {
    family: 'Courier',
    weight: {
      regular: 'normal',
      bold: 'bold',
    },
    style: ['bold', 'italic'],
  },
  NotoSerifJP: {
    family: 'Noto Serif JP',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold'],
  },
  NotoSansJP: {
    family: 'Noto Sans JP',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold'],
  },
  RampartOne: {
    family: 'Rampart One',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold'],
  },
  MPlusRounded1c: {
    family: 'M PLUS Rounded 1c',
    weight: {
      regular: '400',
      bold: '700',
    },
    style: ['bold'],
  }
}

export const fontList: FontListItem[] = [
  {
    id: 'TimesRoman',
    label: "Times Roman",
    styles: ['bold', 'italic', 'underline', 'strike'],
  },
  {
    id: 'Helvetica',
    label: "Helvetica",
    styles: ['bold', 'italic', 'underline', 'strike'],
  },
  {
    id: 'Courier',
    label: "Courier",
    styles: ['bold', 'italic', 'underline', 'strike'],
  },
  {
    id: 'NotoSerifJP',
    label: "Noto Serif JP",
    styles: ['bold', 'underline', 'strike'],
  },
  {
    id: 'NotoSansJP',
    label: "Noto Sans JP",
    styles: ['bold', 'underline', 'strike'],
  },
  {
    id: 'RampartOne',
    label: "Rampart One",
    styles: ['underline', 'strike'],
  },
  {
    id: 'MPlusRounded1c',
    label: "M PLUS Rounded 1c",
    styles: ['bold', 'underline', 'strike'],
  }
];
