/**
 * BoundingBox
 *
 * Created by sunvisor on 2024/01/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Scale, Box, PositionPair } from '@sunvisor/super-leopard-core';
import { BoundingBoxOptions } from '@/settings';
import { SvgDrawerInterface, SvgRectInterface } from '@/svgDriver';

export type HandleType =
  'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' |
  'top' | 'bottom' | 'left' | 'right' | 'body' |
  'position1' | 'position2' | 'center';

type HandleKindType = 'move' | 'resize' | 'line';
export const HandleCursor: Record<HandleType, string> = {
  'left-top': 'nwse-resize',
  'right-top': 'nesw-resize',
  'left-bottom': 'nesw-resize',
  'right-bottom': 'nwse-resize',
  'top': 'ns-resize',
  'bottom': 'ns-resize',
  'left': 'ew-resize',
  'right': 'ew-resize',
  'body': 'grabbing',
  'position1': 'move',
  'position2': 'move',
  'center': 'grabbing',
};

export const HandleKind: Record<HandleType, HandleKindType> = {
  'left-top': 'resize',
  'right-top': 'resize',
  'left-bottom': 'resize',
  'right-bottom': 'resize',
  'top': 'resize',
  'bottom': 'resize',
  'left': 'resize',
  'right': 'resize',
  'body': 'move',
  'position1': 'line',
  'position2': 'line',
  'center': 'line',
}

type OnHandleMouseDownHandler = (event: MouseEvent, type: HandleType) => void;

export class BoundingBox {
  readonly #svg: SvgDrawerInterface;
  readonly #scale: Scale;
  readonly #options: BoundingBoxOptions;
  readonly #onHandleMouseDown: OnHandleMouseDownHandler | undefined;

  constructor({ svg, scale, options, onHandleMouseDown }: {
    svg: SvgDrawerInterface;
    scale: Scale;
    options: BoundingBoxOptions;
    onHandleMouseDown?: OnHandleMouseDownHandler;
  }) {
    this.#svg = svg;
    this.#scale = scale;
    this.#options = options;
    this.#onHandleMouseDown = onHandleMouseDown;
  }

  /**
   * Draws a bounding box on the canvas.
   *
   * @param {Box} box - The box to be drawn as a bounding box.
   * @param {boolean} showCornerHandles - Indicates whether to show the corner handles of the bounding box (default: true).
   * @param {boolean} showEdgeHandles - Indicates whether to show the edge handles of the bounding box (default: true).
   * @returns {Rect} The created svg rectangle element representing the bounding box.
   */
  drawBoundingBox(
    box: Box,
    showCornerHandles: boolean = true,
    showEdgeHandles: boolean = true
  ): SvgRectInterface {
    const drawBox = this.getBox(box);

    const rectElement = this.drawRect(drawBox);
    rectElement.on('mousedown', (event: Event) => {
      (document.activeElement as HTMLElement).blur();
      const e = event as MouseEvent;
      if (e.button !== 0) return;
      this.onHandleMouseDown(e, 'body');
      e.stopPropagation();
      e.preventDefault();
    })
    this.drawHandles(drawBox, showCornerHandles, showEdgeHandles);

    return rectElement;
  }

  /**
   * Draws a line with handle markers at each end.
   *
   * @param {PositionPair} positions - The positions of the line endpoints.
   * @returns {void}
   */
  drawLineHandles(
    positions: PositionPair,
  ): void {
    const { x1, y1, x2, y2 } = positions;
    const stroke = this.#options.stroke;

    this.#svg.line({
      ...positions,
      stroke,
    });
    this.drawHandle(x1, y1, 'position1');
    this.drawHandle(x2, y2, 'position2');
    this.drawHandle((x1 + x2) / 2, (y1 + y2) / 2, 'center', 'grab');
  }

  private getBox(box: Box): Box {
    const scale = this.#scale;
    const { x, y, width, height } = scale.toPixel(box);
    return { x, y, width, height };
  }

  private drawRect(box: Box) {
    const stroke = this.#options.stroke;
    return this.#svg.rect({
      ...box,
      fillColor: '#ffffff00',
      css: { cursor: 'grab' },
      stroke
    })
  }

  private drawHandles(
    box: Box,
    showCornerHandles: boolean,
    showEdgeHandles: boolean,
  ) {
    const { x, y, width, height } = box;
    const drawer = (x: number, y: number, type: HandleType) => {
      this.drawHandle(x, y, type);
    };

    if (showCornerHandles) {
      drawer(x, y, 'left-top');
      drawer(x + width, y, 'right-top');
      drawer(x + width, y + height, 'right-bottom');
      drawer(x, y + height, 'left-bottom');
    }
    if (showEdgeHandles) {
      drawer(x + width / 2, y, 'top');
      drawer(x + width / 2, y + height, 'bottom');
      drawer(x, y + height / 2, 'left');
      drawer(x + width, y + height / 2, 'right');
    }
  }

  private drawHandle(x: number, y: number, type: HandleType, handleCursor?: string) {
    const cursor = handleCursor ?? HandleCursor[type];
    const handleSize = this.#options.handleSize;
    const el = this.#svg.rect({
      x: x - handleSize / 2,
      y: y - handleSize / 2,
      width: handleSize,
      height: handleSize,
      fillColor: '#ffffff',
      stroke: {
        style: 'solid',
        color: '#000000',
        width: 0.5,
      },
      css: { cursor },
      classes: ['handle', type]
    });
    el.on('mousedown', (e: Event) => {
      (document.activeElement as HTMLElement).blur();
      this.onHandleMouseDown(e as MouseEvent, type);
      e.preventDefault();
    });
  }

  private onHandleMouseDown(event: MouseEvent, type: HandleType) {
    if (this.#onHandleMouseDown) {
      this.#onHandleMouseDown(event, type);
    }
  }
}
