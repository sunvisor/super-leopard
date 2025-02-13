/**
 * SvgJsShape
 *
 * Created by sunvisor on 2025/02/13.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Shape, Line } from '@svgdotjs/svg.js';
import {
  SvgCircleInterface,
  SvgEllipseInterface,
  SvgImageInterface, SvgLineInterface,
  SvgRectInterface,
  SvgShapeInterface, SvgTextInterface
} from './SvgDriverInterface';

export class SvgJsShape implements SvgShapeInterface {

  constructor(
    protected readonly shape: Shape
  ) {
  }

  get type(): string {
    return this.shape.type;
  }

  move(x: number, y: number): this {
    this.shape.move(x, y);
    return this;
  }

  size(width: number, height: number): this {
    this.shape.size(width, height);
    return this;
  }

  on(event: string | Event[], callback: EventListener): void {
    this.shape.on(event, callback);
  }

  off(event: string | Event[]): void {
    this.shape.off(event);
  }

  remove(): void {
    this.shape.remove();
  }
}

export class SvgJsCircle extends SvgJsShape implements SvgCircleInterface {
}

export class SvgJsEllipse extends SvgJsShape implements SvgEllipseInterface {
}

export class SvgJsImage extends SvgJsShape implements SvgImageInterface {
}

export class SvgJsLine extends SvgJsShape implements SvgLineInterface {
  plot(x1: number, y1: number, x2: number, y2: number) {
    (this.shape as Line).plot(x1, y1, x2, y2);
  }
}

export class SvgJsRect extends SvgJsShape implements SvgRectInterface {
}

export class SvgJsText extends SvgJsShape implements SvgTextInterface {
}
