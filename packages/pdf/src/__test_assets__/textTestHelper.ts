import { AdditionalFontMap, PdfFont } from '../font/pdfFont';
import {
  createRect,
  createText,
  MeasurementInterface,
  Scale,
  Text,
  TextData,
  TextDrawer
} from '@sunvisor/super-leopard-core';
import { RectDrawer } from '../shapeDrawer/RectDrawer';
import { drawCaption } from './drawerTestHelper';
import { fileURLToPath } from 'url';
import path from 'path';
import { Measurement } from '../shapeDrawer/Measurement';
import { TextElementDrawer } from '../shapeDrawer/TextElementDrawer';
import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const additionalFontMap: AdditionalFontMap = {
  'NotoSerifJP': {
    normal: {
      name: 'NotoSerifJP-Regular',
      fileName: 'NotoSerifJP-Regular.otf',
    },
    bold: {
      name: 'NotoSerifJP-Bold',
      fileName: 'NotoSerifJP-Bold.otf',
    },
    italic: {
      name: 'NotoSerifJP-Regular',
      fileName: 'NotoSerifJP-Regular.otf',
      options: { oblique: true }
    },
    boldItalic: {
      name: 'NotoSerifJP-Bold',
      fileName: 'NotoSerifJP-Bold.otf',
      options: { oblique: true }
    },
  },
  'NotoSansJP': {
    normal: {
      name: 'NotoSansJP-Regular',
      fileName: 'NotoSansJP-Regular.ttf',
    },
    bold: {
      name: 'NotoSansJP-Bold',
      fileName: 'NotoSansJP-Bold.ttf',
    },
    italic: {
      name: 'NotoSansJP-Regular',
      fileName: 'NotoSansJP-Regular.ttf',
      options: { oblique: true }
    },
    boldItalic: {
      name: 'NotoSansJP-Bold',
      fileName: 'NotoSansJP-Bold.ttf',
      options: { oblique: true }
    },
  },
  'MPlusRounded1c': {
    normal: {
      name: 'MPlusRounded1c-Regular',
      fileName: 'MPlusRounded1c-Regular.ttf',
    },
    bold: {
      name: 'MPlusRounded1c-Bold',
      fileName: 'MPlusRounded1c-Bold.ttf',
    },
    italic: {
      name: 'MPlusRounded1c-Regular',
      fileName: 'MPlusRounded1c-Regular.ttf',
      options: { oblique: true }
    },
    boldItalic: {
      name: 'MPlusRounded1c-Bold',
      fileName: 'MPlusRounded1c-Bold.ttf',
      options: { oblique: true }
    }
  },
  'RampartOne': {
    normal: {
      name: 'RampartOne-Regular',
      fileName: 'RampartOne-Regular.ttf',
    },
  }
}

export const mockMeasurement: MeasurementInterface = {
  measureHeight: (text: Text) => text.font.size,
  measureWidth: (text: Text) => text.font.size * text.text.length,
}

export function createAndRegisterTestFonts(doc: PdfDocumentInterface): PdfFont {
  const font = createTestFonts();
  font.registerFonts(doc);

  return font;
}

export function createTestFonts(): PdfFont {
  const path = `${__dirname}/fonts`;

  return new PdfFont({
    additionalFontMap,
    fontPath: `${path}`,
  });
}

export type TextDrawData = {
  caption: string;
  config: TextData;
  opacity?: number;
  outline?: boolean;
}

export function drawTexts(doc: PdfDocumentInterface, scale: Scale, texts: TextDrawData[]) {
  const fonts = createAndRegisterTestFonts(doc);
  const measurement = new Measurement({ doc, fonts });
  const textElementDrawer = new TextElementDrawer({ doc, scale, fonts, measurement });
  const rectDrawer = new RectDrawer({ doc, scale });
  const drawer = new TextDrawer({ textElementDrawer, rectDrawer, scale, measurement });

  texts.forEach(({ caption, config, opacity, outline }) => {
    const text = createText(config);
    if (outline) {
      const rectDrawer = new RectDrawer({ doc, scale });
      rectDrawer.draw(createRect({
        type: 'rect',
        x: text.x, y: text.y, width: text.width, height: text.height,
        border: {
          color: '#000000',
          width: 0.25,
        }
      }));
    }
    drawer.draw(text, { opacity });
    drawCaption(caption, text.bbox, scale, doc);
  });
}
