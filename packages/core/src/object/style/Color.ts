const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export type HexColor = string;
/**
 * HexColorType
 */
export type HexColorConfig = HexColor;

/**
 * RGBColorType
 */
export type RGBColorConfig = {
  r: number;
  g: number;
  b: number;
};

export const DEFAULT_COLOR = '#000000';

/**
 * ColorType
 */
export type ColorConfig = HexColorConfig | RGBColorConfig;

function isValidRGBComponent(value: number): boolean {
  return value >= 0 && value <= 255;
}

function isHexColor(color: ColorConfig): color is HexColorConfig {
  return typeof color === 'string' && color.startsWith('#');
}

function isValidHexColor(colorConfig: HexColorConfig): boolean {
  return HEX_COLOR_REGEX.test(colorConfig as string);
}

function isValidRGBColor(color: RGBColorConfig): boolean {
  return isValidRGBComponent(color.r) && isValidRGBComponent(color.g) && isValidRGBComponent(color.b);
}

function isRGBColor(color: ColorConfig): color is RGBColorConfig {
  return typeof color === 'object' && 'r' in color && 'g' in color && 'b' in color;
}

function rgbToHex(color: RGBColorConfig): string {
  const r = color.r.toString(16).padStart(2, '0');
  const g = color.g.toString(16).padStart(2, '0');
  const b = color.b.toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

/**
 * Color
 *
 * Object representing a color
 *
 * Created by sunvisor on 2023/11/24.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export class Color {
  readonly #color: HexColor;

  constructor(config: ColorConfig) {
    this.#color = this.getColor(config);
  }

  get color(): string {
    return this.#color;
  }

  private getColor(colorConfig: ColorConfig): HexColor {
    if (isHexColor(colorConfig)) {
      return this.validateHexColor(colorConfig);
    } else if (isRGBColor(colorConfig)) {
      return this.convertRGBtoHex(colorConfig);
    } else {
      throw new Error('Invalid color type');
    }
  }

  private validateHexColor(color: HexColorConfig) {
    if (!isValidHexColor(color)) {
      throw new Error('Invalid hex color');
    }
    return color;
  }

  private convertRGBtoHex(color: RGBColorConfig) {
    if (!isValidRGBColor(color)) {
      throw new Error('Invalid RGB color');
    }
    return rgbToHex(color);
  }
}
