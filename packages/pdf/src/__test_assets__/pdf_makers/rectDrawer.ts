/**
 * RectDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { borders, createDocAndScale, drawCaption, getWritePdf } from '../drawerTestHelper';
import { createRect, RectData } from '@sunvisor/super-leopard-core';
import { RectDrawer } from '../../shapeDrawer/RectDrawer';


const category = 'shapes';
const writePdf = getWritePdf(category);
type DrawData = {
  caption: string;
  config: RectData;
  opacity?: number;
}

const { doc, scale } = createDocAndScale();
const baseRect: RectData = {
  type: 'rect',
  x: 0,
  y: 0,
  width: 80,
  height: 50,
}
const rects: DrawData[] = [
  {
    caption: 'solid border',
    config: {
      ...baseRect,
      x: 10, y: 10,
      border: borders.solid,
    },
  },
  {
    caption: 'bold border',
    config: {
      ...baseRect,
      x: 10, y: 70,
      border: borders.bold,
    },
  },
  {
    caption: 'dashed border',
    config: {
      ...baseRect,
      x: 10, y: 130,
      border: borders.dashed,
    },
  },
  {
    caption: 'dotted border',
    config: {
      ...baseRect,
      x: 10, y: 190,
      border: borders.dotted,
    },
  },
  {
    caption: 'red border',
    config: {
      ...baseRect,
      x: 100, y: 10,
      border: borders.red,
    },
  },
  {
    caption: 'red fill',
    config: {
      ...baseRect,
      x: 100, y: 70,
      fillColor: '#ff0000',
    },
  },
  {
    caption: 'black border and red fill',
    config: {
      ...baseRect,
      x: 100, y: 130,
      border: borders.black,
      fillColor: '#ff0000'
    },
  },
  {
    caption: 'opacity',
    config: {
      ...baseRect,
      x: 100, y: 190,
      border: borders.black,
      fillColor: '#ff0000',
    },
    opacity: 0.5
  },
]
export default async function rectDrawer() {
  const drawer = new RectDrawer({ doc, scale });

  // Draw
  rects.forEach(datum => {
    const { caption, config, opacity } = datum;
    const rect = createRect(config);
    drawer.draw(rect, { opacity });
    drawCaption(caption, rect.bbox, scale, doc);
  });
  // Save to file
  await writePdf('rect.pdf', doc);
  console.log('  - rectDrawer', );
}
