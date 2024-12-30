/**
 * Text
 *
 * Created by sunvisor on 2023/11/27.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Shape, TextShape, TextShapeType } from "../shape";
import { Color, Font, FontStyleType } from "../style";
import { Box, Position } from "../../value";
import { externalValue, internalValue } from '../../precision';
import validate from '../shape/validator';

export const AlignType = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
  JUSTIFY: 'justify',
  JUSTIFY_ALL: 'justify-all',
}
export type AlignValue = typeof AlignType[keyof typeof AlignType];

export const ValignType = {
  TOP: 'top',
  BOTTOM: 'bottom',
  MIDDLE: 'middle',
}
export type ValignValue = typeof ValignType[keyof typeof ValignType];

export type TextConfigValues = {
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  align?: AlignValue;
  valign?: ValignValue;
  multiLine?: boolean;
  linePitch?: number;
  fitCell?: boolean;
};

type TextConfigObject = {
  font: Font;
  color: Color;
  fillColor?: Color;
}

export type TextConfig = TextConfigValues & TextConfigObject;

export class Text implements Shape {
  readonly #x: number;
  readonly #y: number;
  readonly #font: Font;
  readonly #color: Color;
  readonly #width: number;
  readonly #height: number;
  readonly #text?: string;
  readonly #fillColor?: Color;
  readonly #align?: AlignValue;
  readonly #valign?: ValignValue;
  readonly #multiLine?: boolean;
  readonly #linePitch?: number;
  readonly #fitCell?: boolean;

  constructor(config: TextConfig) {
    this.#x = internalValue(config.x);
    this.#y = internalValue(config.y);
    this.#width = internalValue(config.width);
    this.#height = internalValue(config.height);
    this.#text = config.text;
    this.#color = config.color;
    this.#fillColor = config.fillColor;
    this.#align = config.align;
    this.#valign = config.valign;
    this.#font = config.font;
    this.#multiLine = config.multiLine;
    this.#linePitch = config.linePitch;
    this.#fitCell = config.fitCell;
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

  get config(): TextConfig {
    return {
      x: this.x,
      y: this.y,
      text: this.#text,
      font: this.font,
      color: this.color,
      width: this.width,
      height: this.height,
      fillColor: this.#fillColor,
      align: this.#align,
      valign: this.#valign,
      multiLine: this.#multiLine,
      linePitch: this.#linePitch,
      fitCell: this.#fitCell,
    };
  }

  get type(): TextShapeType {
    return TextShape;
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

  get text(): string {
    return this.#text ?? '';
  }

  get color(): Color {
    return this.#color;
  }

  get fillColor(): Color | undefined {
    return this.#fillColor;
  }

  get align(): AlignValue | undefined {
    return this.#align;
  }

  get valign(): ValignValue | undefined {
    return this.#valign;
  }

  get font(): Font {
    return this.#font;
  }

  get multiLine(): boolean {
    return this.#multiLine ?? false;
  }

  get linePitch(): number | undefined {
    return this.#linePitch;
  }

  get fitCell(): boolean {
    return this.#fitCell ?? false;
  }

  moveTo(pos: Position): Text {
    return new Text({
      ...this.config,
      x: pos.x,
      y: pos.y,
    });
  }

  resize(box: Box): Text {
    return new Text({
      ...this.config,
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    });
  }

  set(key: keyof TextConfig, value: TextConfig[keyof TextConfig]): Text {
    return new Text({ ...this.config, [key]: value });
  }

  equals(other: Shape): boolean {
    if (other instanceof Text) {
      return this.x === other.x
        && this.y === other.y
        && this.width === other.width
        && this.height === other.height
        && this.text === other.text
        && this.color.color === other.color.color
        && this.fillColor?.color === other.fillColor?.color
        && this.align === other.align
        && this.valign === other.valign
        && this.font.equals(other.font)
        && this.multiLine === other.multiLine
        && this.linePitch === other.linePitch
        && this.fitCell === other.fitCell
    }
    return false;
  }

  private validateConfig() {
    if (!this.#multiLine && this.#linePitch !== undefined) {
      throw new Error('To specify linePitch, multiLine must be specified');
    }
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
    if (this.#multiLine && this.#font.style.includes(FontStyleType.UNDERLINE)) {
      throw new Error('underline is not supported in multiLine mode');
    }
    if (this.#multiLine && this.#font.style.includes(FontStyleType.STRIKE)) {
      throw new Error('strike is not supported in multiLine mode');
    }
    if (this.#fitCell && this.#linePitch !== undefined) {
      throw new Error('linePitch is not supported in fitCell mode');
    }
  }

}
