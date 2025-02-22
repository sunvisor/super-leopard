/**
 * Page
 *
 * Created by sunvisor on 2023/12/11.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { PageMargin, Size } from "../../value";
import { UnitType, UnitValue } from '../scale';
import { convertUnit } from '../../unit';
import { externalValue, internalValue } from '../../precision';
import validate from '../shape/validator';


export const PaperSize = {
  LETTER: 'letter',
  LEGAL: 'legal',
  TABLOID: 'tabloid',
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  A6: 'A6',
  B3: 'B3',
  B4: 'B4',
  B5: 'B5',
  B6: 'B6',
}

export type PaperSizeValue = typeof PaperSize[keyof typeof PaperSize];
export type PageSize = PaperSizeValue | Size;
export const OrientationType = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
}
export type OrientationValue = typeof OrientationType[keyof typeof OrientationType];

export type PageConfig = {
  size: PageSize;
  orientation?: OrientationValue;
  unit: UnitValue;
  margin?: PageMargin;
}

function getPaperSize(size: PaperSizeValue, unit: UnitValue): Size {
  const map = {
    [PaperSize.LETTER]: { width: 216, height: 279 },
    [PaperSize.LEGAL]: { width: 216, height: 356 },
    [PaperSize.TABLOID]: { width: 279, height: 432 },
    [PaperSize.A3]: { width: 297, height: 420 },
    [PaperSize.A4]: { width: 210, height: 297 },
    [PaperSize.A5]: { width: 148, height: 210 },
    [PaperSize.A6]: { width: 105, height: 148 },
    [PaperSize.B3]: { width: 353, height: 500 },
    [PaperSize.B4]: { width: 250, height: 353 },
    [PaperSize.B5]: { width: 176, height: 250 },
    [PaperSize.B6]: { width: 125, height: 176 },
  }
  if (unit !== UnitType.MILLIMETER) {
    return {
      width: convertUnit(map[size].width, UnitType.MILLIMETER, unit),
      height: convertUnit(map[size].height, UnitType.MILLIMETER, unit),
    }
  }
  return map[size];
}

export class Page {
  readonly #size: PageSize;
  readonly #width: number;
  readonly #height: number;
  readonly #orientation?: OrientationValue;
  readonly #margin?: PageMargin;
  readonly #unit: UnitValue;

  constructor(config: PageConfig) {
    const { size } = config;
    this.#orientation = config.orientation;
    this.#margin = config.margin && {
      top: internalValue(config.margin.top),
      left: internalValue(config.margin.left),
    };
    this.#unit = config.unit;
    if (typeof size === 'string') {
      this.#size = size;
      const paperSize = getPaperSize(size, config.unit);
      if (paperSize === undefined) {
        throw new Error(`Unknown paper size: ${size}`);
      }
      this.#width = internalValue(paperSize.width);
      this.#height = internalValue(paperSize.height);
    } else {
      this.#size = {
        width: internalValue(size.width),
        height: internalValue(size.height),
      }
      this.#width = this.#size.width;
      this.#height = this.#size.height;
    }
    this.validateConfig();
  }

  get config(): PageConfig {
    return {
      size: this.size,
      orientation: this.#orientation,
      unit: this.unit,
      margin: this.margin,
    };
  }

  get size(): PageSize {
    if (typeof this.#size === 'string') {
      return this.#size;
    }
    return {
      width: externalValue(this.#width),
      height: externalValue(this.#height),
    }
  }

  get width(): number {
    return externalValue(
      this.orientation === OrientationType.PORTRAIT ? this.#width : this.#height
    );
  }

  get height(): number {
    return externalValue(
      this.orientation === OrientationType.PORTRAIT ? this.#height : this.#width
    );
  }

  get unit(): UnitValue {
    return this.#unit;
  }

  get margin(): PageMargin | undefined {
    return this.#margin && {
      top: externalValue(this.#margin.top),
      left: externalValue(this.#margin.left),
    };
  }

  get orientation(): OrientationValue {
    return this.#orientation ?? OrientationType.PORTRAIT;
  }

  set(key: keyof PageConfig, value: PageConfig[keyof PageConfig]): Page {
    return new Page({
      ...this.config,
      [key]: value,
    });
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
  }
}
