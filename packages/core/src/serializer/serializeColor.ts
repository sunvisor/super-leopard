import { ColorData } from "../data";
import { Color } from '../object';

/**
 * SerializeColor
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function serializeColor(color: Color): ColorData {
  return color.color;
}
