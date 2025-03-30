import { Barcode, BarcodeDrawerInterface, Box, DrawerParams, Scale } from '@sunvisor/super-leopard-core';
import { BarcodeDrawerProps } from './types';
import { SvgDrawerInterface } from '@/svgDriver';
import { createBarcodeSvg } from '@sunvisor/super-leopard-barcode';

/**
 * BarcodeDrawer
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export class BarcodeDrawer implements BarcodeDrawerInterface {

  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;
  readonly #errorImageUrl: string;

  constructor({ svg, scale, barcodeOptions }: BarcodeDrawerProps) {
    this.#svg = svg;
    this.#scale = scale;
    this.#errorImageUrl = barcodeOptions.errorImageUrl;
  }

  draw(barcode: Barcode, { opacity = 1 }: DrawerParams): void {
    const box = this.#scale.toPixel(barcode.bbox as Box);
    let src;
    try {
      const svg = createBarcodeSvg(barcode);
      src = 'data:image/svg+xml;base64,' + btoa(svg);
    } catch (e) {
      src = this.#errorImageUrl;
    }

    this.#svg.image({
      ...box,
      src,
      opacity
    });
  }
}
