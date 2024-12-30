import { serializeColor } from "./serializeColor";
import { BorderData } from "../data";
import { Border } from '../object';

/**
 * SerializeBorder
 *
 * serialize Border object to json data
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function serializeBorder(border: Border): BorderData {
  const { color, ...rest } = border.config;
  const result: BorderData = {
    ...rest,
  }
  if (border.color) {
    result.color = serializeColor(border.color);
  }
  return result;
}

