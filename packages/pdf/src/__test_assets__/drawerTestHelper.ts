import fs from 'fs';
import PDFDocument = PDFKit.PDFDocument;
import PdfDocument from 'pdfkit';
import { Box, createScale, Scale, StyleType } from '@sunvisor/super-leopard-core';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputBaseDir = `${__dirname}/../../__pdf__`;


export function createDocAndScale(): { doc: PDFDocument, scale: Scale } {
  const doc = createPdfDocument();
  const scale = createScale({
    unit: 'mm',
  });
  return { doc, scale };
}

export function getWritePdf(category: string) {
  return (fileName: string, pdf: PDFDocument) => writePdfFile(category, fileName, pdf);
}

export function createPdfDocument(): PDFDocument {
  const d = new Date('2024-01-01T00:00:00.000Z');
  return new PdfDocument({
    margin: 0,
    info: {
      CreationDate: d,
      ModDate: d,
    }
  });
}

export async function writePdfFile(category: string, fileName: string, doc: PDFDocument): Promise<string> {
  makeDir(category);
  const fullPath = `${outputBaseDir}/${category}/${fileName}`
  const stream = fs.createWriteStream(fullPath);
  doc.pipe(stream);
  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(fullPath));
    stream.on('error', (err) => reject(err.message));
  });
}

export function makeDir(category: string) {
  fs.mkdirSync(`${outputBaseDir}/${category}`, { recursive: true });
}

export const getImagePath = (src: string) => {
  // getImagePath implementation needs to return an alternate image
  // when specified file is not found
  const path = `${__dirname}/images/${src}`;
  if (fs.existsSync(path)) return path;
  return `${__dirname}/images/no_image.svg`;
}

export const borders = {
  solid: { width: 0.25, color: '#000000', style: StyleType.SOLID },
  bold: { width: 5, color: '#000000', style: StyleType.SOLID },
  dashed: { width: .25, color: '#000000', style: StyleType.DASHED },
  dotted: { width: .25, color: '#000000', style: StyleType.DOTTED },
  red: { width: 2, color: '#ff0000', style: StyleType.SOLID },
  black: { width: 2, color: '#000000', style: StyleType.SOLID },
}

export function drawCaption(caption: string, bbox: Box, scale: Scale, doc: PDFDocument) {
  const { x, y } = scale.toPoint({ x: bbox.x, y: bbox.y - 3 });
  doc.fillColor('#000000').opacity(1).font('Helvetica').fontSize(8).text(caption, x, y);
}

