/**
 * Circle
 *
 * Object representing a circle
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { CircleShape, Shape, ShapeType } from "../shape";
import { Color, Border, compareBorder } from "../style";
import { Box, Position } from "../../value";
import { externalValue, internalValue } from '../../precision';
import validate from '../shape/validator';

export type CircleConfigValue = {
  x: number;
  y: number;
  diameter: number;
};

type CircleConfigObject = {
  border?: Border | undefined;
  fillColor?: Color | undefined;
}

export type CircleConfig = CircleConfigValue & CircleConfigObject;

export class Circle implements Shape {
  readonly #x: number;
  readonly #y: number;
  readonly #diameter: number;
  readonly #border: Border | undefined;
  readonly #fillColor: Color | undefined;

  constructor(config: CircleConfig) {
    this.#x = internalValue(config.x);
    this.#y = internalValue(config.y);
    this.#diameter = internalValue(config.diameter);
    this.#border = config.border ?? undefined;
    this.#fillColor = config.fillColor ?? undefined;
    this.validateConfig();
  }

  get bbox(): Box {
    return {
      x: this.x,
      y: this.y,
      width: this.diameter,
      height: this.diameter,
    };
  }

  get config(): CircleConfig {
    return {
      x: this.x,
      y: this.y,
      diameter: this.diameter,
      border: this.border,
      fillColor: this.fillColor,
    };
  }

  get type(): ShapeType {
    return CircleShape;
  }

  get x(): number {
    return externalValue(this.#x);
  }

  get y(): number {
    return externalValue(this.#y);
  }

  get cx(): number {
    return externalValue(this.#x + this.#diameter / 2);
  }

  get cy(): number {
    return externalValue(this.#y + this.#diameter / 2);
  }

  get diameter(): number {
    return externalValue(this.#diameter);
  }

  get border(): Border | undefined {
    return this.#border;
  }

  get fillColor(): Color | undefined {
    return this.#fillColor;
  }

  get radius(): number {
    return externalValue(this.#diameter / 2);
  }

  set(key: keyof CircleConfig, value: CircleConfig[keyof CircleConfig]) {
    return new Circle({ ...this.config, [key]: value });
  }

  moveTo(pos: Position): Circle {
    const config = this.config
    return new Circle({
      ...config,
      x: pos.x,
      y: pos.y,
    });
  }

  resize(box: Box): Circle {
    const config = this.config
    const d = Math.min(box.width, box.height);
    return new Circle({
      ...config,
      x: box.x,
      y: box.y,
      diameter: d,
    });
  }

  equals(other: Shape): boolean {
    if (other instanceof Circle) {
      return this.x === other.x
        && this.y === other.y
        && this.diameter === other.diameter
        && this.fillColor?.color === other.fillColor?.color
        && compareBorder(this.border, other.border);
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'diameter', this.#diameter);
  }
}
