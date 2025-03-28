/**
 * SelectRubberBand
 * rubber band for select operation
 *
 * Created by sunvisor on 2024/01/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box, normalizeBox, Position } from '@sunvisor/super-leopard-core';
import { EditRubberBandInterface } from './EditRubberBand';
import { RubberBandOptions } from '@/settings';
import { SvgDrawerInterface, SvgRectInterface } from '@/svgDriver';

export type OnSelectHandler = (area: Box | Position, event: MouseEvent) => void;

export class SelectRubberBand implements EditRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #onSelect?: OnSelectHandler;
  readonly #options: RubberBandOptions;
  #rubberBand: Box | undefined;
  #rect: SvgRectInterface | undefined;

  constructor({ svg, options, onSelect }: {
    svg: SvgDrawerInterface,
    options: RubberBandOptions,
    onSelect?: OnSelectHandler
  }) {
    this.#svg = svg;
    this.#options = options;
    this.#onSelect = onSelect;
  }

  clear() {
    const el = this.#svg;
    el.off('mousemove', this.onMouseMove, this);
    el.off('mouseup', this.onMouseUp, this);
  }

  start(x: number, y: number) {
    const pos = this.#svg.getClientPosition({ x, y });
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
    const pos = this.#svg.getClientPosition({ x: e.clientX, y: e.clientY });

    this.moveRubberBand(pos);
    e.preventDefault();
  }

  private onMouseUp(event: Event) {
    event.preventDefault();
    this.fireSelect(event as MouseEvent);
    this.#svg.off('mousemove', this.onMouseMove, this);
    this.#svg.off('mouseup', this.onMouseUp, this);
    this.clearRubberBand();
  }

  private fireSelect(event: MouseEvent) {
    if (this.#rubberBand) {
      if (this.isClick(this.#rubberBand)) {
        this.onSelect({ x: this.#rubberBand.x, y: this.#rubberBand.y }, event);
      } else {
        this.onSelect(normalizeBox(this.#rubberBand), event);
      }
    }
  }

  private onSelect(box: Box | Position, event: MouseEvent) {
    if (this.#onSelect) this.#onSelect(box, event);
  }

  private isClick(box: Box) {
    return Math.abs(box.width) < this.#options.dragThreshold
      && Math.abs(box.height) < this.#options.dragThreshold
  }

  private drawRubberBand(box: Box) {
    this.#svg.clear();
    this.#rubberBand = box;
    this.#rect = this.drawRect(box);
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

  private drawRect(box: Box) {
    const stroke = this.#options.stroke;
    return this.#svg.rect({
      ...box,
      stroke
    });
  }
}
