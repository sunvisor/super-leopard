/**
 * BarcodeDrawer
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createDocAndScale, drawCaption, getWritePdf, loadErrorImage } from '../drawerTestHelper';
import { BarcodeData } from '@sunvisor/super-leopard-core';
import { BarcodeDrawer } from '../../shapeDrawer/BarcodeDrawer';
import { createBarcode } from '@sunvisor/super-leopard-core';
import { sampleBarcodeValues } from '@sunvisor/super-leopard-barcode';


const category = 'shapes';
const writePdf = getWritePdf(category);
type DrawData = {
  caption: string;
  config: BarcodeData;
  opacity?: number;
}
const { doc, scale } = createDocAndScale();
const baseBarcode: Omit<BarcodeData, 'x' | 'y' | 'value' | 'format'> = {
  type: 'barcode',
  width: 80,
  height: 20,
  options: {
    rotate: 'N',
    includeText: true
  }
}
const values = sampleBarcodeValues;
const data: DrawData[] = [
  {
    caption: 'Code128',
    config: {
      ...baseBarcode,
      x: 10, y: 10,
      format: 'code128',
      value: values.code128,
    }
  },
  {
    caption: 'code39',
    config: {
      ...baseBarcode,
      x: 10, y: 40,
      format: 'code39',
      value: values.code39,
    }
  },
  {
    caption: 'ean13',
    config: {
      ...baseBarcode,
      x: 10, y: 70,
      format: 'ean13',
      value: values.ean13,
    }
  },
  {
    caption: 'ean8',
    config: {
      ...baseBarcode,
      x: 10, y: 100,
      format: 'ean8',
      value: values.ean8,
    }
  },
  {
    caption: 'ean5',
    config: {
      ...baseBarcode,
      x: 10, y: 130,
      format: 'ean5',
      value: values.ean5,
    }
  },
  {
    caption: 'gs1-128',
    config: {
      ...baseBarcode,
      x: 10, y: 160,
      format: 'gs1-128',
      value: values['gs1-128'],
    }
  },
  {
    caption: 'isbn',
    config: {
      ...baseBarcode,
      x: 10, y: 190,
      format: 'isbn',
      value: values.isbn,
    }
  },
  {
    caption: 'itf',
    config: {
      ...baseBarcode,
      x: 10, y: 220,
      format: 'itf',
      value: values.itf,
    }
  },
  {
    caption: 'itf14',
    config: {
      ...baseBarcode,
      x: 10, y: 250,
      format: 'itf14',
      value: values.itf14,
    }
  },
  {
    caption: 'upca',
    config: {
      ...baseBarcode,
      x: 110, y: 10,
      format: 'upca',
      value: values.upca,
    }
  },
  {
    caption: 'upce',
    config: {
      ...baseBarcode,
      x: 110, y: 40,
      format: 'upce',
      value: values.upce,
    }
  },
  {
    caption: 'codabar',
    config: {
      ...baseBarcode,
      x: 110, y: 70,
      format: 'codabar',
      value: values.codabar,
    }
  },
  {
    caption: 'nw7',
    config: {
      ...baseBarcode,
      x: 110, y: 100,
      format: 'nw7',
      value: values.nw7,
    }
  },
  {
    caption: 'qr',
    config: {
      ...baseBarcode,
      x: 110, y: 130,
      format: 'qr',
      value: values.qr,
    }
  },
  {
    caption: 'rotate right',
    config: {
      ...baseBarcode,
      ...baseBarcode,
      x: 110, y: 160,
      format: 'nw7',
      value: 'A12345678A',
      options: {
        rotate: 'R',
        includeText: true,
      }
    }
  },
  {
    caption: 'error occurred',
    config: {
      ...baseBarcode,
      x: 110, y: 190,
      format: 'code39',
      value: 'sunvisorlab', // must be digits
    }
  },
]

export default async function barcodeDrawer() {
  const drawer = new BarcodeDrawer({ doc, scale, loadErrorImage });

  data.forEach(datum => {
    const { caption, config, opacity } = datum;
    const barcode = createBarcode(config);
    drawer.draw(barcode, { opacity });
    drawCaption(caption, barcode.bbox, scale, doc);
  });
  // Save to file
  await writePdf('barcode.pdf', doc);
  console.log('  - barcodeDrawer', );
}
