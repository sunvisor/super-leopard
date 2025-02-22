/**
 * BarcodeDrawer
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  Barcode,
  BarcodeDrawerInterface, Box,
  DrawerParams,
  Scale
} from '@sunvisor/super-leopard-core';
import { BarcodeDrawerProps } from './ShapeDrawer';
import { ImageParams, PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';
import { applyOpacity } from './style';
import { createBarcodeSvg } from '@sunvisor/super-leopard-barcode';


export class BarcodeDrawer implements BarcodeDrawerInterface {
  readonly #doc: PdfDocumentInterface;
  readonly #scale: Scale;
  readonly #loadErrorImage: (path: string) => string;

  constructor({ doc, scale, loadErrorImage }: BarcodeDrawerProps) {
    this.#doc = doc;
    this.#scale = scale;
    this.#loadErrorImage = loadErrorImage;
  }

  draw(barcode: Barcode, params?: DrawerParams): void {
    const box = this.#scale.toPoint(barcode.bbox as Box);
    let svg: string;
    try {
      svg = createBarcodeSvg(barcode);
    } catch (e) {
      svg = this.#loadErrorImage(barcode.format);
    }
    const imageParams: ImageParams = {
      ...box,
      svg,
    }
    applyOpacity(imageParams, params?.opacity);
    this.#doc.image(imageParams);
  }

}


