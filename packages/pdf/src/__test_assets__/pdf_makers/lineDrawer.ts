
/**
 * LineDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createDocAndScale, drawCaption, getWritePdf } from '../drawerTestHelper';
import { createLine, LineData } from '@sunvisor/super-leopard-core';
import { LineDrawer } from '../../shapeDrawer/LineDrawer';


const category = 'shapes';
const writePdf = getWritePdf(category);
type DrawData = {
  caption: string;
  config: LineData;
  opacity?: number;
}

const { doc, scale } = createDocAndScale();
const baseLine: LineData = {
  type: 'line',
  x1: 10,
  y1: 20,
  x2: 100,
  y2: 10,
}
const lines: DrawData[] = [
  {
    caption: 'line',
    config: {
      ...baseLine,
      border: {
        color: '#000000',
        width: 0.25,
      }
    }
  },
  {
    caption: 'dashed line',
    config: {
      ...baseLine,
      y1: 40,
      y2: 30,
      border: {
        color: '#000000',
        width: 0.25,
        style: 'dashed',
      }
    }
  },
  {
    caption: 'dotted line',
    config: {
      ...baseLine,
      y1: 60,
      y2: 50,
      border: {
        color: '#000000',
        width: 0.25,
        style: 'dashed',
      }
    }
  },
  {
    caption: 'bold line',
    config: {
      ...baseLine,
      y1: 80,
      y2: 70,
      border: {
        color: '#000000',
        width: 2,
        style: 'solid',
      }
    }
  },
  {
    caption: 'cap butt line',
    config: {
      ...baseLine,
      y1: 100,
      y2: 90,
      border: {
        color: '#000000',
        width: 10,
        cap: 'butt',
      }
    }
  },
  {
    caption: 'cap square line',
    config: {
      ...baseLine,
      y1: 120,
      y2: 110,
      border: {
        color: '#000000',
        width: 10,
        cap: 'square',
      }
    }
  },
  {
    caption: 'cap round line',
    config: {
      ...baseLine,
      y1: 140,
      y2: 130,
      border: {
        color: '#000000',
        width: 10,
        cap: 'round',
      }
    }
  },
  {
    caption: 'red line',
    config: {
      ...baseLine,
      y1: 160,
      y2: 150,
      border: {
        color: '#ff0000',
        width: 0.25,
      }
    }
  },
  {
    caption: 'opacity line',
    config: {
      ...baseLine,
      y1: 180,
      y2: 170,
      border: {
        color: '#000000',
        width: 10,
      }
    },
    opacity: 0.2
  }
];

export default async function lineDrawer() {
  const drawer = new LineDrawer({ doc, scale });

  lines.forEach(({ caption, config, opacity }) => {
    const line = createLine(config);
    drawer.draw(line, { opacity });
    drawCaption(caption, line.bbox, scale, doc);
  });
  // Save to file
  await writePdf('line.pdf', doc);
  console.log('  - lineDrawer', );
}
