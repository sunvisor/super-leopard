/**
 * EditingLayerDrawer
 *
 * Created by sunvisor on 2024/01/25.
 * Copyright () Sunvisor Lab. 2024.
 */
import { Page, Shapes, Line, Scale, LineShape } from '@sunvisor/super-leopard-core';
import { BoundingBox, HandleType } from '../boundingBox';
import { EditRubberBand, RubberBandListeners } from '../rubberBand';
import { SettingData } from '@/settings';
import MouseEventHandler from './MouseEventHandler';
import { SvgDrawerInterface } from '@/svgDriver';

export class EditingLayerDrawer {
  readonly #page: Page;
  readonly #scale: Scale;
  readonly #svg: SvgDrawerInterface;
  readonly #selection: Shapes;
  readonly #rubberBand: EditRubberBand;
  #boundingBox: BoundingBox | undefined;

  constructor({ svg, page, scale, selection, rubberBand }: {
    svg: SvgDrawerInterface;
    page: Page;
    scale: Scale,
    selection: Shapes;
    rubberBand: EditRubberBand;
  }) {
    this.#page = page;
    this.#scale = scale;
    this.#svg = svg;
    this.#selection = selection;
    this.#rubberBand = rubberBand;
  }

  setBoundingBox(boundingBox: BoundingBox) {
    this.#boundingBox = boundingBox;
  }

  init(el: HTMLElement) {
    const svg = this.#svg;
    const width = this.#scale.toPixel(this.#page.width);
    const height = this.#scale.toPixel(this.#page.height);

    svg.init(el, { width, height }).clear();
  }

  clear() {
    this.#rubberBand.clear();
  }

  showBindingBox() {
    const scale = this.#scale;
    const boundingBox = this.#boundingBox;
    const selection = this.#selection;
    const bbox = selection.count > 0 ? { ...selection.bbox, } : undefined;

    if (!boundingBox) return;
    if (selection.count === 1 && selection.get(0).type === LineShape) {
      const line = selection.get(0) as Line;
      boundingBox.drawLineHandles(scale.toPixel(line.positions));
      return;
    }
    if (bbox) {
      boundingBox.drawBoundingBox(bbox);
    }
  }

}

export function createEditingLayerDrawer({ svg, scale, page, selection, listeners, settings }: {
  svg: SvgDrawerInterface;
  page: Page;
  scale: Scale,
  selection: Shapes;
  settings: SettingData;
  listeners: RubberBandListeners;
}) {
  const rubberBand = new EditRubberBand({ svg, listeners, options: settings.rubberBand });
  const drawer = new EditingLayerDrawer({ svg, scale, page, selection, rubberBand });
  const handler = new MouseEventHandler({
    scale: scale, selection, rubberBand
  });
  const boundingBox = new BoundingBox(
    {
      svg,
      scale: scale,
      options: settings.boundingBox,
      onHandleMouseDown: (event: MouseEvent, type: HandleType) => handler.onHandleMouseDown(event, type)
    }
  );
  drawer.setBoundingBox(boundingBox);
  return { drawer, handler };
}
