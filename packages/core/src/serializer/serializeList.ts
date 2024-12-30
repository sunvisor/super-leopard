/**
 * SerializeList
 *
 * Created by sunvisor on 2024/01/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { List } from '../object';
import { ListData } from '../data';
import { serializeShapes } from './serializeShape';

export function serializeList(list: List): ListData {
  const { shapes, ...rest } = list.config;
  return {
    type: list.type,
    ...rest,
    shapes: serializeShapes(list.shapes),
  };
}
