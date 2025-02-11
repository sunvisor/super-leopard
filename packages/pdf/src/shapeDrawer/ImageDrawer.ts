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
import { GetPdfImagePath } from '../index';
import { ImageParams, PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { applyOpacity } from './style';

export class ImageDrawer implements ImageDrawerInterface {
  readonly #doc: PdfDocumentInterface;
  readonly #scale: Scale;
  readonly #getImagePath: GetPdfImagePath;

  constructor({ doc, scale, getImagePath }: ImageDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
    this.#getImagePath = getImagePath;
  }

  draw(image: Image, params?: DrawerParams): void {
    const imageFile = this.#getImagePath(image.src);
    if (isSVGFile(imageFile)) {
      this.drawSvg(imageFile, image, params?.opacity);
      return;
    }
    if (isPngFile(imageFile)) {
      this.drawImage(imageFile, image, params?.opacity);
      return;
    }
    if (isJPEGFile(imageFile)) {
      this.drawImage(imageFile, image, params?.opacity);
      return;
    }
    throw new Error(`Unsupported image file: ${imageFile}`);
  }

  private drawImage(path: string, image: Image, opacity?: number): void {
    const box = this.#scale.toPoint(image.bbox);
    const imageParams: ImageParams = {
      ...box,
      src: path,
    }
    applyOpacity(imageParams, opacity);
    this.#doc.image(imageParams);
  }

  private drawSvg(path: string, image: Image, opacity?: number): void {
    const box = this.#scale.toPoint(image.bbox);
    const content = fs.readFileSync(path, 'utf8');
    const imageParams: ImageParams = {
      ...box,
      svg: content,
    }
    applyOpacity(imageParams, opacity);
    this.#doc.image(imageParams);
  }

}
