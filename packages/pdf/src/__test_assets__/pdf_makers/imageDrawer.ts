
/**
 * ImageDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createDocAndScale, drawCaption, getImagePath, getWritePdf } from '../drawerTestHelper';
import { createImage, createRect, ImageData } from '@sunvisor/super-leopard-core';
import { RectDrawer } from '../../shapeDrawer/RectDrawer';
import { ImageDrawer } from '../../shapeDrawer/ImageDrawer';



const category = 'shapes';
const writePdf = getWritePdf(category);

type DrawData = {
  caption: string;
  config: ImageData;
  bbox?: boolean;
  opacity?: number;
}

const { doc, scale } = createDocAndScale();
const images: DrawData[] = [
  {
    caption: 'PNG image',
    config: {
      type: 'image',
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      src: 'sunvisorlab_icon.png'
    }
  },
  {
    caption: 'JPEG image',
    config: {
      type: 'image',
      x: 10,
      y: 70,
      width: 80,
      height: 50,
      src: 'sample_jpeg.jpg'
    }
  },
  {
    caption: 'SVG image',
    config: {
      type: 'image',
      x: 10,
      y: 130,
      width: 50,
      height: 50,
      src: 'tiger.svg'
    }
  },
  {
    caption: 'opacity',
    config: {
      type: 'image',
      x: 10,
      y: 190,
      width: 50,
      height: 50,
      src: 'sunvisorlab_icon.png'
    },
    opacity: 0.5
  },
  {
    caption: 'Fit image',
    config: {
      type: 'image',
      x: 100,
      y: 10,
      width: 50,
      height: 50,
      src: 'sunvisorlab_icon.png'
    },
    bbox: true
  },
  {
    caption: 'wide image',
    config: {
      type: 'image',
      x: 100,
      y: 70,
      width: 60,
      height: 40,
      src: 'sunvisorlab_icon.png'
    },
    bbox: true
  },
  {
    caption: 'tall image',
    config: {
      type: 'image',
      x: 100,
      y: 120,
      width: 40,
      height: 60,
      src: 'sunvisorlab_icon.png'
    },
    bbox: true
  },
  {
    caption: 'not found',
    config: {
      type: 'image',
      x: 100,
      y: 190,
      width: 50,
      height: 50,
      src: 'not_found.png'
    }
  }
];

export default async function imageDrawer() {
  // Draw
  images.forEach(datum => {
    const { caption, config, bbox, opacity } = datum;
    const image = createImage(config);
    const drawer = new ImageDrawer({ doc, scale, getImagePath });

    drawer.draw(image, { opacity });
    if (bbox) {
      const rectDrawer = new RectDrawer({ doc, scale });
      const rect = createRect({
        type: 'rect',
        x: image.x,
        y: image.y,
        width: image.width,
        height: image.height,
        border: {
          color: '#000000',
          width: 0.25,
        }
      });
      rectDrawer.draw(rect, {});
    }
    drawCaption(caption, image.bbox, scale, doc);
  });
  // Save to file
  await writePdf('image.pdf', doc);
  console.log('  - imageDrawer', );
}
