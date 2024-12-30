/**
 * ListBlocks
 *
 * Class that supports iterative processing according to the definition of List
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { FieldValues } from '../../data';
import { DirectionType, List, Shapes } from '../../object';
import { Position } from '../../value';


export type ListBlockCallback = (values: FieldValues, shapes: Shapes, row: number, column: number) => void;

type ListBlockProps = {
  records?: FieldValues[];
  list: List;
}

export class ListBlocks {

  readonly #records: FieldValues[];
  readonly #list: List;

  /**
   * @param records - The detail data
   * @param list - List object
   */
  constructor({ records, list }: ListBlockProps) {
    if (records?.length > list.listCount) {
      throw new Error('record count must be less than list count');
    }
    this.#list = list;
    this.#records = records ?? [];
  }

  /**
   * Callback for each block in the List
   *
   * @param callback
   */
  each(callback: ListBlockCallback) {
    const records = this.#records;
    const list = this.#list;
    const shapesPos: Position = {
      x: list.bbox.x,
      y: list.bbox.y
    };
    let row = 0;
    let column = 0;

    records.forEach((value) => {
      const offsetX = column * (list.width ?? 0);
      const offsetY = row * (list.height ?? 0);
      const shapes = list.shapes.moveTo({ x: shapesPos.x + offsetX, y: shapesPos.y + offsetY });
      callback(value, shapes, row, column);
      [row, column] = this.moveNext(row, column);
    });
  }

  private moveNext(row: number, column: number) {
    const list = this.#list;
    const counters = [row, column];
    const indexes = list.direction === DirectionType.VERTICAL ? [0, 1] : [1, 0];
    const limit = list.direction === DirectionType.VERTICAL ? list.rows : list.columns;
    counters[indexes[0]]++;
    if (counters[indexes[0]] >= limit) {
      counters[indexes[0]] = 0;
      counters[indexes[1]]++;
    }
    return counters;
  }

}
