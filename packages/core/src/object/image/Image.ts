/**
 * Image
 *
 * Created by sunvisor on 2023/12/14.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { ImageShape, Shape, ShapeType } from '../shape';
import { Box, Position } from '../../value';
import { externalValue, internalValue } from '../../precision';
import validate from '../shape/validator';

export type ImageConfig = {
  x: number,
  y: number
  src: string,
  width: number,
  height: number,
}

export class Image implements Shape {
  readonly #x: number;
  readonly #y: number;
  readonly #src: string;
  readonly #width: number;
  readonly #height: number;

  constructor(config: ImageConfig) {
    this.#x = internalValue(config.x);
    this.#y = internalValue(config.y);
    this.#width = internalValue(config.width);
    this.#height = internalValue(config.height);
    this.#src = config.src;
    this.validateConfig();
  }

  get type(): ShapeType {
    return ImageShape;
  }

  get x(): number {
    return externalValue(this.#x);
  }

  get y(): number {
    return externalValue(this.#y);
  }

  get src(): string {
    return this.#src;
  }

  get width(): number {
    return externalValue(this.#width);
  }

  get height(): number {
    return externalValue(this.#height);
  }

  get config(): ImageConfig {
    return {
      x: this.x,
      y: this.y,
      src: this.#src,
      width: this.width,
      height: this.height
    };
  }

  get bbox(): Box {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  set(key: keyof ImageConfig, value: ImageConfig[keyof ImageConfig]): Image {
    return new Image({ ...this.config, [key]: value });
  }

  moveTo(pos: Position): Image {
    return new Image({ ...this.config, ...pos });
  }

  resize(box: Box): Image {
    return new Image({ ...this.config, ...box });
  }

  equals(other: Shape): boolean {
    if (other instanceof Image) {
      return this.x === other.x
        && this.y === other.y
        && this.width === other.width
        && this.height === other.height
        && this.src === other.src;
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
  }
}
