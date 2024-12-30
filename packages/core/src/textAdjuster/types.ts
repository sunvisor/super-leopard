import { Scale, Text } from '../object';

/**
 * Types
 *
 * Created by sunvisor on 2025/01/17.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export type TextAdjusterParams = {
  text: Text;
  scale: Scale;
  measureWidth: MeasureFunction;
  measureHeight: MeasureFunction;
};

/**
 * A function that returns the character width (pt) consumed by Text
 */
export type MeasureFunction = (text: Text) => number;

