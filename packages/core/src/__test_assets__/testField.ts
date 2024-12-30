import { FieldData, ShapeData } from '../data';

export const fieldTestData: FieldData[] = [
  {
    name: 'myTextField',
    type: 'field',
    shape: {
      type: 'text',
      x: 5,
      y: 65,
      width: 100,
      height: 6,
      font: {
        family: 'TimesRoman',
        size: 12
      },
      color: '#000000',
    }
  },
  {
    name: 'myLineField',
    type: 'field',
    shape: {
      type: 'line',
      x1: 5,
      y1: 81,
      x2: 105,
      y2: 75,
      border: {
        width: 1,
        color: '#ff0000',
        style: 'solid',
        cap: 'butt',
        join: 'miter',
      }
    }
  }
];

// noinspection JSUnusedGlobalSymbols
export const combinationTestData: ShapeData[] = [
  {
    type: 'text',
    x: 0,
    y: 0,
    width: 100,
    height: 6,
    text: "First Name",
    font: {
      family: 'TimesRoman',
      size: 12
    }
  },
  {
    type: 'text',
    x: 0,
    y: 8,
    width: 100,
    height: 6,
    text: "Last Name",
    font: {
      family: 'TimesRoman',
      size: 12
    }
  },
  {
    name: 'firstName',
    type: 'field',
    shape: {
      type: 'text',
      x: 30,
      y: 0,
      width: 100,
      height: 6,
      font: {
        family: 'TimesRoman',
        size: 12
      },
      color: '#000000',
    },
  },
  {
    name: 'lastName',
    type: 'field',
    shape: {
      type: 'text',
      x: 30,
      y: 8,
      width: 100,
      height: 6,
      font: {
        family: 'TimesRoman',
        size: 12
      },
      color: '#000000',
    },
  }
]
