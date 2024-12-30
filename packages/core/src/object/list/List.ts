/**
 * List
 *
 * Created by sunvisor on 2023/12/30.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { DirectionType, DirectionValue } from '../group';
import { Shapes } from '../shapes';
import { Boxable, FieldShape, ListShape, ListShapeType, Shape } from '../shape';
import { Box, Position } from '../../value';
import { externalValue, internalValue, partial } from '../../precision';
import validate from '../shape/validator';

export type ListConfigValue = {
  // width: width on repeating
  width?: number;
  // height: height on repeating
  height?: number;
  rows?: number;
  columns?: number;
  /* In the case of multiple rows in multiple columns, the direction in which the List is repeated first */
  direction?: DirectionValue;
}

export type ListConfigObject = {
  shapes: Shapes;
}

export type ListConfig = ListConfigValue & ListConfigObject;

export class List implements Shape, Boxable {
  readonly #width: number | undefined;
  readonly #height: number | undefined;
  readonly #rows: number;
  readonly #columns: number;
  readonly #direction: DirectionValue;
  readonly #shapes: Shapes;

  constructor(config: ListConfig) {
    this.#width = partial(config.width, internalValue);
    this.#height = partial(config.height, internalValue);
    this.#rows = config.rows ?? 1;
    this.#columns = config.columns ?? 1;
    this.#direction = config.direction ?? DirectionType.VERTICAL;
    this.#shapes = config.shapes;
    this.validateConfig();
  }

  get type(): ListShapeType {
    return ListShape;
  }

  get width(): number {
    return partial(this.#width, externalValue) ?? this.#shapes.bbox.width;
  }

  get height(): number {
    return partial(this.#height, externalValue) ?? this.#shapes.bbox.height;
  }

  get rows(): number {
    return this.#rows;
  }

  get columns(): number {
    return this.#columns;
  }

  get direction(): DirectionValue {
    return this.#direction;
  }

  get shapes(): Shapes {
    return this.#shapes;
  }

  get config(): ListConfig {
    return {
      width: partial(this.#width, externalValue),
      height: partial(this.#height, externalValue),
      rows: this.#rows,
      columns: this.#columns,
      direction: this.#direction,
      shapes: this.#shapes,
    };
  }

  get bbox() {
    return {
      x: this.#shapes.bbox.x,
      y: this.#shapes.bbox.y,
      width: this.#shapes.bbox.width,
      height: this.#shapes.bbox.height,
    }
  }

  get listCount(): number {
    return this.#rows * this.#columns;
  }

  set(key: keyof ListConfig, value: ListConfig[keyof ListConfig]): List {
    return new List({ ...this.config, [key]: value });
  }

  moveTo(pos: Position): List {
    return new List({
      ...this.config,
      shapes: this.#shapes.moveTo(pos),
    })
  }

  resize(box: Box) {
    return new List({
      ...this.config,
      shapes: this.#shapes.resize(box),
    });
  }

  equals(other: Shape): boolean {
    if (other instanceof List) {
      return this.width === other.width
        && this.height === other.height
        && this.rows === other.rows
        && this.columns === other.columns
        && this.direction === other.direction
        && this.shapes.equals(other.shapes);
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
    if (this.shapes.filter(item => item.type === ListShape).count > 0) {
      throw new Error('List can not have List');
    }
    if (this.shapes.filter(item => item.type === FieldShape).count === 0) {
      throw new Error('List must have at least one Field');
    }
    validate('moreThanZero', 'columns', this.#columns);
    validate('moreThanZero', 'rows', this.#rows);
  }

}
