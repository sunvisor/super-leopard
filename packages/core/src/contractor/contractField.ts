/**
 * ContractField
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { contractStaticShape } from '../contractor';
import { ShapePropertyValue } from '../expander';
import { Field, StaticShapeType } from '../object';

export function contractField(name: string, type: StaticShapeType, shapeProperty: ShapePropertyValue): Field {
  const shape = contractStaticShape(type, shapeProperty);
  return new Field(name, shape)
}
