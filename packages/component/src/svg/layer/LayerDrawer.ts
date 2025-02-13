/**
 * LayerDrawer
 *
 * Created by sunvisor on 2024/01/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { DataParams, FieldValues, ListRecords, Page, Scale, Shapes, ShapesDrawer } from '@sunvisor/super-leopard-core';
import { DrawerProps } from '../shapeDrawer/types';
import { createLayerDataDrawer, createLayerDesignDrawer } from '../shapeDrawer/createDrawer';
import { SvgDrawerInterface } from '../../svgDriver';


export const DrawModeType = {
  PRINT: 'print',
  DESIGN: 'design',
}

export type DrawModeValue = typeof DrawModeType[keyof typeof DrawModeType];

type DrawParams = DataParams & {
  pageNumber?: number;
}

type LayerDrawerProps = {
  page: Page;
  scale: Scale;
  svg: SvgDrawerInterface;
  drawer: ShapesDrawer;
}

class LayerDrawer {
  readonly #page: Page;
  readonly #scale: Scale;
  readonly #svg: SvgDrawerInterface;
  readonly #drawer: ShapesDrawer;

  constructor({ page, scale, svg, drawer: shapesDrawer }: LayerDrawerProps) {
    this.#page = page;
    this.#scale = scale;
    this.#svg = svg;
    this.#drawer = shapesDrawer;
  }

  init(el: HTMLElement) {
    const svg = this.#svg;
    const width = this.#scale.toPixel(this.#page.width);
    const height = this.#scale.toPixel(this.#page.height);

    svg.init(el, { width, height }).clear();
  }

  drawShapes(
    shapes: Shapes,
    params: DrawParams,
  ) {
    const { pageNumber = 1, listRecords, ...rest } = params;
    const records = this.sliceList(shapes, listRecords, pageNumber);
    this.#drawer.draw(shapes, {
      listRecords: records,
      ...rest
    });
  }

  sliceList(shapes: Shapes, records: FieldValues[] | undefined, pageNumber: number) {
    const list = shapes.getList();
    if (!list || !records) {
      return undefined;
    }
    const c = new ListRecords(records);
    const count = list.listCount;

    return c.get(count, pageNumber);
  }

}

type CreateLayerDrawerParams = DrawerProps & {
  page: Page;
  mode: DrawModeValue;
}

export function createLayerDrawer({ svg, scale, page, getImagePath, settings, mode }: CreateLayerDrawerParams) {
  const drawer = (mode === DrawModeType.DESIGN)
    ? createLayerDesignDrawer({ svg, scale, getImagePath, settings })
    : createLayerDataDrawer({ svg, scale, getImagePath, settings });

  return new LayerDrawer({ svg, page, scale, drawer });
}
