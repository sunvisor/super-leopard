/**
 * MouseEventHandler
 *
 * Mouse event handler for EditingLayer
 *
 * Created by sunvisor on 2024/02/07.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditRubberBand, HandleKind, HandleType } from '@/svg';
import { Line, Scale, Shapes } from '@sunvisor/super-leopard-core';


export default class MouseEventHandler {
  readonly #scale: Scale;
  readonly #selection: Shapes;
  readonly #rubberBand: EditRubberBand;

  constructor({ scale, selection, rubberBand }: {
    scale: Scale;
    selection: Shapes;
    rubberBand: EditRubberBand;
  }) {
    this.#scale = scale;
    this.#selection = selection;
    this.#rubberBand = rubberBand;
  }

  // noinspection JSUnusedGlobalSymbols
  startRubberBand(x: number, y: number) {
    this.#rubberBand.start('select', x, y);
  }

  onHandleMouseDown(event: MouseEvent, type: HandleType) {
    const selection = this.#selection;
    const rubberBand = this.#rubberBand;
    const box = selection.count > 0 ? selection.bbox : undefined;
    if (box) {
      const pixelBox = this.#scale.toPixel(box);
      const x = event.clientX;
      const y = event.clientY;
      if (HandleKind[type] === 'line') {
        this.startLineRubberBand(x, y, type);
        return;
      }
      rubberBand.start(HandleKind[type], x, y, pixelBox, type);
    }
  }

  private startLineRubberBand(x: number, y: number, type: HandleType) {
    const selection = this.#selection;
    const scale = this.#scale;
    const rubberBand = this.#rubberBand;
    const positions = (selection.get(0) as Line).positions;
    const pixelPositions = scale.toPixel(positions);
    rubberBand.start('line', x, y, pixelPositions, type);
  }
}
