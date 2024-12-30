/**
 * Ellipse
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { EllipseShape, Shape, ShapeType } from "../shape";
import {Border, Color} from "../style";
import { Box, Position } from "../../value";
import { externalValue, internalValue } from '../../precision';
import validate from '../shape/validator';

export type EllipseConfigValue = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type EllipseConfigObject = {
  border?: Border | undefined;
  fillColor?: Color | undefined;
};

export type EllipseConfig = EllipseConfigValue & EllipseConfigObject;

export class Ellipse implements Shape {
  readonly #x: number;
  readonly #y: number;
  readonly #width: number;
  readonly #height: number;
  readonly #border: Border | undefined;
  readonly #fillColor: Color | undefined;

  constructor(config: EllipseConfig) {
    this.#x = internalValue(config.x);
    this.#y = internalValue(config.y);
    this.#width = internalValue(config.width);
    this.#height = internalValue(config.height);
    this.#border = config.border ?? undefined;
    this.#fillColor = config.fillColor ?? undefined;
    this.validateConfig();
  }

  get bbox(): Box {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  get config(): EllipseConfig {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      border: this.border,
      fillColor: this.fillColor,
    };
  }

  get type(): ShapeType {
    return EllipseShape;
  }

  get x(): number {
    return externalValue(this.#x);
  }

  get y(): number {
    return externalValue(this.#y);
  }

  get width(): number {
    return externalValue(this.#width);
  }

  get height(): number {
    return externalValue(this.#height);
  }

  get border(): Border | undefined {
    return this.#border;
  }

  get fillColor(): Color | undefined {
    return this.#fillColor;
  }

  set(key: keyof EllipseConfig, value: EllipseConfig[keyof EllipseConfig]) {
    return new Ellipse({ ...this.config, [key]: value });
  }

  moveTo(pos: Position): Ellipse {
    const config = this.config
    return new Ellipse({
      ...config,
      x: pos.x,
      y: pos.y,
    });
  }

  resize(box: Box): Ellipse {
    const config = this.config
    return new Ellipse({
      ...config,
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    });
  }

  equals(other: Shape): boolean {
    if (other instanceof Ellipse) {
      return this.x === other.x
      && this.y === other.y
      && this.width === other.width
      && this.height === other.height
      && this.fillColor?.color === other.fillColor?.color
      && this.border ? this.border.equals(other.border) : !other.border
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
  }
}
