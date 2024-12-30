import validate from '../shape/validator';

export const FontStyleType = {
  ITALIC: 'italic',
  BOLD: 'bold',
  UNDERLINE: 'underline',
  STRIKE: 'strike',
}
export type FontStyleValue = typeof FontStyleType[keyof typeof FontStyleType];

export type FontConfig = {
  family: string;
  style?: FontStyleValue[];
  size: number;
};

/**
 * Font
 *
 * Created by sunvisor on 2023/11/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export class Font {
  readonly #family: string;
  readonly #style?: FontStyleValue[];
  readonly #size: number;

  constructor(config: FontConfig) {
    this.#family = config.family;
    this.#style = config.style;
    this.#size = config.size;
    this.validateConfig();
  }

  get family(): string {
    return this.#family;
  }

  get style(): FontStyleValue[] {
    return this.#style ?? [];
  }

  get size(): number {
    return this.#size;
  }

  get config(): FontConfig {
    return {
      family: this.#family,
      style: this.#style,
      size: this.#size,
    };
  }

  set(key: keyof FontConfig, value: FontConfig[keyof FontConfig]): Font {
    return new Font({ ...this.config, [key]: value });
  }

  equals(other: Font): boolean {
    return this.family === other.family
      && arrayEquals(this.style, other.style)
      && this.size === other.size;
  }

  private validateConfig() {
    validate('moreThanZero', 'size', this.#size);
  }
}

function arrayEquals<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  const aDash = a.slice().sort();
  const bDash = b.slice().sort();
  for (let i = 0; i < a.length; i++) {
    if (aDash[i] !== bDash[i]) {
      return false;
    }
  }
  return true;
}

