/**
 * ImageDrawer
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import fs from 'fs';
import { DrawerParams, Image, ImageDrawerInterface, Scale } from '@sunvisor/super-leopard-core';
import { ImageDrawerProps } from './ShapeDrawer';
import { isJPEGFile, isPngFile, isSVGFile } from './imageType';
import SVGtoPDF from 'svg-to-pdfkit';
import PDFDocument = PDFKit.PDFDocument;
import { GetPdfImagePath } from '../index';

export class ImageDrawer implements ImageDrawerInterface {
  readonly #doc: PDFDocument;
  readonly #scale: Scale;
  readonly #getImagePath: GetPdfImagePath;

  constructor({ doc, scale, getImagePath }: ImageDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
    this.#getImagePath = getImagePath;
  }

  draw(image: Image, params?: DrawerParams): void {
    const imageFile = this.#getImagePath(image.src);
    if (params?.opacity !== undefined) {
      this.#doc.opacity(params.opacity);
    }
    if (isSVGFile(imageFile)) {
      this.drawSvg(imageFile, image);
      return;
    }
    if (isPngFile(imageFile)) {
      this.drawImage(imageFile, image);
      return;
    }
    if (isJPEGFile(imageFile)) {
      this.drawImage(imageFile, image);
      return;
    }
    throw new Error(`Unsupported image file: ${imageFile}`);
  }

  private drawImage(path: string, image: Image): void {
    const box = this.#scale.toPoint(image.bbox);
    this.#doc.image(
      path,
      box.x,
      box.y,
      {
        fit: [box.width, box.height],
        align: 'center',
        valign: 'center'
      }
    );
  }

  private drawSvg(path: string, image: Image): void {
    const box = this.#scale.toPoint(image.bbox);
    const content = fs.readFileSync(path, 'utf8');
    const doc = this.#doc;
    SVGtoPDF(
      doc,
      content,
      box.x,
      box.y,
      {
        width: box.width,
        height: box.height,
      }
    );
  }

}
