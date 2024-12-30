/**
 * Line
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { LineShape, Shape, ShapeType } from "../shape";
import {Border} from "../style";
import { Box, Position, PositionPair } from "../../value";
import { externalValue, internalValue } from '../../precision';

export type LineConfigValue = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

type LineConfigObject = {
  border: Border;
};

export type LineConfig = LineConfigValue & LineConfigObject;

export class Line implements Shape {
  readonly #x1: number;
  readonly #y1: number;
  readonly #x2: number;
  readonly #y2: number;
  readonly #border: Border;

  constructor(config: LineConfig) {
    this.#x1 = internalValue(config.x1);
    this.#y1 = internalValue(config.y1);
    this.#x2 = internalValue(config.x2);
    this.#y2 = internalValue(config.y2);
    this.#border = config.border;
  }

  get bbox(): Box {
    return {
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2),
      width: Math.abs(this.x1 - this.x2),
      height: Math.abs(this.y1 - this.y2)
    };
  }

  get config(): LineConfig {
    return {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      border: this.border,
    };
  }

  get type(): ShapeType {
    return LineShape;
  }

  get x1(): number {
    return externalValue(this.#x1);
  }

  get y1(): number {
    return externalValue(this.#y1);
  }

  get x2(): number {
    return externalValue(this.#x2);
  }

  get y2(): number {
    return externalValue(this.#y2);
  }

  get positions(): PositionPair {
    return {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
    };
  }

  get border(): Border {
    return this.#border;
  }

  set(key: keyof LineConfig, value: LineConfig[keyof LineConfig]): Line {
    return new Line({ ...this.config, [key]: value });
  }

  setPositions(positions: PositionPair): Line {
    return new Line({ ...this.config, ...positions });
  }

  moveTo(pos: Position): Line {
    const config = this.config;
    const bbox = this.bbox;

    return new Line({
      ...config,
      x1: pos.x + this.x1 - bbox.x,
      y1: pos.y + this.y1 - bbox.y,
      x2: pos.x + this.x2 - bbox.x,
      y2: pos.y + this.y2 - bbox.y,
    });
  }

  resize(box: Box): Line {
    const config = this.config;
    return new Line({
      ...config,
      x1: this.x1 <= this.x2 ? box.x : box.x + box.width,
      y1: this.y1 <= this.y2 ? box.y : box.y + box.height,
      x2: this.x1 <= this.x2 ? box.x + box.width : box.x,
      y2: this.y1 <= this.y2 ? box.y + box.height : box.y,
    });
  }

  equals(other: Shape): boolean {
    if (other instanceof Line) {
      return this.x1 === other.x1
      && this.y1 === other.y1
      && this.x2 === other.x2
      && this.y2 === other.y2
      && this.border ? this.border.equals(other.border) : !other.border
    }
    return false;
  }
}
