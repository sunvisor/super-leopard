/**
 * SelectRubberBand
 * rubber band for select operation
 *
 * Created by sunvisor on 2024/01/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Rect, StrokeData, Svg } from '@svgdotjs/svg.js';
import { Box, normalizeBox, Position } from '@sunvisor/super-leopard-core';
import { getClientRect } from './index';
import { EditRubberBandInterface } from './EditRubberBand';
import { RubberBandOptions } from '../setting';

export type OnSelectHandler = (area: Box | Position) => void;

type StrokeOptions = {
  stroke: StrokeData;
  attr: object;
}

export class SelectRubberBand implements EditRubberBandInterface {
  readonly #svg: Svg;
  readonly #onSelect?: OnSelectHandler;
  readonly #options: RubberBandOptions;
  #rubberBand: Box | undefined;
  #rect: Rect | undefined;

  constructor({ svg, options, onSelect }: {
    svg: Svg,
    options: RubberBandOptions,
    onSelect?: OnSelectHandler
  }) {
    this.#svg = svg;
    this.#options = options;
    this.#onSelect = onSelect;
  }

  clear() {
    const el = this.#svg;
    // el.off('mousedown');
    el.off('mousemove');
    el.off('mouseup');
  }

  start(x: number, y: number) {
    const pos = getClientRect(this.#svg, x, y);
    this.drawRubberBand({
      ...pos,
      width: 0,
      height: 0
    });
    this.#svg.on('mouseup', this.onMouseUp, this);
    this.#svg.on('mousemove', this.onMouseMove, this)
  }

  private onMouseMove(event: Event) {
    const e = event as MouseEvent;
    const pos = getClientRect(this.#svg, e.clientX, e.clientY);

    this.moveRubberBand(pos);
    e.preventDefault();
  }

  private onMouseUp(e: Event) {
    e.preventDefault();
    this.fireSelect();
    this.#svg.off('mousemove');
    this.#svg.off('mouseup');
    this.clearRubberBand();
  }

  private fireSelect() {
    if (this.#rubberBand) {
      if (this.isClick(this.#rubberBand)) {
        this.onSelect({ x: this.#rubberBand.x, y: this.#rubberBand.y });
      } else {
        this.onSelect(normalizeBox(this.#rubberBand));
      }
    }
  }

  private onSelect(box: Box | Position) {
    if (this.#onSelect) this.#onSelect(box);
  }

  private isClick(box: Box) {
    return Math.abs(box.width) < this.#options.dragThreshold
      && Math.abs(box.height) < this.#options.dragThreshold
  }

  private drawRubberBand(box: Box) {
    this.#svg.clear();
    this.#rubberBand = box;
    this.#rect = this.drawRect(box, this.#options.stroke);
  }

  private moveRubberBand(pos: Position) {
    if (!this.#rubberBand) {
      return;
    }
    this.#rubberBand.width = pos.x - this.#rubberBand.x;
    this.#rubberBand.height = pos.y - this.#rubberBand.y;
    if (this.#rect) {
      const rb = normalizeBox(this.#rubberBand);
      this.#rect.move(rb.x, rb.y);
      this.#rect.size(rb.width, rb.height);
    }
  }

  private clearRubberBand() {
    if (this.#rect) this.#rect.remove();
    this.#rubberBand = undefined;
  }

  private drawRect(box: Box, options: StrokeOptions) {
    const { x, y, width, height } = box;
    return this.#svg.rect(width, height).move(x, y)
      .fill('none')
      .stroke(options.stroke)
      .attr(options.attr);
  }
}
