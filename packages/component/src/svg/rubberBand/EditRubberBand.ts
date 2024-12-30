/**
 * EditRubberBand
 *
 * Created by sunvisor on 2024/01/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Box, PositionPair } from '@sunvisor/super-leopard-core';
import { Svg } from '@svgdotjs/svg.js';
import { SelectRubberBand, OnSelectHandler } from './SelectRubberBand';
import { MoveRubberBand, OnMoveHandler } from './MoveRubberBand';
import { HandleType } from '../boundingBox';
import { ResizeRubberBand, OnResizeHandler } from './ResizeRubberBand';
import { LineRubberBand, OnMovePositionHandler } from './LineRubberBand';
import { RubberBandOptions } from '../setting';


export type EditRubberBandInterface = {
  start(x: number, y: number, box?: Box | PositionPair, type?: HandleType): void;
  clear(): void;
}

export type RubberBandListeners = {
  onSelect?: OnSelectHandler;
  onMove?: OnMoveHandler;
  onResize?: OnResizeHandler;
  onMovePosition?: OnMovePositionHandler;
}

type EditRubberBandType = 'select' | 'move' | 'resize' | 'line';

export class EditRubberBand {
  readonly #svg: Svg;
  readonly #listeners: RubberBandListeners;
  readonly #options: RubberBandOptions;
  #rubberBand: EditRubberBandInterface | undefined;

  constructor(
    { svg, listeners, options }: {
      svg: Svg,
      listeners: RubberBandListeners,
      options: RubberBandOptions
    },
  ) {
    this.#svg = svg;
    this.#listeners = listeners;
    this.#options = options;
  }

  /**
   * Cleanup the rubber band.
   */
  clear(): void {
    this.#rubberBand?.clear();
  }

  /**
   * Starts the rubber band operation.
   * Typically called on mousedown event
   *
   * @param {EditRubberBandType} type - The type of the rubber band.
   * @param {number} x - The X coordinate of the starting position.
   * @param {number} y - The Y coordinate of the starting position.
   * @param {Box | PositionPair} [box] - The bounding box or position pair.
   * @param {HandleType} [handle] - The handle type.
   * @returns {void}
   */
  start(type: EditRubberBandType, x: number, y: number, box?: Box | PositionPair, handle?: HandleType): void {
    this.#rubberBand = this.createRubberBand(type)
    this.#rubberBand.start(x, y, box, handle);
  }

  createRubberBand(type: EditRubberBandType): EditRubberBandInterface {
    const svg = this.#svg;
    const options = this.#options;
    const {
      onSelect,
      onMove,
      onResize,
      onMovePosition
    } = this.#listeners;

    switch (type) {
      case 'select':
        return new SelectRubberBand(
          { svg, options, onSelect },
        );
      case 'move':
        return new MoveRubberBand({ svg, options, onMove });
      case 'resize':
        return new ResizeRubberBand(
          { svg, options, onResize },
        );
      case 'line':
        return new LineRubberBand(
          { svg, options, onMovePosition },
        );
    }
  }
}
