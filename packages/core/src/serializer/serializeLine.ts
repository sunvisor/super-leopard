import { Line, LineShape } from "../object";
import { LineData } from "../data";
import { serializeBorder } from './serializeBorder';

/**
 * serializeLine
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
export function serializeLine(line: Line): LineData {
  const result: LineData = {
    type: LineShape,
    x1: line.x1,
    y1: line.y1,
    x2: line.x2,
    y2: line.y2,
  };
  if (line.border) {
    result.border = serializeBorder(line.border);
  }
  return result;
}
