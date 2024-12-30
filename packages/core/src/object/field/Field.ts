/**
 * Field
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Box, Position } from '../../value';
import { Boxable, FieldShape, FieldShapeType, Shape } from '../shape';

export class Field implements Shape, Boxable {
  readonly #name: string;
  readonly #shape: Shape;

  constructor(name: string, shape: Shape) {
    this.#name = name;
    this.#shape = shape;
  }

  get type(): FieldShapeType {
    return FieldShape;
  }

  get name() {
    return this.#name;
  }

  get shape() {
    return this.#shape;
  }

  get bbox(): Box {
    return this.#shape.bbox;
  }

  setName(name: string): Field {
    return new Field(name, this.#shape);
  }

  setShape(shape: Shape): Field {
    return new Field(this.#name, shape);
  }

  moveTo(pos: Position): Field {
    const newShape = this.#shape.moveTo(pos) as Shape;

    return new Field(this.#name, newShape);
  }

  resize(box: Box): Field {
    const newShape = this.#shape.resize(box) as Shape;

    return new Field(this.#name, newShape);
  }

  equals(other: Field): boolean {
    return this.#name === other.name
      && this.#shape.equals(other.shape);
  }

}
