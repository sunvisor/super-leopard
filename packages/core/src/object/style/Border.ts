import { Color } from "./Color";
import validate from '../shape/validator';

/**
 * Border Style
 */
export const StyleType = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
}
export type StyleValue = typeof StyleType[keyof typeof StyleType];

/**
 * Border Cap
 */
export const CapType = {
  BUTT: 'butt',
  ROUND: 'round',
  SQUARE: 'square',
}
export type CapValue = typeof CapType[keyof typeof CapType];

/**
 * Border Join
 */
export const JoinType = {
  BEVEL: 'bevel',
  MITER: 'miter',
  ROUND: 'round',
}
export type JoinValue = typeof JoinType[keyof typeof JoinType];

export type BorderConfigValue = {
  width?: number;
  style?: StyleValue;
  cap?: CapValue;
  join?: JoinValue;
}

type BorderConfigObject = {
  color: Color;
}

export type BorderConfig = BorderConfigValue & BorderConfigObject;

/**
 * Border
 *
 * Object representing a shape's border
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export class Border {
  readonly #color: Color;
  readonly #width?: number;
  readonly #style?: StyleValue;
  readonly #cap?: CapValue;
  readonly #join?: JoinValue;

  constructor(config: BorderConfig) {
    this.validateConfig(config);
    this.#color = config.color;
    this.#width = config.width;
    this.#style = config.style;
    this.#cap = config.cap;
    this.#join = config.join;
  }


  get join(): typeof JoinType[keyof typeof JoinType] {
    return this.#join ?? JoinType.MITER;
  }

  get cap(): typeof CapType[keyof typeof CapType] {
    return this.#cap ?? CapType.BUTT;
  }

  get style(): typeof StyleType[keyof typeof StyleType] {
    return this.#style ?? StyleType.SOLID;
  }

  get width(): number {
    return this.#width ?? 1;
  }

  get color(): Color {
    return this.#color;
  }

  get config(): BorderConfig {
    return {
      color: this.#color,
      width: this.#width,
      style: this.#style,
      cap: this.#cap,
      join: this.#join
    };
  }

  equals(other: Border | undefined): boolean {
    if (!other) {
      return false;
    }
    return this.width === other.width
      && this.color.color === other.color.color
      && this.style === other.style
      && this.cap === other.cap
      && this.join === other.join;
  }

  private validateConfig(config: BorderConfig) {
    validate('positive', 'width', config.width);
    if (config.style && !Object.values(StyleType).includes(config.style)) {
      throw new Error('Invalid border style');
    }
    if (config.cap && !Object.values(CapType).includes(config.cap)) {
      throw new Error('Invalid border cap');
    }
    if (config.join && !Object.values(JoinType).includes(config.join)) {
      throw new Error('Invalid border join');
    }
  }

}

export function compareBorder(a: Border | undefined, b: Border | undefined): boolean {
  if (!a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.equals(b);
}
