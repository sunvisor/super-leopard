/**
 * CircleDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { borders, createDocAndScale, drawCaption, getWritePdf } from '../drawerTestHelper';
import { CircleData, createCircle } from '@sunvisor/super-leopard-core';
import { CircleDrawer } from '../../shapeDrawer/CircleDrawer';


const category = 'shapes';
const writePdf = getWritePdf(category);
type DrawData = {
  caption: string;
  config: CircleData;
  opacity?: number;
}

const { doc, scale } = createDocAndScale();
const baseCircle: { type: 'circle'; diameter: number; } = {
  type: 'circle',
  diameter: 50,
}
const data: DrawData[] = [
  {
    caption: 'solid border',
    config: {
      ...baseCircle,
      x: 10, y: 10,
      border: borders.solid,
    },
  },
  {
    caption: 'bold border',
    config: {
      ...baseCircle,
      x: 10, y: 70,
      border: borders.bold,
    },
  },
  {
    caption: 'dashed border',
    config: {
      ...baseCircle,
      x: 10, y: 130,
      border: borders.dashed,
    },
  },
  {
    caption: 'dotted border',
    config: {
      ...baseCircle,
      x: 10, y: 190,
      border: borders.dotted,
    },
  },
  {
    caption: 'red border',
    config: {
      ...baseCircle,
      x: 100, y: 10,
      border: borders.red,
    },
  },
  {
    caption: 'red fill',
    config: {
      ...baseCircle,
      x: 100, y: 70,
      fillColor: '#ff0000',
    },
  },
  {
    caption: 'black border and red fill',
    config: {
      ...baseCircle,
      x: 100, y: 130,
      border: borders.black,
      fillColor: '#ff0000'
    },
  },
  {
    caption: 'opacity',
    config: {
      ...baseCircle,
      x: 100, y: 190,
      border: borders.black,
      fillColor: '#ff0000',
    },
    opacity: 0.5
  },
]

export default async function circleDrawer() {
  const drawer = new CircleDrawer({ doc, scale });

  data.forEach(datum => {
    const { caption, opacity, config } = datum;
    const circle = createCircle(config);
    drawer.draw(circle, { opacity });
    drawCaption(caption, circle.bbox, scale, doc);
  });
  await writePdf('circle.pdf', doc);
  console.log('  - circleDrawer', );
}
