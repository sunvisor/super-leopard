/**
 * CreateLine
 *
 * Created by sunvisor on 2023/11/25.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Line, LineConfig, LineShape } from "../object";
import { createBorder } from './createBorder';
import { LineData } from '../data';

export function createLine(LineData: LineData): Line {
  const { type, border, ...rest } = LineData;
  if (type && type !== LineShape) {
    throw new Error(`Invalid shape type: ${type}`);
  }
  const config: LineConfig = {
    ...rest,
    border: createBorder(border ?? {}),
  }

  return new Line(config);
}
