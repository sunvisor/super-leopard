/**
 * ListDataDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import {
  GroupDrawerInterface,
  ListDataParams,
  ListDrawerInterface,
  SingleShapeDrawerInterface
} from '../types';
import { FieldValues } from '../../data';
import { Group, GroupShape, List, ListShape, Shape, Shapes } from '../../object';
import { ListBlocks } from './ListBlocks';


export class ListDataDrawer implements ListDrawerInterface {

  constructor(
    private readonly groupDrawer: GroupDrawerInterface,
    private readonly shapeDrawer: SingleShapeDrawerInterface,
  ) {
  }

  draw(list: List, data?: ListDataParams): void {
    this.validateData(data);
    const { listRecords } = data;
    const blocks = this.createBlocks(list, listRecords);
    blocks.each((v, shapes) => {
      this.drawShapes(shapes, v);
    });
  }

  private createBlocks(list: List, listRecords: FieldValues[]): ListBlocks {
    return new ListBlocks({
      list,
      records: listRecords,
    });
  }

  private validateData(data: ListDataParams) {
    if (!data) {
      throw new Error('data is required');
    }
    if (!data.listRecords) {
      throw new Error('listRecords is required');
    }
  }

  private drawShapes(shapes: Shapes, values: FieldValues) {
    shapes.each((shape) => {
      this.drawShape(shape, values);
    })
  }

  private drawShape(shape: Shape, values: FieldValues) {
    switch (shape.type) {
      case ListShape:
        throw new Error('Unsupported shape: ' + shape.type);
      case GroupShape:
        this.groupDrawer.draw(shape as Group, { values });
        break;
      default:
        this.shapeDrawer.draw(shape, { values });
    }
  }
}
