import {
  CircleShape,
  DirectionType,
  EllipseShape,
  GroupShape,
  ImageShape,
  LineShape,
  RectShape,
  Shape,
  TextShape
} from '../object';
import { createShape } from '../creator';
import { ShapeData } from '../data';

export const shapeTestData: ShapeData[] = [
  {
    type: CircleShape,
    x: 5,
    y: 5,
    diameter: 10,
    fillColor: '#ff0000',
  },
  {
    type: EllipseShape,
    x: 20,
    y: 5,
    width: 20,
    height: 10,
    fillColor: '#00ff00',
  },
  {
    type: RectShape,
    x: 45,
    y: 5,
    width: 10,
    height: 10,
    fillColor: '#0000ff',
  },
  {
    type: TextShape,
    x: 60,
    y: 5,
    width: 40,
    height: 10,
    text: 'test',
    font: {
      family: 'TimesRoman',
      size: 12,
    },
    align: 'center',
    valign: 'middle',
    fillColor: '#eeeeee',
    color: '#000000',
  },
  {
    type: GroupShape,
    repeatCount: 3,
    width: 100,
    height: 5,
    direction: DirectionType.VERTICAL,
    shapes: [
      {
        type: RectShape, x: 5, y: 20, width: 100, height: 4,
        border: {
          color: '#aaaaaa',
          width: 1,
          cap: 'butt',
          join: 'miter',
          style: 'solid',
        }
      },
    ],
  }
];
export const shapeTestData2 = [
  {
    type: LineShape,
    x1: 5,
    y1: 35,
    x2: 100,
    y2: 35,
    border: {
      color: '#ff00ff',
      width: 1,
      cap: 'butt',
      join: 'miter',
      style: 'solid',
    }
  },
  {
    type: ImageShape,
    x: 5,
    y: 40,
    src: 'sunvisorlab_icon.png',
    width: 20,
    height: 20,
  }
]


export function createTestShapes(data: ShapeData[] = shapeTestData): Shape[] {
  return data.map(item => createShape(item));
}
