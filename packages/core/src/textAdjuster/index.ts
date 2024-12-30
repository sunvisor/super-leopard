/**
 * textAdjuster
 *
 * Created by sunvisor on 2025/01/15.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Rect, Shapes, Text } from '../object';
import multilineAdjuster from './multilineAdjuster';
import singleLineAdjuster from './singleLineAdjuster';
import { TextAdjusterParams } from './types';


function createFillRect(text: Text) {
  return new Rect({
    x: text.x,
    y: text.y,
    width: text.width,
    height: text.height,
    fillColor: text.fillColor
  });
}

/**
 * Return the Shapes containing both the adjusted Text and the necessary objects.
 */
export function textAdjuster(params: TextAdjusterParams): Shapes {
  let result: Shapes = new Shapes();
  if (params.text.fillColor) {
    result = result.add(createFillRect(params.text));
  }
  if (params.text.multiLine) {
    return result.add(multilineAdjuster(params));
  }
  return result.add(singleLineAdjuster(params));
}

export * from './types';
