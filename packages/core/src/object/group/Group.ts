/**
 * Group
 *
 * Created by sunvisor on 2023/12/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { GroupShape, GroupShapeType, Shape } from '../shape';
import { Box, Position } from '../../value';
import { Shapes } from '../shapes';
import { externalValue, internalValue, partial } from '../../precision';
import validate from '../shape/validator';

export const DirectionType = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
}

export type DirectionValue = typeof DirectionType[keyof typeof DirectionType];

export type GroupConfigValue = {
  /* repeatCount: if not specified, repeatCount is 1 (no repeat) */
  repeatCount?: number;
  /* direction: if not specified, direction is vertical */
  direction?: DirectionValue;
  /* width: if not specified, width is bbox.width */
  width?: number;
  /* height: if not specified, height is bbox.height */
  height?: number;
}

type GroupConfigObject = {
  shapes: Shapes;
}

export type GroupConfig = GroupConfigValue & GroupConfigObject;

export class Group implements Shape {
  readonly #shapes: Shapes;
  readonly #repeatCount?: number;
  readonly #direction?: DirectionValue;
  readonly #width?: number;
  readonly #height?: number;

  constructor(config: GroupConfig) {
    this.#shapes = config.shapes;
    if (config.shapes.count === 0) {
      throw new Error('Shapes must have at least one shape.');
    }
    if (config.shapes.getList() !== undefined) {
      throw new Error('List is not allowed in Group.');
    }
    this.#repeatCount = config.repeatCount;
    this.#direction = config.direction;
    this.#width = partial(config.width, internalValue);
    this.#height = partial(config.height, internalValue);
    this.validateConfig();
  }

  get shapes(): Shapes {
    return this.#shapes;
  }

  get type(): GroupShapeType {
    return GroupShape;
  }

  get repeatCount(): number {
    return this.#repeatCount ?? 1;
  }

  get direction(): DirectionValue {
    return this.#direction ?? DirectionType.VERTICAL;
  }

  get width(): number {
    return partial(this.#width, externalValue) ?? this.#shapes.bbox.width;
  }

  get height(): number {
    return partial(this.#height, externalValue) ?? this.#shapes.bbox.height;
  }

  get bbox(): Box {
    return {
      x: this.#shapes.bbox.x,
      y: this.#shapes.bbox.y,
      width: this.#shapes.bbox.width,
      height: this.#shapes.bbox.height,
    }
  }

  get config(): GroupConfig {
    return {
      shapes: this.#shapes,
      repeatCount: this.#repeatCount,
      direction: this.#direction,
      width: partial(this.#width, externalValue),
      height: partial(this.#height, externalValue),
    }
  }

  set(key: keyof GroupConfig, value: GroupConfig[keyof GroupConfig]): Group {
    return new Group({ ...this.config, [key]: value, });
  }

  moveTo(pos: Position): Group {
    const config = this.config;
    return new Group({
      ...config,
      shapes: this.#shapes.moveTo(pos),
    });
  }

  resize(box: Box): Group {
    const config = this.config;
    const shapes = this.#shapes.resize(box);

    return new Group({
      ...config,
      shapes,
    });
  }

  equals(other: Shape): boolean {
    if (other instanceof Group) {
      return this.width === other.width
        && this.height === other.height
        && this.repeatCount === other.repeatCount
        && this.direction === other.direction
        && this.shapes.equals(other.shapes);
    }
    return false;
  }

  private validateConfig() {
    validate('positive', 'width', this.#width);
    validate('positive', 'height', this.#height);
    validate('moreThanZero', 'repeatCount', this.#repeatCount);
  }
}
