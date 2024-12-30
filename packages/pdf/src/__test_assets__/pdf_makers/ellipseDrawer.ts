/**
 * EllipseDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createEllipse, EllipseData } from '@sunvisor/super-leopard-core';
import { borders, createDocAndScale, drawCaption, getWritePdf } from '../drawerTestHelper';
import { EllipseDrawer } from '../../shapeDrawer/EllipseDrawer';


const category = 'shapes';
const writePdf = getWritePdf(category);
type DrawData = {
  caption: string;
  config: EllipseData;
  opacity?: number;
}

const { doc, scale } = createDocAndScale();
const baseEllipse: { type: 'ellipse'; width: number; height: number; } = {
  type: 'ellipse',
  width: 40,
  height: 30,
}
const ellipses: DrawData[] = [
  {
    caption: 'solid border',
    config: {
      ...baseEllipse,
      x: 10, y: 10,
      border: borders.solid,
    },
  },
  {
    caption: 'bold border',
    config: {
      ...baseEllipse,
      x: 10, y: 70,
      border: borders.bold,
    },
  },
  {
    caption: 'dashed border',
    config: {
      ...baseEllipse,
      x: 10, y: 130,
      border: borders.dashed,
    },
  },
  {
    caption: 'dotted border',
    config: {
      ...baseEllipse,
      x: 10, y: 190,
      border: borders.dotted,
    },
  },
  {
    caption: 'red border',
    config: {
      ...baseEllipse,
      x: 100, y: 10,
      border: borders.red,
    },
  },
  {
    caption: 'red fill',
    config: {
      ...baseEllipse,
      x: 100, y: 70,
      fillColor: '#ff0000',
    },
  },
  {
    caption: 'black border and red fill',
    config: {
      ...baseEllipse,
      x: 100, y: 130,
      border: borders.black,
      fillColor: '#ff0000'
    },
  },
  {
    caption: 'opacity',
    config: {
      ...baseEllipse,
      x: 100, y: 190,
      border: borders.black,
      fillColor: '#ff0000',
    },
    opacity: 0.5
  },
];


export default async function ellipseDrawer() {
  const drawer = new EllipseDrawer({ doc, scale });

  // Draw
  ellipses.forEach(datum => {
    const { caption, opacity, config } = datum;
    const ellipse = createEllipse(config);
    drawer.draw(ellipse, { opacity });
    drawCaption(caption, ellipse.bbox, scale, doc);
  })
  // Save to file
  await writePdf('ellipse.pdf', doc);
  console.log('  - ellipseDrawer', );
}
