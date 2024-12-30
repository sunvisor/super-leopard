/**
 * ContractList
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { List, Shapes } from '../object';
import { ListPropertyValue } from '../expander';

export function contractList(property: ListPropertyValue, shapes: Shapes): List {
  return new List({
    width: property.width,
    height: property.height,
    direction: property.direction,
    rows: property.rows,
    columns: property.columns,
    shapes,
  });
}
