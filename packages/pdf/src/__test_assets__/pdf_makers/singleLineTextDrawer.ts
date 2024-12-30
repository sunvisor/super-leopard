/**
 * SingleLineTextDrawer
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

const baseText: TextData = {
  type: 'text',
  x: 10,
  y: 10,
  width: 80,
  height: 6,
  text: 'Hello, World!',
  font: {
    family: 'TimesRoman',
    size: 12
  },
  color: '#000000',
}
const jText = {
  ...baseText,
  text: '吾輩は猫である',
  x: 100,
  font: {
    family: 'NotoSansJP',
    size: 12
  },
}
const texts: DrawData[] = [
  {
    caption: 'simple text',
    config: baseText,
  },
  {
    caption: 'italic text',
    config: {
      ...baseText,
      y: 20,
      font: {
        ...baseText.font,
        style: 'italic'
      }
    }
  },
  {
    caption: 'bold text',
    config: {
      ...baseText,
      y: 30,
      font: {
        ...baseText.font,
        style: 'bold'
      }
    }
  },
  {
    caption: 'bold italic text',
    config: {
      ...baseText,
      y: 40,
      font: {
        ...baseText.font,
        style: 'bold,italic'
      }
    }
  },
  {
    caption: 'underline text',
    config: {
      ...baseText,
      y: 50,
      font: {
        ...baseText.font,
        style: 'underline'
      }
    },
  },
  {
    caption: 'strike through text',
    config: {
      ...baseText,
      y: 60,
      font: {
        ...baseText.font,
        style: 'strike'
      }
    }
  },
  {
    caption: 'full decoration text',
    config: {
      ...baseText,
      y: 70,
      font: {
        ...baseText.font,
        style: 'bold,italic,underline,strike'
      }
    }
  },
  {
    caption: 'too long text',
    config: {
      ...baseText,
      y: 80,
      text: 'Too long text will be truncated. Too long text will be truncated. Too long text will be truncated. Too long text will be truncated.',
    },
    outline: true
  },
  {
    caption: 'align left text',
    config: {
      ...baseText,
      y: 90,
      align: 'left',
      text: 'Align Left Text',
    },
    outline: true
  },
  {
    caption: 'align right text',
    config: {
      ...baseText,
      y: 100,
      align: 'right',
      text: 'Align Right Text',
    },
    outline: true
  },
  {
    caption: 'align center text',
    config: {
      ...baseText,
      y: 110,
      align: 'center',
      text: 'Align Center Text',
    },
    outline: true
  },
  {
    caption: 'align justify text',
    config: {
      ...baseText,
      y: 120,
      align: 'justify',
      text: 'Align Justify Text',
    },
    outline: true
  },
  {
    caption: 'align justify all text',
    config: {
      ...baseText,
      y: 130,
      align: 'justify-all',
      text: 'Align Justify All Text',
    },
    outline: true
  },
  {
    caption: 'align top text',
    config: {
      ...baseText,
      y: 140,
      height: 10,
      valign: 'top',
    },
    outline: true
  },
  {
    caption: 'align middle text',
    config: {
      ...baseText,
      y: 155,
      height: 10,
      valign: 'middle',
    },
    outline: true
  },
  {
    caption: 'align bottom text',
    config: {
      ...baseText,
      y: 170,
      height: 10,
      valign: 'bottom',
    },
    outline: true
  },
  {
    caption: 'align center and middle text',
    config: {
      ...baseText,
      y: 185,
      height: 10,
      align: 'center',
      valign: 'middle',
    },
    outline: true
  },
  {
    caption: 'fit cell text',
    config: {
      ...baseText,
      text: 'Long text are displayed in a shrieked font.',
      width: 40,
      y: 200,
      fitCell: true,
    },
    outline: true
  },
  {
    caption: 'red text',
    config: {
      ...baseText,
      y: 210,
      color: '#ff0000',
    }
  },
  {
    caption: 'fill color text',
    config: {
      ...baseText,
      y: 220,
      fillColor: '#00ffff',
    }
  },
  {
    caption: 'opacity text',
    config: {
      ...baseText,
      y: 230,
      fillColor: '#00ffff',
    },
    opacity: 0.2,
  },
  {
    caption: 'simple japanese text',
    config: {
      ...jText,
      y: 10,
    },
  },
  {
    caption: 'italic japanese text',
    config: {
      ...jText,
      y: 20,
      font: {
        ...jText.font,
        style: 'italic',
      }
    },
  },
  {
    caption: 'bold japanese text',
    config: {
      ...jText,
      y: 30,
      font: {
        ...jText.font,
        style: 'bold',
      }
    },
  },
  {
    caption: 'bold italic japanese text',
    config: {
      ...jText,
      y: 40,
      font: {
        ...jText.font,
        style: 'bold,italic',
      }
    },
  },
  {
    caption: 'underline japanese text',
    config: {
      ...jText,
      y: 50,
      font: {
        ...jText.font,
        style: 'underline',
      }
    },
  },
  {
    caption: 'strike through japanese text',
    config: {
      ...jText,
      y: 60,
      font: {
        ...jText.font,
        style: 'strike',
      }
    },
  },
  {
    caption: 'full decoration japanese text',
    config: {
      ...jText,
      y: 70,
      font: {
        ...jText.font,
        style: 'bold,italic,underline,strike',
      }
    },
  },
  {
    caption: 'too long japanese text',
    config: {
      ...jText,
      y: 80,
      text: '長すぎる文字列は切り詰められる。吾輩は猫である',
    },
    outline: true
  },
  {
    caption: 'align left japanese text',
    config: {
      ...jText,
      y: 90,
      align: 'left',
      text: '左寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align right japanese text',
    config: {
      ...jText,
      y: 100,
      align: 'right',
      text: '右寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align center japanese text',
    config: {
      ...jText,
      y: 110,
      align: 'center',
      text: '中央寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align justify japanese text',
    config: {
      ...jText,
      y: 120,
      align: 'justify',
      text: '両端寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align justify all japanese text',
    config: {
      ...jText,
      y: 130,
      align: 'justify-all',
      text: '均等割付の日本語',
    },
    outline: true
  },
  {
    caption: 'align top japanese text',
    config: {
      ...jText,
      y: 140,
      height: 10,
      valign: 'top',
      text: '上端寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align middle japanese text',
    config: {
      ...jText,
      y: 155,
      height: 10,
      valign: 'middle',
      text: '縦中央寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align bottom japanese text',
    config: {
      ...jText,
      y: 170,
      height: 10,
      valign: 'bottom',
      text: '下端寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'align center and middle japanese text',
    config: {
      ...jText,
      y: 185,
      height: 10,
      align: 'center',
      valign: 'middle',
      text: '縦横中央寄せの日本語',
    },
    outline: true
  },
  {
    caption: 'fit cell japanese text',
    config: {
      ...jText,
      text: '長すぎる文字列は縮小したフォントで表示される。',
      width: 40,
      y: 200,
      fitCell: true,
    },
    outline: true
  }
];

export default async function singleLineTextDrawer() {
  // Draw
  drawTexts(doc, scale, texts);
  // Save to file
  await writePdf('single_line_text.pdf', doc);
  console.log('  - singleLineTextDrawer', );
}
