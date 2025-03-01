// noinspection JSUnusedGlobalSymbols

export const shapeTestData = [
  {
    type: 'circle',
    x: 5,
    y: 5,
    diameter: 10,
    fillColor: '#ff0000',
  },
  {
    type: 'ellipse',
    x: 20,
    y: 5,
    width: 20,
    height: 10,
    fillColor: '#00ff00',
  },
  {
    type: 'rect',
    x: 45,
    y: 5,
    width: 10,
    height: 10,
    fillColor: '#0000ff',
  },
  {
    type: 'text',
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
    type: 'group',
    repeatCount: 3,
    width: 100,
    height: 5,
    direction: 'vertical',
    shapes: [
      {
        type: 'rect', x: 5, y: 20, width: 100, height: 4,
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
    type: 'line',
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
    type: 'image',
    x: 5,
    y: 40,
    src: 'sunvisorlab_icon.png',
    width: 20,
    height: 20,
  },
  {
    type: 'barcode',
    x: 30,
    y: 40,
    width: 20,
    height: 20,
    format: 'qr',
    value: 'https://www.sunvisor.net',
  }
]
