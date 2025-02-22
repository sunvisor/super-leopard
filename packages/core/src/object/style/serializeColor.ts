/**
 * SerializeColor
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { ColorData } from "../../data";
import { Color } from './Color';


export function serializeColor(color: Color): ColorData {
  return color.color;
}
