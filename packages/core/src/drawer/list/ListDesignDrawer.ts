/**
 * ListDesignDrawer
 *
 * Created by sunvisor on 2025/01/23.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Group, GroupShape, List, ListShape, Shape, Shapes } from '../../object';
import {
  DrawerParams,
  GroupDrawerInterface,
  ListDrawerInterface,
  SingleShapeDrawerInterface
} from '../types';
import { FieldValues } from '../../data';
import { ListBlocks } from './ListBlocks';


export class ListDesignDrawer implements ListDrawerInterface {

  constructor(
    private readonly groupDrawer: GroupDrawerInterface,
    private readonly shapeDrawer: SingleShapeDrawerInterface,
  ) {
  }

  draw(list: List): void {
    let opacity = 1;
    const records = Array.from({ length: list.listCount });
    const blocks = this.createBlocks(list, records as FieldValues[]);
    blocks.each((_: FieldValues, shapes: Shapes) => {
      this.drawShapes(shapes, { opacity });
      // In Design mode, repeated parts are displayed in a lighter color.
      opacity = 0.2;
    });
  }

  private createBlocks(list: List, listRecords: FieldValues[]): ListBlocks {
    return new ListBlocks({
      list,
      records: listRecords,
    });
  }

  private drawShapes(shapes: Shapes, params: DrawerParams) {
    shapes.each((item: Shape) => {
      if (item.type === ListShape) {
        throw new Error('List is not allowed in List.');
      }
      this.drawShape(item, params);
    });
  }

  private drawShape(shape: Shape, params: DrawerParams): void {
    if (shape.type === GroupShape) {
      this.groupDrawer.draw(shape as Group, params);
      return;
    }
    this.shapeDrawer.draw(shape, params);
  }

}
