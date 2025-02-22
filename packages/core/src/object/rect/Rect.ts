/**
 * Rect
 *
 * Object representing a rectangle
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Color, Border, compareBorder } from "../style";
import { RectShape, Shape, ShapeType } from "../shape";
import { Box, Position } from "../../value";
import { externalValue, internalValue } from '../../precision';
import validate from '../shape/validator';

export type RectConfigValue = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type RectConfigObject = {
  border?: Border | undefined;
  fillColor?: Color | undefined;
};

export type RectConfig = RectConfigValue & RectConfigObject;

export class Rect implements Shape {
  readonly #x: number;
  readonly #y: number;
  readonly #width: number;
  readonly #height: number;
  readonly #border: Border | undefined;
  readonly #fillColor: Color | undefined;

  constructor(config: RectConfig) {
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
      height: this.height
    };
  }

  get type(): ShapeType {
    return RectShape;
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

  get config(): RectConfig {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      border: this.border,
      fillColor: this.fillColor,
    };
  }

  set(key: keyof RectConfig, value: RectConfig[keyof RectConfig]): Rect {
    return new Rect({ ...this.config, [key]: value });
  }

  moveTo(pos: Position): Rect {
    return new Rect({ ...this.config, ...pos });
  }

  resize(box: Box): Rect {
    return new Rect({ ...this.config, ...box });
  }

  equals(other: Shape): boolean {
    if (other instanceof Rect) {
      return this.x === other.x &&
      this.y === other.y &&
      this.width === other.width &&
      this.height === other.height &&
      this.fillColor?.color === other.fillColor?.color &&
      compareBorder(this.border, other.border);
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
  }
}
