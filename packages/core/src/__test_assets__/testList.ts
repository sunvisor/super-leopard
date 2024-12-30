import { AlignType, ValignType } from '../object';
import { FieldValues, ListData } from '../data';

export const listTestData: ListData = {
  type: 'list',
  width: 100,
  height: 10,
  shapes: [
    {
      type: 'rect',
      x: 0,
      y: 0,
      width: 100,
      height: 10,
      border: {
        color: "#bbbbbb",
        width: 0.5,
      }
    },
    {
      type: 'text',
      x: 5,
      y: 0,
      width: 20,
      height: 10,
      text: '名前',
      font: {
        family: 'NotoSansJP',
        size: 10,
      },
      valign: ValignType.MIDDLE,
    },
    {
      type: 'text',
      x: 60,
      y: 0,
      width: 20,
      height: 10,
      text: '金額',
      font: {
        family: 'NotoSansJP',
        size: 10,
      },
      valign: ValignType.MIDDLE,
    },
    {
      name: 'name',
      type: 'field',
      shape: {
        x: 20,
        y: 0,
        type: 'text',
        width: 30,
        height: 10,
        valign: ValignType.MIDDLE,
        font: {
          size: 10,
          family: 'Helvetica',
        },
      }
    },
    {
      name: 'value',
      type: 'field',
      shape: {
        x: 75,
        y: 0,
        type: 'text',
        width: 20,
        height: 10,
        align: AlignType.RIGHT,
        valign: ValignType.MIDDLE,
        font: {
          size: 10,
          family: 'Helvetica',
        },
      }
    }
  ],
};

// noinspection JSUnusedGlobalSymbols
export function createTestValues(count: number): FieldValues[] {
  const values: FieldValues[] = [];
  for (let i = 0; i < count; i++) {
    values.push({
      name: `person${i + 1}`,
      value: 2000 + i * 1000,
    });
  }
  return values;
}
