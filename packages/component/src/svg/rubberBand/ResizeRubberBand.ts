/**
 * ResizeRubberBand
 *
 * rubber band for resize operation
 *
 * Created by sunvisor on 2024/01/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditRubberBandInterface } from './EditRubberBand';
import { Box, Position } from '@sunvisor/super-leopard-core';
import { HandleCursor, HandleType } from '../boundingBox';
import { RubberBandOptions } from '../../settings';
import { StrokeOptions, SvgDrawerInterface, SvgRectInterface } from '../../svgDriver';

export type OnResizeHandler = (box: Box) => void;

export class ResizeRubberBand implements EditRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #onResize?: OnResizeHandler;
  readonly #options: RubberBandOptions;
  #originBox: Box | undefined;
  #rubberBand: Box | undefined;
  #rect: SvgRectInterface | undefined;
  #type: HandleType | undefined;

  constructor({ svg, options, onResize }: {
    svg: SvgDrawerInterface,
    options: RubberBandOptions,
    onResize?: OnResizeHandler
  }) {
    this.#svg = svg;
    this.#options = options;
    this.#onResize = onResize;
  }

  clear(): void {
    this.#svg.off('mousemove');
    this.#svg.off('mouseup');
  }

  start(x: number, y: number, box: Box, type: HandleType): void {
    this.clear();
    this.#svg.clear();
    this.#type = type;
    const pos = this.#svg.getClientPosition({ x, y });
    this.#originBox = box;
    this.#rubberBand = resizeBox(type, box, pos);
    if (this.#rubberBand) this.drawRubberBand(this.#rubberBand);
    this.#svg.css({ cursor: HandleCursor[type] });
    this.#svg.on('mousemove', this.onMouseMove, this);
    this.#svg.on('mouseup', this.onMouseUp, this);
  }

  private onMouseMove(event: Event) {
    if (!this.#type || !this.#originBox) return;
    const e = event as MouseEvent;
    const pos = this.#svg.getClientPosition({ x: e.clientX, y: e.clientY });
    const box = resizeBox(this.#type, this.#originBox, pos);
    if (box) {
      if (e.shiftKey && this.handleIsCorner()) {
        box.height = box.width / this.#originBox.width * this.#originBox.height;
      }
      this.#rubberBand = box;
      this.resizeRubberBand(box);
    }
    e.preventDefault();
  }

  private handleIsCorner() {
    return this.#type?.includes('-');
  }

  private onMouseUp(e: Event) {
    this.#svg.css({ cursor: 'default' });
    e.preventDefault();
    this.fireResize();
    this.clear();
    this.clearRubberBand();
  }

  private drawRubberBand(box: Box) {
    this.#rect?.remove();
    this.#rubberBand = box;
    this.#rect = this.drawRect(box, this.#options.stroke);
  }

  private resizeRubberBand(box: Box) {
    if (this.#rect) {
      this.#rect.move(box.x, box.y);
      this.#rect.size(box.width, box.height);
    }
  }

  private clearRubberBand() {
    if (this.#rect) this.#rect.remove();
  }

  private fireResize() {
    if (!this.#rubberBand) {
      return;
    }
    if (this.#onResize) this.#onResize(this.#rubberBand!);
  }

  private drawRect(box: Box, stroke: StrokeOptions) {
    return this.#svg.rect({
      ...box,
      stroke,
    });
  }
}

export function resizeBox(type: HandleType, box: Box, pos: Position): Box | undefined {
  const positionPair = { x1: box.x, y1: box.y, x2: box.x + box.width, y2: box.y + box.height };
  if (type.includes('top')) {
    positionPair.y1 = pos.y;
  }
  if (type.includes('bottom')) {
    positionPair.y2 = pos.y;
  }
  if (type.includes('left')) {
    positionPair.x1 = pos.x;
  }
  if (type.includes('right')) {
    positionPair.x2 = pos.x;
  }
  const width = positionPair.x2 - positionPair.x1;
  const height = positionPair.y2 - positionPair.y1;
  if (width < 0 || height < 0) return undefined;

  return {
    x: positionPair.x1,
    y: positionPair.y1,
    width: positionPair.x2 - positionPair.x1,
    height: positionPair.y2 - positionPair.y1,
  }

}
