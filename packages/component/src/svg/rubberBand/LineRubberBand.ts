/**
 * LineRubberBand
 * rubber band with line style
 *
 * Created by sunvisor on 2024/01/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditRubberBandInterface } from './EditRubberBand';
import { Position, PositionPair } from '@sunvisor/super-leopard-core'
import { HandleCursor, HandleType } from '../boundingBox';
import { RubberBandOptions } from '@/settings';
import { SvgDrawerInterface, SvgLineInterface } from '@/svgDriver';

export type OnMovePositionHandler = (positions: PositionPair) => void;

export class LineRubberBand implements EditRubberBandInterface {
  readonly #svg: SvgDrawerInterface;
  readonly #options: RubberBandOptions;
  readonly #onMovePosition: OnMovePositionHandler | undefined;
  #type: HandleType | undefined;
  #originPositions: PositionPair | undefined;
  #rubberBand: PositionPair | undefined;
  #line: SvgLineInterface | undefined;

  constructor({ svg, options, onMovePosition }: {
    svg: SvgDrawerInterface,
    options: RubberBandOptions,
    onMovePosition?: OnMovePositionHandler
  }) {
    this.#svg = svg;
    this.#options = options;
    this.#onMovePosition = onMovePosition;
  }

  clear(): void {
    this.#svg.off('mousemove');
    this.#svg.off('mouseup');
  }

  start(x: number, y: number, positions: PositionPair, type: HandleType): void {
    this.clear();
    this.#svg.clear();
    this.#type = type;
    const pos = this.#svg.getClientPosition({ x, y });
    this.#originPositions = positions;
    this.#rubberBand = this.movePosition(type, positions, pos);
    this.#line = this.drawRubberBand(this.#rubberBand);
    this.#svg.css({ cursor: HandleCursor[type] });
    this.#svg.on('mousemove', this.onMouseMove, this);
    this.#svg.on('mouseup', this.onMouseUp, this);
  }

  private onMouseMove(event: Event) {
    if (!this.#type || !this.#originPositions) return;
    const e = event as MouseEvent;
    const pos = this.#svg.getClientPosition({ x: e.clientX, y: e.clientY });
    const positions = this.movePosition(this.#type, this.#originPositions, pos, e.shiftKey);
    this.#rubberBand = positions;
    this.moveRubberBand(positions);
    e.preventDefault();
  }

  private onMouseUp(e: Event) {
    this.#svg.css({ cursor: 'default' });
    e.preventDefault();
    this.fireMovePoint();
    this.clear();
    this.clearRubberBand();
  }

  private drawRubberBand(positions: PositionPair): SvgLineInterface {
    return this.#svg.line({
      ...positions,
      stroke: this.#options.stroke,
    });
  }

  private moveRubberBand(positions: PositionPair): void {
    if (!this.#line) return;
    const { x1, y1, x2, y2 } = positions;
    this.#line.plot(x1, y1, x2, y2);
  }

  private movePosition(type: HandleType, positions: PositionPair, pos: Position, shift: boolean = false): PositionPair {
    if (type === 'position1') {
      return this.movePosition1(positions, pos, shift);
    }
    if (type === 'position2') {
      return this.movePosition2(positions, pos, shift);
    }
    if (type === 'center') {
      return this.moveLine(pos, positions, shift);
    }
    return positions;
  }

  private moveLine(pos: Position, positions: PositionPair, shift: boolean) {
    const start = {
      x: (positions.x1 + positions.x2) / 2,
      y: (positions.y1 + positions.y2) / 2,
    }
    if (shift) {
      pos = adjustLinePosition({ x: start.x, y: start.y }, pos);
    }
    const diffX = pos.x - start.x;
    const diffY = pos.y - start.y;
    return {
      x1: positions.x1 + diffX,
      y1: positions.y1 + diffY,
      x2: positions.x2 + diffX,
      y2: positions.y2 + diffY,
    }
  }

  private movePosition2(positions: PositionPair, pos: Position, shift: boolean) {
    if (shift) {
      pos = adjustLinePosition({ x: positions.x1, y: positions.y1 }, pos);
    }
    return {
      ...positions,
      x2: pos.x,
      y2: pos.y,
    }
  }

  private movePosition1(positions: PositionPair, pos: Position, shift: boolean): PositionPair {
    if (shift) {
      pos = adjustLinePosition({ x: positions.x2, y: positions.y2 }, pos);
    }
    return {
      ...positions,
      x1: pos.x,
      y1: pos.y,
    }
  }

  private fireMovePoint() {
    if (!this.#rubberBand) return;
    if (this.#onMovePosition) this.#onMovePosition(this.#rubberBand);
  }

  private clearRubberBand() {
    if (this.#line) this.#line.remove();
  }
}

export function adjustLinePosition(start: Position, end: Position): Position {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (Math.abs(dx) < Math.abs(dy)) {
    return {
      x: start.x,
      y: start.y + dy,
    }
  }
  return {
    x: start.x + dx,
    y: start.y,
  };
}

