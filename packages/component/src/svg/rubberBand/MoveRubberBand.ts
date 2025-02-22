/**
 * MoveRubberBand
 * rubber band for move operation
 *
 * Created by sunvisor on 2024/01/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box, normalizeBox, Position } from '@sunvisor/super-leopard-core';
import { EditRubberBandInterface } from './EditRubberBand';
import { HandleCursor } from '../boundingBox';
import { RubberBandOptions } from '../../settings';
import { StrokeOptions, SvgDrawerInterface, SvgRectInterface } from '../../svgDriver';


export type OnMoveHandler = (pos: Position) => void;

export class MoveRubberBand implements EditRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #onMove?: OnMoveHandler;
  readonly #options: RubberBandOptions;
  #originBox: Box | undefined;
  #rubberBand: Box | undefined;
  #rect: SvgRectInterface | undefined;
  #diff: Position = { x: 0, y: 0 };

  constructor({ svg, options, onMove }: {
    svg: SvgDrawerInterface,
    options: RubberBandOptions,
    onMove?: OnMoveHandler
  }) {
    this.#svg = svg;
    this.#options = options;
    this.#onMove = onMove;
  }

  clear(): void {
    this.#svg.off('mousemove');
    this.#svg.off('mouseup');
  }

  start(x: number, y: number, box: Box): void {
    const pos = this.#svg.getClientPosition({ x, y });
    this.#originBox = this.#rubberBand = box;
    this.#svg.clear();
    this.drawRubberBand(this.#rubberBand);
    this.#diff = {
      x: pos.x - box.x,
      y: pos.y - box.y,
    }
    this.#svg.css({ cursor: HandleCursor.body });
    this.#svg.on('mousemove', this.onMouseMove, this);
    this.#svg.on('mouseup', this.onMouseUp, this);
  }

  private onMouseMove(event: Event) {
    if (!this.#rubberBand) {
      return;
    }
    const e = event as MouseEvent;
    const pos = this.#svg.getClientPosition({ x: e.clientX, y: e.clientY });

    let box = {
      x: pos.x - this.#diff.x,
      y: pos.y - this.#diff.y,
      width: this.#rubberBand.width,
      height: this.#rubberBand.height,
    };
    if (e.shiftKey) {
      box = this.adjustBox(box);
    }

    this.#rubberBand = box;
    this.moveRubberBand(box);
    e.preventDefault();
  }

  private adjustBox(box: Box): Box {
    if (!this.#originBox) return box;
    const diff = {
      x: Math.abs(this.#originBox.x - box.x),
      y: Math.abs(this.#originBox.y - box.y),
    };
    return {
      ...box,
      x: (diff.x < diff.y) ? this.#originBox.x : box.x,
      y: (diff.x < diff.y) ? box.y : this.#originBox.y,
    }
  }

  private onMouseUp(e: Event) {
    this.#svg.css({ cursor: 'default' });
    e.preventDefault();
    this.fireMove();
    this.clear();
    this.clearRubberBand();
  }

  private fireMove() {
    if (!this.#rubberBand) {
      return;
    }
    if (this.#onMove) this.#onMove({
      x: this.#rubberBand.x,
      y: this.#rubberBand.y,
    });
  }

  private clearRubberBand() {
    if (this.#rect) this.#rect.remove();
    this.#rubberBand = undefined;
  }

  private drawRubberBand(box: Box) {
    this.#rect?.remove();
    this.#rubberBand = box;
    this.#rect = this.drawRect(box, this.#options.stroke);
  }

  private moveRubberBand(box: Box) {
    if (this.#rect) {
      const rb = normalizeBox(box);
      this.#rect.move(rb.x, rb.y);
      this.#rect.size(rb.width, rb.height);
    }
  }

  private drawRect(box: Box, stroke: StrokeOptions) {
    return this.#svg.rect({
      ...box,
      stroke
    });
  }
}
