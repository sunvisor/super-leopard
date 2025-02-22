/**
 * Barcode
 *
 * Created by sunvisor on 2025/02/10.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeShape, Shape, ShapeType } from '../shape';
import { externalValue, internalValue } from '../../precision';
import { Box, Position } from 'value';
import validate from '../shape/validator';
import { BarcodeFormatType, BarcodeFormatValue, BarcodeRotateType } from '../../data';

export type BarcodeOptions = {
  rotate?: BarcodeRotateType;
  includeText?: boolean;
}

export type BarcodeConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  format: BarcodeFormatValue;
  value: string;
  options?: BarcodeOptions;
}

export class Barcode implements Shape {
  readonly #x: number;
  readonly #y: number;
  readonly #width: number;
  readonly #height: number;
  readonly #format: BarcodeFormatValue;
  readonly #options: BarcodeOptions | undefined;
  readonly #value: string;

  constructor(config: BarcodeConfig) {
    this.#x = internalValue(config.x);
    this.#y = internalValue(config.y);
    this.#width = internalValue(config.width);
    this.#height = internalValue(config.height);
    this.#format = config.format;
    this.#options = config.options;
    this.#value = config.value;
    this.validateConfig();
  }

  get type(): ShapeType {
    return BarcodeShape
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

  get options(): BarcodeOptions {
    return this.#options || {
      rotate: 'N',
      includeText: false,
    };
  }

  get format(): BarcodeFormatValue {
    return this.#format;
  }

  get value(): string {
    return this.#value;
  }

  get config(): BarcodeConfig {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      format: this.#format,
      options: this.#options,
      value: this.#value
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

  set(key: keyof BarcodeConfig, value: BarcodeConfig[keyof BarcodeConfig]): Barcode {
    return new Barcode({ ...this.config, [key]: value });
  }

  moveTo(pos: Position): Barcode {
    return new Barcode({ ...this.config, ...pos })
  }

  resize(box: Box): Barcode {
    return new Barcode({ ...this.config, ...box })
  }

  equals(other: Shape): boolean {
    if (other instanceof Barcode) {
      return this.x === other.x
        && this.y === other.y
        && this.width === other.width
        && this.height === other.height
        && this.format === other.format
        && this.options.rotate === other.options.rotate
        && this.options.includeText === other.options.includeText
        && this.value === other.value;
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
    if (this.#format && !Object.values(BarcodeFormatType).includes(this.#format)) {
      throw new Error('Invalid barcode format');
    }
  }

}
