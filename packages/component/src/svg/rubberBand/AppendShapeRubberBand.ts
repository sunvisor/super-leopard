/**
 * AppendShapeRubberBand
 *
 * Created by sunvisor on 2024/01/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Position, Scale, Shape } from '@sunvisor/super-leopard-core';
import {
  createDefaultShapeSize,
  createShapeCreator,
  createShapeRubberBand,
  DefaultShapeSizeInterface,
  ShapeCreatorInterface,
  ShapeRubberBandInterface
} from './append';
import { SettingData } from '../setting';
import { StylesData } from '../style';
import {
  CircleShapeType,
  EllipseShapeType,
  FieldShapeType,
  ImageShapeType,
  LineShapeType,
  RectShapeType,
  TextShapeType
} from '@sunvisor/super-leopard-core';
import { SvgDrawerInterface, SvgShapeInterface } from '../../svgDriver';

export type AppendShapeType =
  RectShapeType |
  CircleShapeType |
  EllipseShapeType |
  LineShapeType |
  TextShapeType |
  FieldShapeType |
  ImageShapeType;

export type OnAppendHandler = (shape: Shape) => void;

export type AppendShapeRubberBandProps = {
  type: AppendShapeType;
}

export class AppendShapeRubberBand {
  readonly #svg: SvgDrawerInterface;
  readonly #settings: SettingData;
  readonly #onAppend: OnAppendHandler | undefined;
  readonly #shapeCreator: ShapeCreatorInterface;
  readonly #shapeRB: ShapeRubberBandInterface;
  readonly #defaultShapeSize: DefaultShapeSizeInterface;
  #startAt: Position | undefined;
  #currentAt: Position | undefined;
  #element: SvgShapeInterface | undefined;


  constructor(
    { svg, scale, type, settings, styles, onAppend }: {
      svg: SvgDrawerInterface,
      scale: Scale,
      type: AppendShapeType,
      settings: SettingData,
      styles: StylesData,
      onAppend?: OnAppendHandler
    },
  ) {
    this.#svg = svg;
    this.#settings = settings;
    this.#onAppend = onAppend;
    this.#shapeCreator = createShapeCreator(type, {
      scale, styles
    });
    this.#shapeRB = createShapeRubberBand(type, {
      svg, scale, styles, settings
    });
    const defaultSize = settings.defaultShapeSize;
    this.#defaultShapeSize = createDefaultShapeSize(type, { scale, styles, defaultSize });
  }

  clear(): void {
    this.#svg.off('mousemove');
    this.#svg.off('mouseup');
  }

  start(x: number, y: number): void {
    this.clear();
    this.#svg.clear();
    this.#startAt = this.#currentAt = this.#svg.getClientPosition({ x, y });
    this.#element = this.#shapeRB.createElement();
    this.#svg.on('mousemove', this.onMouseMove, this);
    this.#svg.on('mouseup', this.onMouseUp, this);
  }

  onMouseMove(event: Event): void {
    if (!this.#startAt || !this.#element) return;
    const e = event as MouseEvent;
    this.#currentAt = this.#svg.getClientPosition({ x: e.clientX, y: e.clientY });
    if (e.shiftKey) {
      this.#currentAt = this.#shapeRB.adjustPosition(this.#startAt, this.#currentAt);
    }
    if (e.button === 0) {
      this.#shapeRB.moveElement(this.#startAt, this.#currentAt, this.#element);
    }
    e.preventDefault();
  }

  onMouseUp(e: Event): void {
    if (!this.#startAt || !this.#currentAt) return;
    this.doAppend(this.#startAt, this.#currentAt);
    this.removeElement()
    e.preventDefault();
  }


  private doAppend(startAt: Position, currentAt: Position) {
    if (!this.#onAppend) return;
    this.#onAppend(
      this.createShape(startAt, currentAt)
    );
  }

  private removeElement(): void {
    if (!this.#element) return;
    this.#element.remove();
  }

  private createShape(start: Position, end: Position): Shape {
    if (this.isClick(start, end)) {
      end = this.getDefaultEndPosition(start);
    }
    return this.#shapeCreator.create(start, end);
  }

  private getDefaultEndPosition(start: Position) {
    const size = this.#defaultShapeSize.size();
    return {
      x: start.x + size.width,
      y: start.y + size.height,
    };
  }

  private isClick(start: Position, end: Position): boolean {
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);
    const threshold = this.#settings.rubberBand.dragThreshold;

    return dx < threshold && dy < threshold;
  }

}
