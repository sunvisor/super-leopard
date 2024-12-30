/**
 * MultiLineTextDrawer
 *
 * Created by sunvisor on 2025/02/04.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { createDocAndScale, getWritePdf } from '../drawerTestHelper';
import { TextData } from '@sunvisor/super-leopard-core';
import { drawTexts } from '../textTestHelper';


const category = 'shapes';
const writePdf = getWritePdf(category);
type DrawData = {
  caption: string;
  config: TextData;
  opacity?: number;
  outline?: boolean;
}

const { doc, scale } = createDocAndScale();


const longText = 'A large list of construction parameters, like any large parameter list, is a CodeSmell. Usually when I see these I find that many of the parameters are DataClumps and should be replaced by their own object. \nコンストラクタのパラメータがたくさんあったら、その他のパラメータと同じく、コードの臭いだ。この状況を目にしたら、パラメータをDataClumpだと見なして、オブジェクトに置き換える。';
const baseText: TextData = {
  type: 'text',
  x: 10,
  y: 10,
  width: 90,
  height: 40,
  multiLine: true,
  text: longText,
  font: {
    family: 'NotoSerifJP',
    size: 10
  },
  color: '#000000',
}
const texts: DrawData[] = [
  {
    caption: 'simple multiline text',
    config: baseText,
    outline: true
  },
  {
    caption: 'fit cell multiline text',
    config: {
      ...baseText,
      y: 60,
      fitCell: true,
    },
    outline: true
  },
  {
    caption: 'align right',
    config: {
      ...baseText,
      y: 110,
      align: 'right',
    },
    outline: true
  },
  {
    caption: 'align center',
    config: {
      ...baseText,
      y: 160,
      align: 'center',
    },
    outline: true
  },
  {
    caption: 'linePitch 7mm',
    config: {
      ...baseText,
      x: 110,
      linePitch: 7,
    },
    outline: true
  },
  {
    caption: 'fill color',
    config: {
      ...baseText,
      x: 110,
      y: 60,
      fillColor: '#00ffff',
    },
  },
  {
    caption: 'align justify',
    config: {
      ...baseText,
      x: 110,
      y: 110,
      align: 'justify',
    },
    outline: true
  },
  {
    caption: 'align justify all',
    config: {
      ...baseText,
      x: 110,
      y: 160,
      align: 'justify-all',
    },
    outline: true
  }
];

export default async function multiLineTextDrawer() {
  // Draw
  drawTexts(doc, scale, texts);
  // Save to file
  await writePdf('multi_line_text.pdf', doc);
  console.log('  - multiLineTextDrawer', );
}
