/**
 * ShapeState
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  DEFAULT_COLOR,
  FontData,
  StaticShapeType,
  CirclePropertyValue,
  EllipsePropertyValue,
  LinePropertyValue,
  ImagePropertyValue,
  RectPropertyValue,
  TextStyleValue,
  ShapePropertyValue,
} from '@sunvisor/super-leopard-core';
import { NO_IMAGE } from '../../svg';

export type AllShapePropertyValue = Partial<
  CirclePropertyValue &
  EllipsePropertyValue &
  LinePropertyValue &
  ImagePropertyValue &
  RectPropertyValue &
  TextStyleValue
>;

export default class ShapeState {

  readonly #prev: AllShapePropertyValue
  readonly #defaultFont: FontData;
  constructor(prev: ShapePropertyValue, defaultFont: FontData) {
    this.#prev = { ...prev };
    this.#defaultFont = defaultFont;
  }

  get x() {
    return this.#prev.x ?? this.#prev.x1 ?? 0;
  }

  get y() {
    return this.#prev.y ?? this.#prev.y1 ?? 0;
  }

  get x1() {
    return this.#prev.x1 ?? this.#prev.x ?? 0;
  }

  get y1() {
    return this.#prev.y1 ?? this.#prev.y ?? 0;
  }

  get x2() {
    return this.#prev.x2 ?? (this.#prev.x ?? 0) + this.width;
  }

  get y2() {
    return this.#prev.y2 ?? (this.#prev.y ?? 0) + this.height;
  }

  get width() {
    if (this.#prev.width) {
      return this.#prev.width;
    }
    if (this.#prev.x1 !== undefined && this.#prev.x2 !== undefined) {
      return Math.abs(this.#prev.x2 - this.#prev.x1);
    }
    if (this.#prev.diameter !== undefined) {
      return this.#prev.diameter;
    }
    return 0;
  }

  get height() {
    if (this.#prev.height) {
      return this.#prev.height;
    }
    if (this.#prev.y1 !== undefined && this.#prev.y2 !== undefined) {
      return Math.abs(this.#prev.y2 - this.#prev.y1);
    }
    if (this.#prev.diameter !== undefined) {
      return this.#prev.diameter;
    }
    return 0;
  }

  get diameter() {
    if (this.#prev.diameter) {
      return this.#prev.diameter;
    }
    return Math.min(this.width, this.height);
  }

  get useFillColor() {
    return this.#prev.useFillColor ?? false;
  }

  get fillColor() {
    return this.#prev.fillColor;
  }

  get useStroke() {
    return this.#prev.useStroke ?? false;
  }

  get borderStyle() {
    return this.#prev.borderStyle;
  }

  get borderWidth() {
    return this.#prev.borderWidth;
  }

  get borderColor() {
    return this.#prev.borderColor;
  }

  get borderCap() {
    return this.#prev.borderCap;
  }

  get borderJoin() {
    return this.#prev.borderJoin;
  }

  get src() {
    return this.#prev.src ?? NO_IMAGE;
  }

  get fontFamily() {
    return this.#prev.fontFamily ?? this.#defaultFont.family;
  }

  get fontSize() {
    return this.#prev.fontSize ?? this.#defaultFont.size;
  }

  get fontStyle() {
    return this.#prev.fontStyle ?? [];
  }

  get align() {
    return this.#prev.align ?? 'left';
  }

  get valign() {
    return this.#prev.valign ?? 'top';
  }

  get multiLine() {
    return this.#prev.multiLine ?? false;
  }

  get linePitch() {
    return this.#prev.linePitch ?? 1;
  }

  get fitCell() {
    return this.#prev.fitCell ?? false;
  }

  get color() {
    return this.#prev.color ?? DEFAULT_COLOR;
  }

  borderProperty() {
    return {
      useStroke: this.useStroke,
      borderCap: this.borderCap,
      borderColor: this.borderColor,
      borderJoin: this.borderJoin,
      borderStyle: this.borderStyle,
      borderWidth: this.borderWidth,
    }
  }

  fillColorProperty() {
    return {
      useFillColor: this.useFillColor,
      fillColor: this.fillColor,
    }
  }

  positionProperty() {
    return {
      x: this.x,
      y: this.y,
    }
  }
  sizeProperty() {
    return {
      ...this.positionProperty(),
      width: this.width,
      height: this.height,
    }

  }

  rectProperty(): RectPropertyValue {
    return {
      ...this.sizeProperty(),
      ...this.borderProperty(),
      ...this.fillColorProperty(),
    }
  }

  circleProperty(): CirclePropertyValue {
    return {
      ...this.positionProperty(),
      diameter: this.diameter,
      ...this.borderProperty(),
      ...this.fillColorProperty(),
    }
  }

  ellipseProperty(): EllipsePropertyValue {
    return {
      ...this.sizeProperty(),
      ...this.borderProperty(),
      ...this.fillColorProperty(),
    }
  }

  lineProperty(): LinePropertyValue {
    return {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      ...this.sizeProperty(),
      ...this.borderProperty(),
    }
  }

  imageProperty(): ImagePropertyValue {
    return {
      src: this.src,
      ...this.sizeProperty(),
    }
  }

  textProperty(): TextStyleValue {
    return {
      ...this.positionProperty(),
      ...this.sizeProperty(),
      ...this.borderProperty(),
      ...this.fillColorProperty(),
      color: this.color,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      align: this.align,
      valign: this.valign,
      multiLine: this.multiLine,
      linePitch: this.linePitch,
      fitCell: this.fitCell,
    }
  }

  states(type: StaticShapeType) {
    switch (type) {
      case 'rect':
        return this.rectProperty();
      case 'circle':
        return this.circleProperty();
      case 'ellipse':
        return this.ellipseProperty();
      case 'line':
        return this.lineProperty();
      case 'image':
        return this.imageProperty();
      case 'text':
        return this.textProperty();
    }
  }
}
